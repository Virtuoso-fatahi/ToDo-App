document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskNameInput = document.getElementById("task-name");
  const taskDueDateInput = document.getElementById("task-due-date");
  const taskPriorityInput = document.getElementById("task-priority");
  const taskList = document.getElementById("task-list");
  const addTaskButton = document.getElementById("add-task");
  const taskModal = document.getElementById("task-modal");
  const closeModal = document.querySelector(".close");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let editIndex = null;

  addTaskButton.addEventListener("click", () => {
    taskForm.reset();
    editIndex = null;
    taskModal.style.display = "flex";
  });

  closeModal.addEventListener("click", () => {
    taskModal.style.display = "none";
  });

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = {
      name: taskNameInput.value,
      dueDate: taskDueDateInput.value,
      priority: taskPriorityInput.value,
    };

    if (editIndex !== null) {
      tasks[editIndex] = task;
    } else {
      tasks.push(task);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    taskModal.style.display = "none";
  });

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.className = "task-item";

      const taskDetails = document.createElement("div");
      taskDetails.className = "task-details";
      taskDetails.innerHTML = `
                      <strong>${task.name}</strong>
                      <br>
                      Due: ${task.dueDate}
                      <br>
                      Priority: ${task.priority}
                  `;

      const taskActions = document.createElement("div");
      taskActions.className = "task-actions";
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => {
        taskNameInput.value = task.name;
        taskDueDateInput.value = task.dueDate;
        taskPriorityInput.value = task.priority;
        editIndex = index;
        taskModal.style.display = "flex";
      });
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
      });

      taskActions.appendChild(editButton);
      taskActions.appendChild(deleteButton);
      taskItem.appendChild(taskDetails);
      taskItem.appendChild(taskActions);
      taskList.appendChild(taskItem);
    });
  }

  renderTasks();
});
