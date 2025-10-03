const body = document.body;
const switchBtn = document.getElementById("darkModeToggle");


if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  switchBtn.checked = true; 
  console.log("Dark mode is enabled");
}

switchBtn.addEventListener("change", () => {
  if (switchBtn.checked) {
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
    console.log("Dark mode is enabled");
  } else {
    body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
    console.log("Light mode is enabled");
  }
});