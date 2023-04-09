const contentElement = document.getElementById("content");
const loginElement = document.getElementById("login");
const taskWriterElement = document.getElementById("taskwriter");
let currentUser = "Arne";
let tasks = [];

const task1 = {
  title: "taskname",
  isCompleted: false,
};

tasks.push(task1);

function displayTasks() {
  contentElement.innerHTML = "";
  // let tasks = JSON.parse(localStorage.getItem(currentUser));

  for (let i = 0; i < tasks.length; i++) {
    const taskElement = createTaskElement(tasks[i]);
    contentElement.appendChild(taskElement);
  }
}

function createTaskElement(task) {
  const articleElement = document.createElement("article");

  const taskNameElement = document.createElement("div");
  articleElement.appendChild(taskNameElement);

  const titleElement = document.createElement("p");
  titleElement.innerText = task.title;
  taskNameElement.appendChild(titleElement);

  return articleElement;
}

displayTasks();
