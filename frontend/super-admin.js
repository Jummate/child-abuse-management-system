const BASE_URL = "http://localhost/child-abuse-management-system";
const ADMIN_LOGIN_URL = `${BASE_URL}/frontend/admin-login.html`;
const HOME_URL = BASE_URL;
const SAVE_ADMIN_URL = `${BASE_URL}/backend/api/save-admin.php`;
const DELETE_ADMIN_URL = `${BASE_URL}/backend/api/delete-admin.php`;

const _ = (elem) => document.querySelector(elem);
const all = (elements) => document.querySelectorAll(elements);

const addAdminBtn = document.querySelector("[data-open-modal]");
const closeModalBtn = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");

window.addEventListener("DOMContentLoaded", () => {
  if (!sessionStorage.getItem("isLoggedIn")) {
    window.location.href = ADMIN_LOGIN_URL;
  }

  getAdmins();
});

window.addEventListener("click", (event) => {
  // event.preventDefault();
  let target = event.target;
  if (target.classList.contains("btn-sign-out")) {
    sessionStorage.removeItem("isLoggedIn");
    [...all(".sign-out")].forEach((elem) => (elem.style.display = "none"));
    [...all(".sign-in")].forEach((elem) => (elem.style.display = "initial"));
    [...all(".protected")].forEach((elem) => (elem.style.display = "none"));
    window.location.href = HOME_URL;
  }
});

const collectAdminInfo = () => {
  return {
    ID: Date.now(),
    username: _("#admin-username").value,
    password: _("#admin-password").value,
    role: _("#admin-role").value,
  };
};

const validateSingleField = (field) => {
  if (!field.value) {
    field.style.border = "2px solid red";
    _(".error").style.display = "block";
    return false;
  }
  field.style.border = "none";
  _(".error").style.display = "none";
  return true;
};

const validateFields = (fields) => {
  return Array.from(all(fields)).every((field) => validateSingleField(field));
};

const saveAdminInfo = () => {
  const data = JSON.stringify(collectAdminInfo());

  fetch(SAVE_ADMIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        clearFields(".admin-field");
        modal.close();
        getAdmins();
      } else if (data.status === "error") {
        throw new Error(data.message);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

_("#btn-save-admin").addEventListener("click", () => {
  if (validateFields(".admin-field")) {
    try {
      saveAdminInfo();
    } catch (error) {
      console.log(error);
    }
  }
});

_("#adminTableBody").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-info")) {
    let idOfRecordToDelete = e.target.getAttribute("data-id");
    const data = JSON.stringify({ ID: idOfRecordToDelete });

    fetch(DELETE_ADMIN_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          console.log(data.message);
          getAdmins();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

const clearFields = (fields) => {
  all(fields).forEach((field) => (field.value = ""));
};

const populateTable = (data) => {
  if (data) {
    _("#adminTableBody").innerHTML = "";
    const bodyContent = createRows(data.reverse());
    _("#adminTableBody").innerHTML = bodyContent.join("");
  }
};

addAdminBtn.addEventListener("click", () => {
  modal.showModal();
  clearFields(".admin-field");
});

closeModalBtn.addEventListener("click", () => modal.close());

const createRows = (data) => {
  const rows = data.map((obj, index) => {
    return `<tr data-id=${obj.id} class="table-row">
                <td>${index + 1}</td>
                <td>${obj.username}</td>
                <td><span class='fa fa-trash delete-info' data-id=${
                  obj.id
                }><span></td>
              </tr>`;
  });

  return rows;
};

const getAdmins = () => {
  const url = `${BASE_URL}/backend/api/admins.php`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        populateTable(data.data.reverse());
      } else {
        throw new Error(data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
