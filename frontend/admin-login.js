const BASE_URL = "http://localhost/child-abuse-management-system/src";
const DASHBOARD_URL = `${BASE_URL}/frontend/dashboard.html`;
const LOGIN_URL = `${BASE_URL}/backend/auth/login.php`;

const _ = (elem) => document.querySelector(elem);
const all = (elements) => document.querySelectorAll(elements);

_("#hamburger").addEventListener("click", () => {
  _("#menu-container").style.display = "flex";
});

_("#close-menu").addEventListener("click", () => {
  _("#menu-container").style.display = "none";
});

const validateSingleField = (field) => {
  if (!field.value) {
    field.style.border = "2px solid red";
    _(".error").style.display = "initial";
    return false;
  }
  field.style.border = "none";
  _(".error").style.display = "none";
  return true;
};

const validateFields = (fields) => {
  return Array.from(all(fields)).every((field) => validateSingleField(field));
  // let isNotEmpty = true;
  // for (let field of Array.from(all(fields))) {
  //   if (!validateSingleField(field)) {
  //     isNotEmpty = false;
  //     break;
  //   }
  // }
  // return isNotEmpty;
};

const logAdminIn = () => {
  const data = JSON.stringify({
    username: _("#username").value,
    password: _("#password").value,
  });

  fetch(LOGIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        sessionStorage.setItem("isLoggedIn", true);
        window.location.href = document.referrer.includes("case-report")
          ? document.referrer
          : DASHBOARD_URL;
      } else if (data.status === "error") {
        _(".error").style.display = "initial";
        _(".error").textContent = `Access denied! ${data.message}`;
        sessionStorage.removeItem("isLoggedIn");
        throw new Error(data.message);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

_("#login").addEventListener("click", () => {
  if (validateFields(".login-input")) {
    logAdminIn();
  }
});
