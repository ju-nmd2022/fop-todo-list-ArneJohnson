const contentElement = document.getElementById("content");
const loginElement = document.getElementById("login");
const taskWriterElement = document.getElementById("taskwriter");
let currentUser = "Arne";
let tasks = [];

const task1 = {
  title: "task 1",
  isCompleted: false,
};

const task2 = {
  title: "task 2",
  isCompleted: false,
};

tasks.push(task1);
tasks.push(task2);

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

  const checkmarkButtonElement = document.createElement("button");
  checkmarkButtonElement.classList.add("checkButton");
  checkmarkButtonElement.addEventListener("click", () => {
    task.isCompleted = !task.isCompleted;
    displayTasks();
  });
  checkmarkButtonElement.style.backgroundColor = task.isCompleted
    ? "rgb(88, 191, 116)"
    : "none";
  articleElement.appendChild(checkmarkButtonElement);

  const removeButtomElement = document.createElement("div");
  removeButtomElement.classList.add("removeButton");
  removeButtomElement.innerHTML = "&times;";
  removeButtomElement.addEventListener("click", () => {
    articleElement.style.animation = "removeButtonAnimation 0.5s";

    setTimeout(() => {
      tasks.splice(task, 1);
      displayTasks();
    }, 501);
  });
  articleElement.appendChild(removeButtomElement);

  return articleElement;
}

displayTasks();
