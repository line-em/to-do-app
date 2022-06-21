// Containers
const tasksContainer = document.getElementById("listTasks");
const infoContainer = document.querySelector(".alerts");
const inputTask = document.getElementById("typetask");

// Event Listeners
const pushButton = document.getElementById("addtask");
const clearAllButton = document.querySelector(".clearAll");

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
				minute: "numeric"
			})
		});

		// TODO: Sort by Timestamp

		this.render(tasksContainer);
	}

	render(tasksContainer) {
		// Different style for completed tasks
		const completedTasks = this.task.filter((task) => task.isComplete);
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
					</p></div>
					<i class="ph-trash-fill jello deleteThis" id="delete${task.id}"></i>
				</li>
			`;
			})
			.join("");
		this.showClearAll();
		localStorage.setItem("tasks", JSON.stringify(this.task));

		// Event Listeners
		const deleteButtons = document.querySelectorAll(".deleteThis");
		deleteButtons.forEach((button) => {
			button.addEventListener("click", deleteTask);
		});

		const checkboxes = document.querySelectorAll(".checkbox");
		checkboxes.forEach((checkbox) => {
			checkbox.addEventListener("click", completeTask);
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

deleteTask = (e) => {
	let deleteId = e.target.id.slice(6);
	let taskToDelete = newTask.task.find((task) => task.id === +deleteId);
	newTask.task.splice(newTask.task.indexOf(taskToDelete), 1);
	localStorage.setItem("tasks", JSON.stringify(newTask.task));
	newTask.render(tasksContainer);
};

completeTask = (e) => {
	let checkboxId = e.target.id;
	let taskToComplete = newTask.task.find((task) => task.id === +checkboxId);
	taskToComplete.isComplete = !taskToComplete.isComplete;
	localStorage.setItem("tasks", JSON.stringify(newTask.task));
	newTask.render(tasksContainer);
};
// TODO: Switch All / Completed / To-do
// TODO: Edit Task

const newTask = new Tasks();

if (savedTasks) {
	newTask.task = savedTasks;
	newTask.render(tasksContainer);
}

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

const clearAll = () => {
	newTask.task = [];
	localStorage.setItem("tasks", JSON.stringify(newTask.task));
	newTask.render(tasksContainer);
};

pushButton.addEventListener("click", enterTask);
clearAllButton.addEventListener("click", clearAll);
