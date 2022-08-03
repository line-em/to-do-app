// Containers
const tasksContainer = document.getElementById("listTasks");
const infoContainer = document.querySelector(".alerts");
const inputTask = document.getElementById("typetask");
const filterElement = document.getElementById("filter-buttons");

// Event Listeners
const pushButton = document.getElementById("addtask");
const clearAllButton = document.querySelector(".clearAll");
const showAllButton = document.getElementById("show-all");
const showCompleteButton = document.getElementById("show-complete");
const showActiveButton = document.getElementById("show-active");

// Local Storage
const savedTasks = JSON.parse(localStorage.getItem("tasks"));

// Class constructor for tasks
class Tasks {
	constructor() {
		this.task = JSON.parse(localStorage.getItem("tasks")) || [];
	}

	addTask() {
		this.task = this.task.concat({
			id: ~~(Date.now() * Math.random()),
			input: inputTask.value,
			isComplete: false,
			timestamp: new Date().toLocaleString("en-US", {
				weekday: "short",
				month: "short",
				day: "numeric",
				year: "numeric",
				hour: "numeric",
				minute: "numeric",
				second: "numeric"
			})
		});
		// Latest task at the top
		this.task.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
		this.render(tasksContainer);
	}

	render(tasksContainer) {
		// Different style for completed tasks
		tasksContainer.innerHTML = this.task
			.map((task) => {
				return `
				<li>
				<div>
					<label class="tasks" for="${task.id}">
						<input id="${task.id}" class="jello checkbox" type="checkbox" name="checkbox" ${
					task.isComplete ? "checked" : ""
				} />
						${task.input}
					</label>
					<p class="time"><i class="ph-clock-fill"></i>
						${task.timestamp}
					</p>
				</div>
				<div>
					<abbr title="edit task">
						<i class="ph-pencil-bold jello editThis" alt="edit task"></i>
						<span class="tooltip">Edit</span>
					</abbr>
					<abbr title="delete task">
						<i class="ph-trash-fill jello deleteThis" id="delete${task.id}" alt="delete task"></i>
					</abbr>
				</div>
				</li>
			`;
			})
			.join("");

		// isComplete class check
		for (let i = 0; i < this.task.length; i++) {
			if (this.task[i].isComplete) {
				tasksContainer.children[i].classList.toggle("complete");
			}
		}

		// Activate Buttons
		this.showClearAll();
		showFilterButtons();

		// Set to local storage
		localStorage.setItem("tasks", JSON.stringify(this.task));

		// Event Listeners
		const deleteButtons = document.querySelectorAll(".deleteThis");
		deleteButtons.forEach((button) => {
			button.addEventListener("click", deleteTask);
		});

		const editButtons = document.querySelectorAll(".editThis");
		editButtons.forEach((button) => {
			button.addEventListener("click", editTask);
		});

		const checkboxes = document.querySelectorAll(".checkbox");
		checkboxes.forEach((checkbox) => {
			checkbox.addEventListener("click", finishTask);
		});
	}

	showClearAll() {
		if (this.task.length < 2) {
			clearAllButton.style.display = "none";
		} else {
			clearAllButton.style.display = "block";
		}
	}
}

// TODO: Switch All / Completed / To-do
// TODO: Edit Task

const enterTask = (e) => {
	e.preventDefault();
	if (inputTask.value === "") {
		infoContainer.innerHTML = `<div class="alert alert-danger" role="alert"><strong>Error!</strong> You must enter a task.</div>`;
		infoContainer.style.display = "block";
	} else {
		newTask.addTask();
		inputTask.value = "";
		infoContainer.style.display = "none";
		localStorage.setItem("tasks", JSON.stringify(newTask.task));
		newTask.render(tasksContainer);
	}
};

const deleteTask = (e) => {
	let deleteId = e.target.id.slice(6);
	let taskToDelete = newTask.task.find((task) => task.id === +deleteId);
	newTask.task.splice(newTask.task.indexOf(taskToDelete), 1);
	localStorage.setItem("tasks", JSON.stringify(newTask.task));
	newTask.render(tasksContainer);
};

const finishTask = (e) => {
	let checkboxId = e.target.id;
	let taskToComplete = newTask.task.find((task) => task.id === +checkboxId);
	taskToComplete.isComplete = !taskToComplete.isComplete;
	localStorage.setItem("tasks", JSON.stringify(newTask.task));
	// toggle class complete
	newTask.render(tasksContainer);
};

const editTask = function (event) {
	console.log(event.target);
	const editInput = document.createElement("input");
	editInput.type = "text";
	editInput.classList.add("editInput");
	editInput.value = event.target.parentNode.previousElementSibling.innerText;
	// li.replaceChild(editInput, p);
	// editInput.value = t.name;
	// editInput.focus();
	// editInput.addEventListener("keyup", (event) => {
	// 	if (event.keyCode == 13) {
	// 		t.name = editInput.value;
	// 		localStorage.setItem("data", JSON.stringify(newtodo.todo));
	// 		newtodo.render(ul);
	// 	}
	// });
	// editInput.addEventListener("blur", (event) => {
	// 	t.name = editInput.value;
	// 	localStorage.setItem("data", JSON.stringify(newtodo.todo));
	// 	newtodo.render(ul);
	// });
};

const clearAll = () => {
	newTask.task = [];
	localStorage.setItem("tasks", JSON.stringify(newTask.task));
	newTask.render(tasksContainer);
};

const showFilterButtons = () => {
	if (newTask.task.length !== 0) {
		filterElement.style.display = "flex";
	} else {
		filterElement.style.display = "none";
	}
};

// Initialize tasks
const newTask = new Tasks();
let activeTasks = new Tasks();
let completeTasks = new Tasks();

// on page load, check these conditions
if (savedTasks) {
	newTask.task = savedTasks;
	newTask.render(tasksContainer);
}

if (newTask.task.length !== 0) {
	infoContainer.style.display = "none";
}

// Adding all the event listeners
pushButton.addEventListener("click", enterTask);
clearAllButton.addEventListener("click", clearAll);

showActiveButton.addEventListener("click", () => {
	activeTasks.task = newTask.task.filter((task) => !task.isComplete);
	activeTasks.render(tasksContainer);
});

showCompleteButton.addEventListener("click", () => {
	completeTasks.task = newTask.task.filter((task) => task.isComplete);
	completeTasks.render(tasksContainer);
});

showAllButton.addEventListener("click", () => {
	newTask.render(tasksContainer);
});
