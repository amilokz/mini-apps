document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todoForm");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const taskEl = document.createElement("div");
      taskEl.className = "task d-flex justify-content-between align-items-center";
      taskEl.innerHTML = `
        <span>${task}</span>
        <button class="btn btn-sm btn-danger">Delete</button>
      `;
      taskEl.querySelector("button").addEventListener("click", () => {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
        window.toast('Task deleted!');
      });
      taskList.appendChild(taskEl);
    });
  }

  todoForm.addEventListener("submit", e => {
    e.preventDefault();
    const value = taskInput.value.trim();
    if (!value) return;
    tasks.push(value);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    renderTasks();
    window.toast('Task added!');
  });

  renderTasks();
});
