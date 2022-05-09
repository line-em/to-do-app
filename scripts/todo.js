// Containers
const tasksContainer = document.getElementById("listTasks");
const infoContainer = document.querySelector(".alerts");
const inputTask = document.getElementById("typetask");
// Event Listeners
const pushButton = document.getElementById("addtask");
const clearAllButton = document.querySelector(".clearAll");

// Local Storage
const savedIds = JSON.parse(localStorage.getItem("tasksId"));
const savedTasks = JSON.parse(localStorage.getItem("tasks"));
const savedTimestamps = JSON.parse(localStorage.getItem("timestamps"));

// Other Variables
// Store tasks and their info.
let allTasks = [];
let allIds = [];
let allTimestamps = [];

// Helper Functions
// Create DOM element with task data gotten from the input (renderTask)
const createTasks = (task, id, time) => {
	let newTask = document.createElement("li");
	tasksContainer.appendChild(newTask);
	newTask.id = id;
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
};

// Button to clear everything
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

// Delete Task
const deleteTask = () => {
	const deleteButton = document.querySelectorAll(".ph-trash-fill");
	let click = true;
	for (let i = 0; i < deleteButton.length; i++) {
		deleteButton[i].addEventListener("click", function () {
			if (click) {
				let deleteParentId = deleteButton[i].parentElement.id;
				let deleteParentIdInteger = Number(deleteParentId);
				let taskIndex = allIds.indexOf(deleteParentIdInteger);

				console.log(taskIndex);
				console.log(allTasks);
				console.log(allTasks[taskIndex]);

				// Array
				allTasks.splice(taskIndex, 1);
				allIds.splice(taskIndex, 1);
				allTimestamps.splice(taskIndex, 1);

				console.log(taskIndex);
				console.log(allTasks);
				console.log(allTasks[taskIndex]);

				// Re-do the local storage
				localStorage.setItem("tasks", JSON.stringify(allTasks));
				localStorage.setItem("tasksId", JSON.stringify(allIds));
				localStorage.setItem("timestamps", JSON.stringify(allTimestamps));

				// DOM
				deleteButton[i].parentElement.remove();

				click = false;
			}
		});
	}
};

// Complete Task
function completeTask() {
	const check = document.querySelectorAll(".checkbox");
	for (let i = 0; i < check.length; i++) {
		check[i].addEventListener("click", () => {
			if (check[i].checked) {
				let checkParentId = check[i].parentElement.parentElement.parentElement.id;
				let checkParentIdInteger = Number(checkParentId);
				let taskIndex = allIds.indexOf(checkParentIdInteger);
				// Array
				allTasks.splice(taskIndex, 1);
				allIds.splice(taskIndex, 1);
				allTimestamps.splice(taskIndex, 1);

				// Re-do the local storage
				// localStorage.clear();
				localStorage.setItem("tasks", JSON.stringify(allTasks));
				localStorage.setItem("tasksId", JSON.stringify(allIds));
				localStorage.setItem("timestamps", JSON.stringify(allTimestamps));

				// DOM
				check[i].parentElement.style = "text-decoration: line-through; opacity: 100%;";
				check[i].parentElement.parentElement.parentElement.style = "background:teal";
				check[i].parentElement.parentElement.parentElement.querySelector(
					".ph-trash-fill"
				).style = "display:none";
				check[i].style = "display:none";

				// set timeout to remove the task from the DOM
				setTimeout(() => {
					check[i].parentElement.parentElement.parentElement.remove();
				}, 700);

				check[i].checked = false;
			}
		});
	}
}

// Get the task and its info.
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
	// checkboxListener();
	completeTask();
};

// Event Listener: add task
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
	clearAllTasks();
	deleteTask();
	completeTask();
}

// TRIAL AREA

// const checkboxes = document.querySelectorAll(".checkbox");
// function checkboxListener() {
// 	for (let i = 0; i < checkboxes.length; i++) {
// 		checkboxes[i].addEventListener("change", (e) => {
// 			if (checkboxes[i].checked) {
// 				console.log("check");
// 			} else {
// 				console.log("uncheck");
// 			}
// 		});
// 	}
// }
// console.log("clicked");
// let taskIndex = allIds.indexOf(e.target.parentElement.id);
// console.log(taskIndex);
// redoArrays(taskIndex);
// 	});
// }

// checkboxes.forEach((checkbox) => {
// 	checkbox.addEventListener("click", completeTask);
// });

// function completeTask() {
// 	let checkParentId = this.parentElement.parentElement.parentElement.id;
// 	let checkParentIdInteger = Number(checkParentId);
// 	let taskIndex = allIds.indexOf(checkParentIdInteger);
// console.log(taskIndex);
// console.log(allTasks);
// console.log(allTasks[taskIndex]);
// allTasks.splice(taskIndex, 1);
// allIds.splice(taskIndex, 1);
// allTimestamps.splice(taskIndex, 1);
// console.log(allTasks);

// // Re-do the local storage
// localStorage.setItem("tasks", JSON.stringify(allTasks));
// localStorage.setItem("tasksId", JSON.stringify(allIds));
// localStorage.setItem("timestamps", JSON.stringify(allTimestamps));

// 	// DOM
// 	checkbox.parentElement.style = "text-decoration: line-through; opacity: 50%;";
// 	checkbox.style = "display:none";
// }

// for (let i = 0; i < check.length; i++) {
// 	check[i].addEventListener("click", () => {
// 		let checkParentId = check[i].parentElement.parentElement.parentElement.id;
// 		let checkParentIdInteger = Number(checkParentId);
// 		let taskIndex = allIds.indexOf(checkParentIdInteger);
// 		console.log(taskIndex);
// 		console.log(allTasks);
// 		console.log(allTasks[taskIndex]);
// 		allTasks.splice(taskIndex, 1);
// 		allIds.splice(taskIndex, 1);
// 		allTimestamps.splice(taskIndex, 1);
// 		console.log(allTasks);

// 		// Re-do the local storage
// 		localStorage.setItem("tasks", JSON.stringify(allTasks));
// 		localStorage.setItem("tasksId", JSON.stringify(allIds));
// 		localStorage.setItem("timestamps", JSON.stringify(allTimestamps));

// 		// DOM
// 		check[i].parentElement.style = "text-decoration: line-through; opacity: 50%;";
// 		check[i].style = "display:none";
// 		return;
// 	});

// const redoArrays = (taskIndex) => {
// 	console.log(taskIndex);
// 	console.log(allTasks);
// 	console.log(allTasks[taskIndex]);
// 	allTasks.splice(taskIndex, 1);
// 	allIds.splice(taskIndex, 1);
// 	allTimestamps.splice(taskIndex, 1);
// 	console.log(allTasks);

// 	// Re-do the local storage
// 	localStorage.setItem("tasks", JSON.stringify(allTasks));
// 	localStorage.setItem("tasksId", JSON.stringify(allIds));
// 	localStorage.setItem("timestamps", JSON.stringify(allTimestamps));
// };
