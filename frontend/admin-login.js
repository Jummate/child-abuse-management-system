const BASE_URL = "http://localhost/child-abuse-management-system/src";
const _ = (elem) => document.querySelector(elem);
const all = (elements) => document.querySelectorAll(elements);
const DASHBOARD_URL = `${BASE_URL}/frontend/dashboard.html`;
const LOGIN_URL = `${BASE_URL}/backend/auth/login.php`;

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
          window.location.href = DASHBOARD_URL;
        } else {
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // .then((response) => {
    //   if (!response.ok) {
    //     throw new Error(response.code);
    //   }
    //   return response.json();
    // })
    // .then((data) => console.log(data))
    // .catch((error) => {
    //   console.error(error);
    //   document.getElementById("error").innerHTML = error.message;
    // });
  }
};

_("#login").addEventListener("click", testUrl);
