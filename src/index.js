import "./styles.css";
import {
  getProjects,
  deleteTodoItemFromProject,
  createTodo,
} from "./createTodo";
import { generateModal, showTodoDetails, showModal } from "./modal";

function renderProjects() {
  console.log("render projects");
  const projectContainer = document.querySelector(".project-container");
  projectContainer.innerHTML = ""; // Clear previous content

  const projectsDiv = document.createElement("div");
  projectsDiv.classList.add("projects");

  const projectCardTitle = document.createElement("h2");
  projectCardTitle.classList.add("projectcard-title");
  projectCardTitle.textContent = "Projects"; // Title for default project
  projectContainer.appendChild(projectCardTitle);

  const otherProjects = getOtherProjects();

  otherProjects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");

    // Project Name
    const projectName = document.createElement("h3");
    projectName.textContent = project.name;
    projectCard.appendChild(projectName);

    // Todo List (collapsed view, just titles)
    const todoList = document.createElement("ul");
    project.todos.forEach((todo, todoIndex) => {
      const todoItem = document.createElement("li");
      todoItem.textContent = todo.title; // Display just the title

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => {
        deleteTodoItemFromProject(project.name, todoIndex);
        renderProjects();
      };
      todoItem.appendChild(deleteButton);

      const infoButton = document.createElement("button");
      infoButton.textContent = "info";
      infoButton.onclick = () => {
        showTodoDetails(todo, (updatedTodoData) => {
          todo.title = updatedTodoData.title;
          todo.description = updatedTodoData.description;
          todo.dueDate = updatedTodoData.dueDate;
          todo.projectName = updatedTodoData.projectName;
        });
      };
      todoItem.appendChild(infoButton);
      todoList.appendChild(todoItem);
    });

    projectCard.appendChild(todoList);
    projectsDiv.appendChild(projectCard);
  });
  projectContainer.appendChild(projectsDiv);
}

function renderMainCard() {
  console.log("render main card");
  const mainCardContainer = document.querySelector(".main-card-container");
  mainCardContainer.innerHTML = ""; // Clear previous content

  const defaultProject = getDefaultProject();
  if (!defaultProject) return; // If there's no default project, exit

  const mainCard = document.createElement("div");
  mainCard.classList.add("main-card");

  // Title for main card
  const mainCardTitle = document.createElement("h2");
  mainCardTitle.textContent = "General Todos"; // Title for default project
  mainCard.appendChild(mainCardTitle);

  // List of todos from the default project
  const todoList = document.createElement("ul");
  defaultProject.todos.forEach((todo, todoIndex) => {
    const todoItem = document.createElement("li");
    todoItem.textContent = todo.title; // Display just the title for now

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => {
      deleteTodoItemFromProject(defaultProject.name, todoIndex);
      renderMainCard();
    };
    todoItem.appendChild(deleteButton);

    const infoButton = document.createElement("button");
    infoButton.textContent = "info";
    infoButton.onclick = () => {
      showTodoDetails(todo, (updatedTodoData) => {
        todo.title = updatedTodoData.title;
        todo.description = updatedTodoData.description;
        todo.dueDate = updatedTodoData.dueDate;
        todo.projectName = updatedTodoData.projectName;
      });
    };
    todoItem.appendChild(infoButton);
    todoList.appendChild(todoItem);
  });

  mainCard.appendChild(todoList);
  mainCardContainer.appendChild(mainCard);
}

function getDefaultProject() {
  let projects = getProjects();
  return projects.find((project) => project.name === "default");
}

function getOtherProjects() {
  let projects = getProjects();
  return projects.filter((project) => project.name !== "default");
}

// Attach events
function addTodo() {
  const addTodoBtn = document.querySelector(".addTodoBtn");
  addTodoBtn.addEventListener("click", () => {
    showModal((newTodoData) => {
      new createTodo(
        newTodoData.title,
        newTodoData.description,
        newTodoData.dueDate,
        newTodoData.projectName,
      );
      renderMainCard();
      renderProjects();
      console.log("test");
    });
  });
}

function onModalCloseCallBack(tododata) {
  new createTodo(
    tododata.title,
    tododata.description,
    tododata.dueDate,
    tododata.projectName,
  );
  // renderMainCard();
  // renderProjects();
  // console.log("modal close callback run")
}

function init() {
  generateModal(onModalCloseCallBack);
  renderMainCard();
  renderProjects();
  addTodo();
}

init();
