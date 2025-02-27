let input = document.querySelector("input");
let addBtn = document.querySelector("#add");
let lists = document.querySelector(".lists");

// Adding local Storage
let todo = JSON.parse(localStorage.getItem("todo")) || []; // if there is no todo-list, it will return an empty array
if (!todo) {
  todo = [];
}

// crud operations

addBtn.addEventListener("click", () => {
  if (input.value !== "") {
    let div = document.createElement("div");
    div.classList.add("tasks");

    let task = taskCreation(div);
    editTask(div, task);
    delTask(div);

    lists.appendChild(div);
    // we don't have a local storage yet
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

    input.value = "";
  } else {
    let error = document.createElement("p");
    error.textContent = "Please enter a task!";
    lists.appendChild(error);
    setTimeout(() => {
      error.remove();
    }, 3000);
  }
});

function readTasks(div) {
  todo.forEach((item) => {
    taskCreation(div).textContent = item.todo;
  });
}

function taskCreation(div) {
  let task = document.createElement("p");
  task.textContent = input.value;

  task.addEventListener("dblclick", () => {
    task.contentEditable = false;
    task.setAttribute(
      "style",
      "text-decoration: line-through; font-style: italic; cursor: pointer; opacity: 0.5;"
    );
  });

  div.appendChild(task);
  return task;
}

function editTask(div, task) {
  let edit = document.createElement("button");
  edit.textContent = "edit";
  edit.setAttribute("style", "margin-left: auto;");
  edit.addEventListener("click", () => {
    task.contentEditable = true;
    task.setAttribute(
      "style",
      "background-color: #f0f0f0; cursor: text; padding: 5px; border-radius: 5px;"
    );
  });

  div.appendChild(edit);
}

function delTask(div) {
  let del = document.createElement("button");
  del.textContent = "del";
  del.addEventListener("click", () => {
    div.remove();
  });

  div.appendChild(del);
}
