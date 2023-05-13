const _ = (elem) => document.querySelector(elem);

_("#hamburger").addEventListener("click", () => {
  _("#menu__container").style.display = "flex";
});

_("#close-menu").addEventListener("click", () => {
  _("#menu__container").style.display = "none";
});

window.addEventListener("DOMContentLoaded", () => {});
