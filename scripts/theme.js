const themeLabels = document.querySelector(".switchTheme");
const nightButton = document.querySelector(".iconNight");
const dayButton = document.querySelector(".iconDay");
const caption = document.querySelectorAll("figcaption");

const userTheme =
	localStorage.getItem("data-theme") ||
	(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

function switchTheme(activeButton, inactiveButton, mode) {
	document.documentElement.setAttribute("data-theme", mode);
	activeButton.disabled = true;
	inactiveButton.disabled = false;
	localStorage.setItem("data-theme", mode);
}

function showThemeLabels(icon) {
	icon.addEventListener("mouseover", function () {
		for (i = 0; i < caption.length; i++) {
			caption[i].style.cssText = "display:block;";
		}
	});

	icon.addEventListener("mouseout", function () {
		for (i = 0; i < caption.length; i++) {
			caption[i].style.display = "none";
		}
	});
}

// Buttons

nightButton.addEventListener("click", function () {
	switchTheme(nightButton, dayButton, "dark");
});

dayButton.addEventListener("click", function () {
	switchTheme(dayButton, nightButton, "light");
});

// On Page Load

userTheme === "dark"
	? switchTheme(nightButton, dayButton, "dark")
	: switchTheme(dayButton, nightButton, "light");

showThemeLabels(themeLabels);
