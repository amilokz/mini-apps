const todoForm = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, i) => {
    taskList.innerHTML += `<div class="task">${task}</div>`;
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
});

renderTasks();
