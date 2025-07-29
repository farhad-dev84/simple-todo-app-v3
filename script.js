// تعریف آرایه‌ی کلی برای ذخیره‌ی کارها
let tasks = [];

// DOM Element ها
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterTasks = document.getElementById("filterTasks");

// رویدادهای اولیه
addTaskBtn.addEventListener("click", addTask);
filterTasks.addEventListener("change", displayTasks);

// بارگذاری تسک‌ها از localStorage هنگام بارگذاری صفحه
window.addEventListener("load", () => {
  loadTasks();
  displayTasks();
});

// افزودن تسک جدید
function addTask() {
  const text = taskInput.value.trim();
  if (text) {
    const newTask = {
      id: Date.now(),
      text,
      completed: false
    };
    tasks.push(newTask);
    saveTasks();
    displayTasks();
    taskInput.value = "";
  }
}

// نمایش لیست بر اساس فیلتر
function displayTasks() {
  taskList.innerHTML = "";

  const filter = filterTasks.value;

  tasks.forEach(task => {
    if (
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "uncompleted" && !task.completed)
    ) {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";

      const span = document.createElement("span");
      span.textContent = task.text;
      if (task.completed) {
        span.classList.add("text-decoration-line-through", "text-muted");
      }

      // دکمه‌ها
      const buttons = document.createElement("div");

      const completeBtn = document.createElement("button");
      completeBtn.className = "btn btn-sm btn-outline-success me-2";
      completeBtn.textContent = "✅";
      completeBtn.onclick = () => toggleComplete(task.id);

      const editBtn = document.createElement("button");
      editBtn.className = "btn btn-sm btn-outline-primary me-2";
      editBtn.textContent = "✏️";
      editBtn.onclick = () => editTask(task.id);

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn btn-sm btn-outline-danger";
      deleteBtn.textContent = "🗑️";
      deleteBtn.onclick = () => deleteTask(task.id);

      buttons.appendChild(completeBtn);
      buttons.appendChild(editBtn);
      buttons.appendChild(deleteBtn);

      li.appendChild(span);
      li.appendChild(buttons);
      taskList.appendChild(li);
    }
  });
}

// تغییر وضعیت انجام شده
function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    displayTasks();
  }
}

// ویرایش تسک
function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    const newText = prompt("متن جدید را وارد کنید :", task.text);
    if (newText && newText.trim() !== "") {
      task.text = newText.trim();
      saveTasks();
      displayTasks();
    }
  }
}

// حذف تسک
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  displayTasks();
}

// ذخیره در localStorage
function saveTasks() {
  localStorage.setItem("myTasks", JSON.stringify(tasks));
}

// بارگذاری از localStorage
function loadTasks() {
  const data = localStorage.getItem("myTasks");
  if (data) {
    tasks = JSON.parse(data); // اصلاح این خط
  }
}