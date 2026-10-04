(function () {
  if (window.__dgLightbox) return;
  window.__dgLightbox = true;
  let timer = null, overlay = null;

  function filled(path) {
    for (const n of path) {
      if (n.getAttribute && n.getAttribute('data-act')) return null;
      if (n.tagName === 'IMAGE-SLOT') {
        const img = n.shadowRoot && n.shadowRoot.querySelector('img[part="image"]');
        const src = img && img.getAttribute('src');
        return src && img.style.display !== 'none' ? { slot: n, src, alt: n.getAttribute('placeholder') || '' } : null;
      }
    }
    return null;
  }

  function close() {
    if (!overlay) return;
    const o = overlay; overlay = null;
    o.style.opacity = '0';
    document.body.style.overflow = '';
    setTimeout(() => o.remove(), 180);
  }

  function open({ src, alt }) {
    close();
    const o = document.createElement('div');
    o.setAttribute('role', 'dialog');
    o.setAttribute('aria-modal', 'true');
    o.style.cssText = 'position:fixed;inset:0;z-index:2147483000;background:rgba(24,29,38,.88);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:64px 48px 48px;opacity:0;transition:opacity .18s ease;cursor:zoom-out;font-family:Inter,-apple-system,"Segoe UI",sans-serif';
    const btn = document.createElement('button');
    btn.textContent = 'Close';
    btn.setAttribute('aria-label', 'Close image');
    btn.style.cssText = 'position:absolute;top:16px;right:16px;background:#ffffff;color:#181d26;border:0;border-radius:12px;padding:10px 18px;font:500 14px Inter,-apple-system,"Segoe UI",sans-serif;cursor:pointer';
    const img = document.createElement('img');
    img.src = src; img.alt = alt;
    img.style.cssText = 'max-width:100%;max-height:calc(100vh - 160px);object-fit:contain;border-radius:10px;background:#ffffff;box-shadow:0 24px 64px rgba(0,0,0,.4);cursor:default';
    img.addEventListener('load', () => { img.style.maxWidth = 'min(100%, ' + img.naturalWidth + 'px)'; img.style.maxHeight = 'min(calc(100vh - 160px), ' + img.naturalHeight + 'px)'; });
    img.addEventListener('click', (e) => e.stopPropagation());
    o.append(btn, img);
    if (alt) {
      const cap = document.createElement('div');
      cap.textContent = alt;
      cap.style.cssText = 'color:#ffffff;font-size:14px;font-weight:500;text-align:center;max-width:800px';
      o.append(cap);
    }
    o.addEventListener('click', close);
    document.body.append(o);
    document.body.style.overflow = 'hidden';
    overlay = o;
    requestAnimationFrame(() => { o.style.opacity = '1'; btn.focus(); });
  }

  document.addEventListener('click', (e) => {
    const hit = filled(e.composedPath());
    if (!hit) return;
    clearTimeout(timer);
    timer = setTimeout(() => open(hit), 220);
  }, true);
  document.addEventListener('dblclick', () => clearTimeout(timer), true);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  document.addEventListener('mouseover', (e) => {
    const hit = filled(e.composedPath());
    if (hit) hit.slot.style.cursor = 'zoom-in';
  });
})();
