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

// window.addEventListener("click", (event) => {
//   let target = event.target;
//   //   if (target.classList.contains("btn-admin-login")) {
//   //     _("#admin-login").style.display = "block";
//   //     _("#reporting").style.display = "none";
//   //     _("body").style.overflow = "hidden";
//   //   }

//   //   if (target.classList.contains("link")) {
//   //     _("#menu-container").style.display = "none";
//   //   }
//   switch (true) {
//     case target.classList.contains("btn-admin-login"):
//       _("#admin-login").style.display = "flex";
//       _("#reporting").style.display = "none";
//       // _("body").style.overflow = "hidden";
//       break;
//     case target.classList.contains("link"):
//       _("#menu-container").style.display = "none";
//       break;
//     // default:
//     // _("body").style.overflow = "scroll";
//   }
// });

// _("#btn-report-case").addEventListener("click", () => {
//   _("#reporting").style.display = "flex";
//   _("#admin-login").style.display = "none";
//   // _("body").style.overflow = "hidden";
// });
