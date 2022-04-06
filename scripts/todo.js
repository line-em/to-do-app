// Containers
const tasksContainer = document.getElementById("listTasks");
const infoContainer = document.querySelector(".alerts");
const inputTask = document.getElementById("typetask");
// Event Listeners
const pushButton = document.getElementById("addtask");
const clearAllButton = document.querySelector(".clearAll");
// Local Storage
// const savedTasks = localStorage.getItem("tasks");
const savedIds = JSON.parse(localStorage.getItem("tasksId"));
const savedTasks = JSON.parse(localStorage.getItem("tasks"));
const savedTimestamps = JSON.parse(localStorage.getItem("timestamps"));
// Other Variables
let allTasks = [];
let allIds = [];
let allTimestamps = [];

// Functions
const createTasks = (task, id, time) => {
	let newTask = document.createElement("li");
	tasksContainer.appendChild(newTask);
	newTask.innerHTML = `
		<div>
		<label class="tasks">
            <input class="jello checkbox" type="checkbox" name="checkbox">
            ${task}
		</label>
		<p class="time"><i class="ph-clock-fill"></i>
			${time}
		</p>
		</div>
        <i class="ph-trash-fill jello"></i>`;
	newTask.id = id;
};

const clearAllTasks = () => {
	if (allTasks.length <= 2) {
		clearAllButton.style.display = "none";
	} else {
		clearAllButton.style.display = "block";
		clearAllButton.addEventListener("click", function () {
			localStorage.clear();
			allTasks = [];
			tasksContainer.innerHTML = "";
			clearAllTasks();
		});
	}
};

const deleteTask = () => {
	const deleteButton = document.querySelectorAll(".ph-trash-fill");
	for (let i = 0; i < deleteButton.length; i++) {
		deleteButton[i].addEventListener("click", function () {
			let deleteParentId = deleteButton[i].parentElement.id;
			let deleteParentIdInteger = Number(deleteParentId);
			let taskIndex = allIds.indexOf(deleteParentIdInteger);

			// For debuggin
			// console.log(parentId);
			// console.log(taskIndex);

			allTasks.splice(taskIndex, 1);
			allIds.splice(taskIndex, 1);
			allTimestamps.splice(taskIndex, 1);

			// For debugging
			// console.log(allTasks);
			// console.log(allIds);

			// Remove from container
			deleteButton[i].parentElement.remove();

			// Re-do the local storage
			localStorage.clear();
			localStorage.setItem("tasks", JSON.stringify(allTasks));
			localStorage.setItem("tasksId", JSON.stringify(allIds));
			localStorage.setItem("timestamps", JSON.stringify(allTimestamps));
		});
	}
};

function completeTask() {
	const check = document.querySelectorAll(".checkbox");
	for (let i = 0; i < check.length; i++) {
		check[i].addEventListener("click", () => {
			let checkParentId = check[i].parentElement.id;
			let checkParentIdInteger = Number(checkParentId);
			let taskIndex = allIds.indexOf(checkParentIdInteger);

			check[i].parentElement.style = "text-decoration: line-through; opacity: 50%;";
			check[i].style = "display:none";

			allTasks.splice(taskIndex, 1);
			allIds.splice(taskIndex, 1);
			allTimestamps.splice(taskIndex, 1);

			// Re-do the local storage
			localStorage.clear();
			localStorage.setItem("tasks", JSON.stringify(allTasks));
			localStorage.setItem("tasksId", JSON.stringify(allIds));
			localStorage.setItem("timestamps", JSON.stringify(allTimestamps));
		});
	}
}

const renderTask = () => {
	let taskId = Math.floor(Date.now() * Math.random());
	let time = new Date();
	let timestamp = time.toLocaleString("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "numeric",
		minute: "numeric"
	});
	if (inputTask.value.length === 0) {
		infoContainer.style.display = "block";
		infoContainer.textContent = "Please enter a task!";
	} else {
		// No alert
		infoContainer.style.display = " none";
		// Push info to the arrays
		allTasks.push(inputTask.value);
		allIds.push(taskId);
		allTimestamps.push(timestamp);
		// Set them to local storage
		localStorage.setItem("tasks", JSON.stringify(allTasks));
		localStorage.setItem("tasksId", JSON.stringify(allIds));
		localStorage.setItem("timestamps", JSON.stringify(allTimestamps));
		// Create the task
		createTasks(inputTask.value, taskId, timestamp);
		// Clear the input
		inputTask.value = "";
	}
	// Reload these functions
	clearAllTasks();
	deleteTask();
	completeTask();
};

// Event Listeners
pushButton.addEventListener("click", renderTask, false);

// On Load
if (savedTasks) {
	for (i = 0; i < savedTasks.length; i++) {
		createTasks(savedTasks[i], savedIds[i], savedTimestamps[i]);
	}
	infoContainer.style.display = "none";
	if (savedTasks.length > 0) {
		allTasks = allTasks.concat(savedTasks);
		allIds = allIds.concat(savedIds);
		allTimestamps = allTimestamps.concat(savedTimestamps);
	}
}

clearAllTasks();
deleteTask();
completeTask();
