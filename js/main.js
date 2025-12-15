// Splash screen fade-out
window.addEventListener('load', () => {
  const splash = document.getElementById('splashScreen');
  setTimeout(() => {
    splash.style.transition = 'opacity 0.8s ease';
    splash.style.opacity = '0';
    setTimeout(() => splash.remove(), 800);
  }, 1200);
});

// Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => console.log('Service Worker Registered ✅'))
      .catch(err => console.error('SW registration failed', err));
  });
}

// Notifications
if ('Notification' in window) {
  if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
    Notification.requestPermission().then(p => console.log('Notification permission:', p));
  }
}

function notify(title, body) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body, icon: '/icons/icon-192.png' });
  }
}

// Toast helper
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
  document.getElementById('toastArea').appendChild(el);
  const bs = new bootstrap.Toast(el, { delay });
  bs.show();
  el.addEventListener('hidden.bs.toast', () => el.remove());
  notify('Mini Apps', msg);
}
