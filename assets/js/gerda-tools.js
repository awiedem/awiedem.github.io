/* Small page tools: copy buttons, the Data page filter, and the documentation
   sidebar highlight. Every page works without this file. */
(() => {
  'use strict';

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }

  function makeCopyButton(label, ariaLabel, getText, className) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.setAttribute('aria-label', ariaLabel);
    if (className) button.className = className;
    let timer;
    button.addEventListener('click', async () => {
      try {
        await copyText(getText());
        button.textContent = 'Copied';
      } catch (error) {
        button.textContent = 'Copy failed';
      }
      clearTimeout(timer);
      timer = setTimeout(() => { button.textContent = label; }, 1500);
    });
    return button;
  }

  // Code blocks: any <pre> inside a .copyable container gets a Copy button.
  document.querySelectorAll('.copyable pre').forEach((pre) => {
    const getText = () => pre.querySelector('code').textContent.trim();
    pre.appendChild(makeCopyButton('Copy', 'Copy this code', getText, 'copy-button'));
  });

  // ---- Data page ----

  const filterBox = document.getElementById('data-filter');
  if (filterBox) {
    const packages = {
      r: new Set(JSON.parse(filterBox.dataset.r)),
      python: new Set(JSON.parse(filterBox.dataset.python))
    };
    const rows = [];

    const normalize = (text) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

    document.querySelectorAll('.download-section').forEach((section) => {
      const table = section.querySelector('table');
      if (!table) return;
      const head = table.querySelector('thead tr');
      const loadHead = document.createElement('th');
      loadHead.textContent = 'Load in code';
      head.appendChild(loadHead);

      const context = `${section.querySelector('h2').textContent} ${section.dataset.terms || ''}`;
      table.querySelectorAll('tbody tr').forEach((row) => {
        const cells = row.querySelectorAll('td');
        const name = row.querySelector('code').textContent.trim();
        const years = cells[2].textContent;
        const boundaries = cells[3].textContent;
        const harmonized = /boundaries|harmonized/i.test(boundaries);

        const load = document.createElement('td');
        const buttons = document.createElement('div');
        buttons.className = 'load-buttons';
        if (packages.r.has(name)) {
          buttons.appendChild(makeCopyButton('R', `Copy R code that loads ${name}`,
            () => `data <- gerda::load_gerda_web("${name}")`));
        }
        if (packages.python.has(name)) {
          buttons.appendChild(makeCopyButton('Python', `Copy Python code that loads ${name}`,
            () => `import gerda\ndata = gerda.load("${name}")`));
        }
        load.appendChild(buttons);
        row.appendChild(load);

        const ranges = [...years.matchAll(/(\d{4})\s*[–→-]\s*(\d{4})/g)].map((m) => [Number(m[1]), Number(m[2])]);
        rows.push({
          row,
          section,
          ranges,
          harmonized,
          text: normalize(`${context} ${cells[0].textContent} ${cells[1].textContent} ${years} ${boundaries}`)
        });
      });
    });

    const input = filterBox.querySelector('input');
    const status = filterBox.querySelector('.data-filter-status');

    function applyFilter() {
      const tokens = normalize(input.value).split(/\s+/).filter(Boolean);
      // "2023 boundaries" asks for a boundary year, not any file covering 2023.
      const boundaryYear = tokens.includes('boundaries');
      const visiblePerSection = new Map();
      let visible = 0;
      rows.forEach(({ row, section, ranges, harmonized, text }) => {
        const match = tokens.every((token) => {
          if (token === 'harmonized' || token === 'harmonised') return harmonized;
          if (token === 'unharmonized' || token === 'unharmonised' || token === 'original') return !harmonized;
          if (text.includes(token)) return true;
          // A four-digit year also matches any range that contains it.
          if (boundaryYear || !/^\d{4}$/.test(token)) return false;
          const year = Number(token);
          return ranges.some(([from, to]) => year >= from && year <= to);
        });
        row.hidden = !match;
        if (match) {
          visible += 1;
          visiblePerSection.set(section, true);
        }
      });
      document.querySelectorAll('.download-section').forEach((section) => {
        if (section.querySelector('table')) section.hidden = !visiblePerSection.get(section);
      });
      if (!tokens.length) status.textContent = `${rows.length} files`;
      else if (!visible) status.textContent = 'No files match. Try fewer words.';
      else status.textContent = `${visible} of ${rows.length} files`;
    }

    input.addEventListener('input', applyFilter);
    filterBox.hidden = false;
    applyFilter();
  }

  // ---- Documentation sidebar: mark the section being read ----

  const sidebarLinks = document.querySelectorAll('.docs-sidebar a[href^="#"]');
  if (sidebarLinks.length && 'IntersectionObserver' in window) {
    const linkFor = new Map();
    sidebarLinks.forEach((link) => {
      const target = document.getElementById(link.getAttribute('href').slice(1));
      if (target) linkFor.set(target, link);
    });
    const targets = [...linkFor.keys()];
    const setCurrent = () => {
      let current = null;
      targets.forEach((target) => {
        if (target.getBoundingClientRect().top <= 120) current = target;
      });
      sidebarLinks.forEach((link) => link.removeAttribute('aria-current'));
      if (current) linkFor.get(current).setAttribute('aria-current', 'true');
    };
    const observer = new IntersectionObserver(setCurrent, { rootMargin: '-120px 0px -60% 0px' });
    targets.forEach((target) => observer.observe(target));
    setCurrent();
  }
})();
