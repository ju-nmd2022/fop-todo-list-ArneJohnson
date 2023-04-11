const contentElement = document.getElementById("content");
const loginElement = document.getElementById("login");
const taskWriterElement = document.getElementById("taskwriter");
let currentUser = undefined;
let tasks = [];

const task1 = {
  title:
    "testing testing testing testing testing testing testing testing testing testing ",
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

  const checkmarkButtonElement = document.createElement("div");
  checkmarkButtonElement.classList.add("taskButtons", "checkButton");
  checkmarkButtonElement.innerHTML = "&#10004;";
  checkmarkButtonElement.addEventListener("click", () => {
    task.isCompleted = !task.isCompleted;
    checkmarkButtonElement.className = task.isCompleted
      ? (checkmarkButtonElement.className += " active")
      : checkmarkButtonElement.className.replace(" active", "");
  });
  checkmarkButtonElement.className = task.isCompleted
    ? (checkmarkButtonElement.className += " active")
    : checkmarkButtonElement.className.replace(" active", "");
  articleElement.appendChild(checkmarkButtonElement);

  const removeButtomElement = document.createElement("div");
  removeButtomElement.classList.add("taskButtons", "removeButton");
  removeButtomElement.innerHTML = "&#10006;";
  removeButtomElement.addEventListener("click", () => {
    articleElement.style.animation = "removeButtonAnimation 0.5s";

    setTimeout(() => {
      tasks.splice(tasks.indexOf(task), 1);
      displayTasks();
    }, 501);
  });
  articleElement.appendChild(removeButtomElement);

  return articleElement;
}

function checkLogin() {
  loginElement.innerHTML = "";

  if (currentUser !== undefined) {
    const loginWelcome = document.createElement("p");
    loginWelcome.style.display = "inline";
    loginWelcome.innerText = "Welcome ";
    const usernameSpan = document.createElement("span");
    usernameSpan.innerText = currentUser;
    loginWelcome.appendChild(usernameSpan);
    loginElement.appendChild(loginWelcome);

    const logoutButton = document.createElement("button");
    logoutButton.classList.add("defaultButton");
    logoutButton.innerText = "Logout";
    logoutButton.addEventListener("click", () => {
      currentUser = undefined;
      checkLogin();
      displayTasks();
    });
    loginElement.appendChild(logoutButton);

    return loginElement;
  }

  const loginInput = document.createElement("input");
  loginInput.classList.add("inputBox");
  loginInput.type = "text";
  loginInput.placeholder = "Username";

  const loginButton = document.createElement("button");
  loginButton.classList.add("defaultButton");
  loginButton.innerText = "Login";
  loginButton.addEventListener("click", () => {
    currentUser = loginInput.value;
    checkLogin();
    displayTasks();
  });
  loginElement.appendChild(loginInput);
  loginElement.appendChild(loginButton);

  return loginElement;
}

checkLogin();
displayTasks();
