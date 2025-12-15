const todoForm = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage or empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Toast function (from main.js)
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
  document.body.appendChild(el); // add to body
  const bs = new bootstrap.Toast(el, { delay });
  bs.show();
  el.addEventListener('hidden.bs.toast', () => el.remove());
}

// Render tasks function
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskEl = document.createElement("div");
    taskEl.className = "task d-flex justify-content-between align-items-center";
    taskEl.innerHTML = `
      <span>${task}</span>
      <button class="btn btn-sm btn-danger">Delete</button>
    `;

    // Delete task on button click
    taskEl.querySelector("button").addEventListener("click", () => {
      tasks.splice(index, 1); // remove task from array
      localStorage.setItem("tasks", JSON.stringify(tasks)); // update storage
      renderTasks(); // re-render
      toast('Task deleted!'); // show toast
    });

    taskList.appendChild(taskEl);
  });
}

// Handle form submit
todoForm.addEventListener("submit", e => {
  e.preventDefault();
  const value = taskInput.value.trim();
  if (!value) return;
  tasks.push(value);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  renderTasks();
  toast('Task added!'); // toast on add
});

// Initial render
renderTasks();
