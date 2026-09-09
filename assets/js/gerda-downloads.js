/* Explicit filenames for GitHub-hosted downloads on the static GERDA website. */
(() => {
  'use strict';

  // Older browsers keep the normal links, including when JavaScript is disabled.
  if (!window.fetch || !window.Blob || !window.URL || !URL.createObjectURL) return;
  const types = {
    csv: 'text/csv;charset=utf-8',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  };

  document.querySelectorAll('a[href^="https://github.com/awiedem/german_election_data/raw/"]').forEach(link => {
    const original = new URL(link.href);
    const match = original.pathname.match(/^\/awiedem\/german_election_data\/raw\/(?:refs\/heads\/)?main\/(data\/.+\/([^/]+\.(csv|xlsx)))$/);
    if (!match) return;
    const [, path, filename, extension] = match;
    // Fetch the final CORS-enabled endpoint directly, avoiding a github.com redirect.
    const source = `https://media.githubusercontent.com/media/awiedem/german_election_data/refs/heads/main/${path}`;
    let busy = false;
    let status;
    const label = link.textContent;

    link.addEventListener('click', async event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      if (busy) return;
      busy = true;
      link.setAttribute('aria-busy', 'true');
      link.textContent = `${label} …`;
      if (!status) {
        status = document.createElement('span');
        status.className = 'download-status';
        status.setAttribute('role', 'status');
        link.parentNode.appendChild(status);
      }
      status.textContent = `Preparing ${filename}…`;
      let objectUrl;
      let temporaryLink;
      try {
        const response = await fetch(source, { credentials: 'omit' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const body = await response.blob();
        if (body.size === 0) throw new Error('Empty download');
        // A checked-in LFS pointer or error document must never masquerade as data.
        const prefix = new Uint8Array(await new Response(body.slice(0, 200)).arrayBuffer());
        const beginning = String.fromCharCode(...prefix);
        if (beginning.startsWith('version https://git-lfs.github.com/spec/v1') || /^\s*(?:<!doctype html|<html)/i.test(beginning)) {
          throw new Error('The response is not a dataset');
        }
        if (extension === 'xlsx' && !(prefix[0] === 0x50 && prefix[1] === 0x4b)) {
          throw new Error('The response is not an Excel workbook');
        }
        objectUrl = URL.createObjectURL(new Blob([body], { type: types[extension] }));
        temporaryLink = document.createElement('a');
        temporaryLink.href = objectUrl;
        temporaryLink.download = filename;
        temporaryLink.hidden = true;
        document.body.appendChild(temporaryLink);
        temporaryLink.click();
        status.textContent = `Download started: ${filename}`;
      } catch (error) {
        status.textContent = 'Download could not be prepared. ';
        const fallback = document.createElement('a');
        fallback.href = link.href;
        fallback.textContent = `Download ${filename} directly`;
        status.appendChild(fallback);
      } finally {
        if (temporaryLink) temporaryLink.remove();
        // Give the browser time to consume the Blob before releasing it.
        if (objectUrl) setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
        busy = false;
        link.removeAttribute('aria-busy');
        link.textContent = label;
      }
    });
  });
})();
