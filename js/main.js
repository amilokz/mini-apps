// ===== Splash Screen =====
window.addEventListener("load", () => {
  const splash = document.getElementById("splashScreen");
  
  // Show splash for 1 second, then fade out
  setTimeout(() => {
    splash.style.opacity = "0"; // fade
    setTimeout(() => {
      splash.style.display = "none"; // remove from layout
    }, 800); // match CSS transition
  }, 1000); // 1 second splash screen
});

// ===== Toast Function =====
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

// ===== Calculator =====
const screen = document.getElementById("calcScreen");
let expr = "";

document.querySelectorAll(".key").forEach(btn => {
  btn.addEventListener("click", () => {
    if(btn.textContent === "=") {
      try {
        expr = Function("return " + expr)().toString();
      } catch {
        expr = "";
        toast("Invalid calculation");
      }
    } else {
      expr += btn.textContent;
    }
    screen.textContent = expr || "0";
  });
});
