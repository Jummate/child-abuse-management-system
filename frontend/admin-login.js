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

const testUrl = (event) => {
  event.preventDefault();
  if (true) {
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
        } else {
          sessionStorage.removeItem("isLoggedIn");
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

_("#login").addEventListener("click", testUrl);
