const contentElement = document.getElementById("content");
const loginElement = document.getElementById("login");
const taskWriterElement = document.getElementById("taskwriter");
let currentUser = "Arne";

function displayTasks() {
  let tasks = JSON.parse(localStorage.getItem(currentUser));

  contentElement.innerHTML = "";

  for (let task in tasks) {
    const taskElement = createTaskElement(task);
    contentElement.appendChild(taskElement);
  }
}

function createTaskElement(task) {}
