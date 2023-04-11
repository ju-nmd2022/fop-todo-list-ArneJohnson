const contentElement = document.getElementById("content");
const loginElement = document.getElementById("login");
const taskWriterInput = document.getElementById("taskInput");
let currentUser = undefined;
let tasks = [];

function displayTasks() {
  contentElement.innerHTML = "";
  taskWriterInput.value = "";

  if (currentUser) {
    tasks = JSON.parse(localStorage.getItem(currentUser));

    for (let task in tasks) {
      const taskElement = createTaskElement(tasks[task]);
      contentElement.appendChild(taskElement);
    }
  }
}

function createTaskElement(task) {
  const articleElement = document.createElement("article");

  // <div class="info-element">
  const infoElement = document.createElement("div");
  infoElement.classList.add("info-element");
  articleElement.appendChild(infoElement);

  // <p>
  const titleElement = document.createElement("p");
  titleElement.innerText = task.title;
  infoElement.appendChild(titleElement);

  // <div class="task-buttons check-button>"
  const checkmarkButtonElement = document.createElement("div");
  checkmarkButtonElement.classList.add("task-buttons", "check-button");
  checkmarkButtonElement.innerHTML = "&#10004;";
  checkmarkButtonElement.addEventListener("click", () => {
    task.isCompleted = !task.isCompleted;

    localStorage.setItem(currentUser, JSON.stringify(tasks));

    checkmarkButtonElement.className = task.isCompleted
      ? (checkmarkButtonElement.className += " active")
      : checkmarkButtonElement.className.replace(" active", "");
  });

  checkmarkButtonElement.className = task.isCompleted
    ? (checkmarkButtonElement.className += " active")
    : checkmarkButtonElement.className.replace(" active", "");

  articleElement.appendChild(checkmarkButtonElement);

  // <div class="task-buttons remove-button>"
  const removeButtomElement = document.createElement("div");
  removeButtomElement.classList.add("task-buttons", "remove-button");
  removeButtomElement.innerHTML = "&#10006;";
  removeButtomElement.addEventListener("click", () => {
    articleElement.style.animation = "slide-out-animation 0.7s forwards";

    setTimeout(() => {
      tasks.splice(tasks.indexOf(task), 1);
      localStorage.setItem(currentUser, JSON.stringify(tasks));
      displayTasks();
    }, 701);
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
    logoutButton.classList.add("default-button");
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
  loginInput.classList.add("input-box");
  loginInput.type = "text";
  loginInput.placeholder = "Username";

  const loginButton = document.createElement("button");
  loginButton.classList.add("default-button");
  loginButton.innerText = "Login";
  loginButton.addEventListener("click", () => {
    if (loginInput.value.length > 0) {
      currentUser = loginInput.value;
      checkLogin();
      displayTasks();
    }
  });
  loginElement.appendChild(loginInput);
  loginElement.appendChild(loginButton);

  return loginElement;
}

function addTask() {
  if (taskWriterInput.value.length > 0 && currentUser) {
    let task = {
      title: taskWriterInput.value,
      isCompleted: false,
    };

    // Prevents a code error when currentUser isn't a key in the local storage
    if (localStorage.getItem(currentUser) === null) {
      tasks = [];
    }

    tasks.push(task);
    localStorage.setItem(currentUser, JSON.stringify(tasks));

    const taskElement = createTaskElement(task);
    taskElement.style.animation = "pop-up-animation 0.5s forwards";
    contentElement.appendChild(taskElement);
  }

  taskWriterInput.value = "";
}

checkLogin();
displayTasks();
