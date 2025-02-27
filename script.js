let input = document.querySelector("input");
let addBtn = document.querySelector("#add");
let lists = document.querySelector(".lists");

// Adding local Storage
let todo = JSON.parse(localStorage.getItem("todo")) || []; // if there is no todo-list, it will return an empty array
if (!todo) {
  todo = [];
}

displayTasks(); // displays when the page loads

// crud operations
function displayTasks() {
  lists.innerHTML = ""; // stops repetition of the whole array every time a new item is added

  todo.forEach((element) => {
    // we need error controlling conditionals
    let div = document.createElement("div");
    div.classList.add("tasks");

    let task = document.createElement("p");
    task.textContent = element.todo;
    task.setAttribute("style", "cursor: pointer; font-weight: 400;");
    console.log(task.textContent);

    task.addEventListener("dblclick", () => {
      task.contentEditable = false;
      element.status = !element.status; // toggles status n true and false on local storage when double clicked
      localStorage.setItem("todo", JSON.stringify(todo));
      task.setAttribute(
        "style",
        element.status
          ? "text-decoration: line-through; font-style: italic; cursor: pointer; opacity: 0.5;"
          : "text-decoration: none; font-style: normal; cursor: pointer; opacity: 1;"
      );
    });

    let edit = document.createElement("button");
    edit.textContent = "Edit";
    edit.setAttribute("style", "margin-left: auto;");
    edit.addEventListener("click", () => {
      task.contentEditable = true;
      task.focus();
      task.setAttribute(
        "style",
        "background-color: #f0f0f0; cursor: text; padding: 5px; border-radius: 5px; border: 2px solid black"
      );

      task.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          task.contentEditable = false;

          element.todo = task.textContent.trim();
          localStorage.setItem("todo", JSON.stringify(todo));
          task.classList.add("tasks");
        }
      });
    });

    let del = document.createElement("button");
    del.textContent = "DEL";
    del.addEventListener("click", () => {
      const index = todo.indexOf(element);
      div.remove();
      todo.splice(index, 1);

      localStorage.setItem("todo", JSON.stringify(todo));
      displayTasks();
    });

    div.append(task, edit, del);
    lists.appendChild(div);
  });
}

addBtn.addEventListener("click", () => {
  let task = input.value;
  if (task !== "") {
    if (!todo) {
      todo = [];
    }
    let items = {
      todo: input.value,
      status: false,
    };
    todo.push(items);
    console.log(items);
    localStorage.setItem("todo", JSON.stringify(todo));
    displayTasks();
    input.value = ""; // Clear input
  } else {
    let error = document.createElement("p");
    error.textContent = "Please enter a task!";
    lists.appendChild(error);
    setTimeout(() => {
      error.remove();
    }, 3000);
  }
});
