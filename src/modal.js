let modalElement;
export function generateModal(onCloseCallback) {
  let modal = document.createElement("div");
  let modalContent = document.createElement("div");
  let titleInput = document.createElement("input");
  let closeBtn = document.createElement("button");
  let descInput = document.createElement("input");
  let datepicker = document.createElement("input");
  let projectInput = document.createElement("input");
  let saveButton = document.createElement("button");

  titleInput.classList.add("modal-title");
  descInput.classList.add("modal-description");
  datepicker.classList.add("modal-duedate");
  projectInput.classList.add("modal-project");
  saveButton.classList.add("saveBtn");
  closeBtn.classList.add("closeBtn2");

  datepicker.type = "date";
  titleInput.value = "Hello";
  descInput.value = "Hello";
  titleInput.placeholder = "Title";
  descInput.placeholder = "Description";
  projectInput.placeholder = "Project name";
  saveButton.textContent = "save";
  closeBtn.textContent = "X";

  modalContent.appendChild(closeBtn);
  modalContent.appendChild(titleInput);
  modalContent.appendChild(descInput);
  modalContent.appendChild(projectInput);
  modalContent.appendChild(datepicker);
  modalContent.appendChild(saveButton);

  modal.classList.add("modal");
  modalContent.classList.add("modal-content");
  modal.appendChild(modalContent);

  saveButton.addEventListener("click", () => {
    if (typeof onCloseCallback === "function") {
      onCloseCallback({
        title: titleInput.value,
        description: descInput.value,
        dueDate: datepicker.value,
        projectName: projectInput.value,
      });
    }
    hideModal(modal);
  });

  closeBtn.addEventListener("click", () => {
    hideModal();
  });

  let container = document.querySelector(".grid-container");
  container.appendChild(modal);

  modalElement = modal;
}

export function showTodoDetails(todo, onSaveCallback) {
  modalElement.querySelector(".modal-title").value = todo.title;
  modalElement.querySelector(".modal-description").value = todo.description;
  modalElement.querySelector(".modal-duedate").value = todo.dueDate;
  modalElement.querySelector(".modal-project").value =
    todo.projectName === "undefined" || todo.projectName === null
      ? ""
      : todo.projectName;
  showModal(onSaveCallback);
}

function clearModalFields() {
  modalElement.querySelector(".modal-title").value = "";
  modalElement.querySelector(".modal-description").value = "";
  modalElement.querySelector(".modal-duedate").value = "";
  modalElement.querySelector(".modal-project").value = "";
}

// Show modal
// export function showModal() {
//     modalElement.classList.add("is-visible");
// }

// Modified showModal function
export function showModal(onSaveCallback) {
  // Make modal visible
  modalElement.classList.add("is-visible");

  // Ensure previous event listeners are cleared before attaching a new one
  const saveButton = modalElement.querySelector(".saveBtn"); // Assuming close button is also the save button

  // Remove any previous click event listeners to avoid duplicating actions
  const newSaveButton = saveButton.cloneNode(true);
  saveButton.parentNode.replaceChild(newSaveButton, saveButton);

  // Add the new callback to handle save or update
  newSaveButton.addEventListener("click", () => {
    if (typeof onSaveCallback === "function") {
      // Call the provided callback with modal's input data
      onSaveCallback({
        title: modalElement.querySelector(".modal-title").value,
        description: modalElement.querySelector(".modal-description").value,
        dueDate: modalElement.querySelector(".modal-duedate").value,
        projectName: modalElement.querySelector(".modal-project").value,
      });
    }
    hideModal(modalElement); // Hide modal after saving/updating
  });
}

// Hide modal
export function hideModal() {
  clearModalFields();
  modalElement.classList.remove("is-visible");
}
