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
  //   if (target.classList.contains("btn-admin-login")) {
  //     _("#admin-login").style.display = "block";
  //     _("#reporting").style.display = "none";
  //     _("body").style.overflow = "hidden";
  //   }

  //   if (target.classList.contains("link")) {
  //     _("#menu-container").style.display = "none";
  //   }
  switch (true) {
    case target.classList.contains("btn-admin-login"):
      _("#admin-login").style.display = "flex";
      _("#reporting").style.display = "none";
      _("body").style.overflow = "hidden";
      break;
    case target.classList.contains("link"):
      _("#menu-container").style.display = "none";
      break;
    // default:
    // _("body").style.overflow = "scroll";
  }
});

_("#btn-report-case").addEventListener("click", () => {
  _("#reporting").style.display = "flex";
  _("#admin-login").style.display = "none";
  // _("body").style.overflow = "hidden";
});

_("#add-perpetrator").addEventListener("click", () => {
  _("#modal").style.display = "flex";

  // _("#modal").style.overflow = "hidden";
  _("body").style.overflow = "hidden";
});

_(".modal-head .icon").addEventListener("click", () => {
  _("#modal").style.display = "none";
  _("body").style.overflow = "scroll";
});
