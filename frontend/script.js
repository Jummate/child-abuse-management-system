const _ = (elem) => document.querySelector(elem);

const all = (elements) => document.querySelectorAll(elements);

_("#hamburger").addEventListener("click", () => {
  _("#menu-container").style.display = "flex";
});

_("#close-menu").addEventListener("click", () => {
  _("#menu-container").style.display = "none";
});

window.addEventListener("click", (event) => {
  let target = event.target;
  if (target.classList.contains("btn-admin-login")) {
    _("#admin-login").style.display = "block";
    _("#reporting").style.display = "none";
    _("body").style.overflow = "hidden";
  }

  if (target.classList.contains("link")) {
    _("#menu-container").style.display = "none";
  }
});

_("#btn-report-case").addEventListener("click", () => {
  _("#reporting").style.display = "block";
  _("#admin-login").style.display = "none";
  _("body").style.overflow = "hidden";
});
