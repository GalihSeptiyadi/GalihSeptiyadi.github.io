const toggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const main = document.querySelector(".main");

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("hide");
    main.classList.toggle("full");
});
