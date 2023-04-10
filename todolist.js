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

  for (let task in tasks) {
    const taskElement = createTaskElement(tasks[task]);
    contentElement.appendChild(taskElement);
  }
}

function createTaskElement(task) {
  const articleElement = document.createElement("article");

  const infoElement = document.createElement("div");
  infoElement.classList.add("info-element");
  articleElement.appendChild(infoElement);

  const titleElement = document.createElement("p");
  titleElement.innerText = task.title;
  infoElement.appendChild(titleElement);

  const buttonsElement = document.createElement("div");
  buttonsElement.classList.add("task-buttons");
  articleElement.appendChild(buttonsElement);

  const checkmarkButtonElement = document.createElement("button");
  checkmarkButtonElement.addEventListener("click", () => {});
  buttonsElement.appendChild(checkmarkButtonElement);

  const removeButtomElement = document.createElement("button");
  removeButtomElement.addEventListener("click", () => {});
  buttonsElement.appendChild(removeButtomElement);

  return articleElement;
}

displayTasks();
