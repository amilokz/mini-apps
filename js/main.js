document.addEventListener("DOMContentLoaded", () => {

  // --- Toast function (used in all apps) ---
  function toast(msg, delay = 3000) {
    const id = 't' + Date.now();
    const el = document.createElement('div');
    el.className = 'toast align-items-center text-white bg-dark border-0';
    el.role = 'alert';
    el.id = id;
    el.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${msg}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>`;
    document.body.appendChild(el);
    const bs = new bootstrap.Toast(el, { delay });
    bs.show();
    el.addEventListener('hidden.bs.toast', () => el.remove());
  }

  // --- Service Worker Registration ---
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
      .then(() => console.log('SW Registered ✅'))
      .catch(err => console.error('SW registration failed', err));
  }

  window.toast = toast; // make globally accessible
});
