const _ = (elem) => document.querySelector(elem);

const all = (elements) => document.querySelectorAll(elements);

_("#hamburger").addEventListener("click", () => {
  _("#menu-container").style.display = "flex";
});

_("#close-menu").addEventListener("click", () => {
  _("#menu-container").style.display = "none";
});

window.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("isLoggedIn")) {
    [...all(".sign-out")].forEach((elem) => (elem.style.display = "initial"));
    [...all(".sign-in")].forEach((elem) => (elem.style.display = "none"));
    [...all(".protected")].forEach((elem) => (elem.style.display = "initial"));
  }
});

window.addEventListener("click", (event) => {
  let target = event.target;
  if (target.classList.contains("btn-sign-out")) {
    sessionStorage.removeItem("isLoggedIn");
    [...all(".sign-out")].forEach((elem) => (elem.style.display = "none"));
    [...all(".sign-in")].forEach((elem) => (elem.style.display = "initial"));
    [...all(".protected")].forEach((elem) => (elem.style.display = "none"));
  }
});
