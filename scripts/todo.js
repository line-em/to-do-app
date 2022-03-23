const tasksContainer = document.getElementById("listTasks");
const infoContainer = document.querySelector(".alerts");
const inputTask = document.getElementById("typetask");
const pushButton = document.getElementById("addtask");
const clearAll = document.querySelector(".clearAll");
const savedData = localStorage.getItem("tasks");
let savedTasks = JSON.parse(localStorage.getItem("tasks"));
let allTasks = [];
let strike = false;

if (savedData) {
	for (i = 0; i < savedTasks.length; i++) {
		tasksContainer.innerHTML += `
            <li>
            <label class="tasks">
            <input class="jello checkbox" type="checkbox" name="checkbox">
            ${savedTasks[i]}</label>
            <i class="ph-trash-fill jello"></i></li>`;
	}
	infoContainer.style.display = "none";
	if (savedTasks.length > 0) {
		allTasks = allTasks.concat(savedTasks);
	}
	clearAllVisibility();
	deleteItems();
	checkItems();
}

pushButton.addEventListener("click", addToContainer, false);
function addToContainer() {
	if (inputTask.value.length === 0) {
		infoContainer.style.display = "block";
		infoContainer.textContent = "Please enter a task!";
	} else {
		infoContainer.style.display = " none";
		allTasks.push(inputTask.value);
		tasksContainer.innerHTML += `
            <li>
            <label class="tasks">
            <input class="jello checkbox" type="checkbox" name="checkbox" id="">
            ${inputTask.value}</label>
           <i class="ph-trash-fill jello"></i>
            </li>`;
		inputTask.value = "";
		localStorage.setItem("tasks", JSON.stringify(allTasks));
		clearAllVisibility();
	}
	deleteItems();
	checkItems();
}

function deleteItems() {
	const deleteI = document.querySelectorAll(".ph-trash-fill");
	for (let i = 0; i < deleteI.length; i++) {
		deleteI[i].addEventListener("click", function () {
			deleteI[i].parentNode.remove();
			allTasks.splice(i, 1);
			localStorage.setItem("tasks", JSON.stringify(allTasks));
		});
	}
}

function checkItems() {
	const check = document.querySelectorAll(".checkbox");
	for (let i = check.length - 1; i >= 0; --i) {
		check[i].addEventListener("click", () => {
			check[i].parentNode.parentNode.style = "text-decoration: line-through; opacity: 50%;";
			check[i].style = "display:none";
			allTasks.splice(i, 1);
			localStorage.setItem("tasks", JSON.stringify(allTasks));
		});
	}
}

// function checkItems() {
// 	const check = document.querySelectorAll(".checkbox");
// 	for (let i = 0; i < check.length; i++) {
// 		check[i].addEventListener("click", () => {
// 			check[i].parentNode.parentNode.style = "text-decoration: line-through; opacity: 50%;";
// 			check[i].style = "display:none";
// 			allTasks.splice(i, 1);
// 			localStorage.setItem("tasks", JSON.stringify(allTasks));
// 		});
// 	}
// }

function clearAllVisibility() {
	if (allTasks.length >= 2) {
		clearAll.style.display = "block";
		clearAll.addEventListener("click", function () {
			localStorage.clear();
			allTasks = [];
			tasksContainer.innerHTML = "";
			clearAllVisibility();
		});
	} else {
		clearAll.style.display = "none";
	}
}
