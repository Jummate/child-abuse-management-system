const BASE_URL = "http://localhost/child-abuse-management-system/src";
const ADMIN_LOGIN_URL = `${BASE_URL}/frontend/admin-login.html`;
const HOME_URL = `${BASE_URL}/frontend/`;
const SAVE_CASE_URL = `${BASE_URL}/backend/api/save-case.php`;

const _ = (elem) => document.querySelector(elem);
const all = (elements) => document.querySelectorAll(elements);

let isEditIconClicked = false;
let idOfRecordToEdit = null;

_("#hamburger").addEventListener("click", () => {
  _("#menu-container").style.display = "flex";
});

_("#close-menu").addEventListener("click", () => {
  _("#menu-container").style.display = "none";
});

_("#add-perpetrator").addEventListener("click", () => {
  _("#modal").style.display = "flex";
  _(".modal-head-text").textContent = "Add Perpetrator";
  clearFields(".modal-field");
});

window.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("isLoggedIn")) {
    [...all(".sign-out")].forEach((elem) => (elem.style.display = "initial"));
    [...all(".sign-in")].forEach((elem) => (elem.style.display = "none"));
    [...all(".protected")].forEach((elem) => (elem.style.display = "initial"));
  } else {
    [...all(".sign-out")].forEach((elem) => (elem.style.display = "none"));
    [...all(".sign-in")].forEach((elem) => (elem.style.display = "initial"));
    [...all(".protected")].forEach((elem) => (elem.style.display = "none"));
  }
  if (sessionStorage.hasOwnProperty("perpetrator")) {
    populateTable(fetchPerpetratorInfo());
  }
});

_("#perpetratorTableBody").addEventListener("click", (event) => {
  let target = event.target;

  if (target.classList.contains("edit-info")) {
    isEditIconClicked = true;
    _("#modal").style.display = "flex";
    _(".modal-head-text").textContent = "Edit Perpetrator Info";
    idOfRecordToEdit = target.getAttribute("data-id");
    let recordToEdit = JSON.parse(sessionStorage.getItem("perpetrator")).find(
      (item) => Number(item.ID) === Number(idOfRecordToEdit)
    );

    _("#perpetrator-first-name").value = recordToEdit.name.split(" ")[0];
    _("#perpetrator-last-name").value = recordToEdit.name.split(" ")[1];
    _("#perpetrator-age").value = recordToEdit.age;
    _("#perpetrator-gender").value = recordToEdit.gender;
    _("#perpetrator-contact").value = recordToEdit.contact;
  } else if (target.classList.contains("delete-info")) {
    let idOfRecordToDelete = target.getAttribute("data-id");
    const filteredRecords = JSON.parse(
      sessionStorage.getItem("perpetrator")
    ).filter((item) => Number(item.ID) !== Number(idOfRecordToDelete));
    sessionStorage.setItem("perpetrator", JSON.stringify(filteredRecords));

    populateTable(fetchPerpetratorInfo());
  }
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

_(".modal-head .icon").addEventListener("click", () => {
  _("#modal").style.display = "none";
  _("body").style.overflow = "scroll";
});

const fetchPerpetratorInfo = () => {
  let data = sessionStorage.getItem("perpetrator");
  if (data && data.length > 0) {
    return JSON.parse(data);
  }
  return null;
};

const populateTable = (data) => {
  if (data) {
    _("#perpetratorTableBody").innerHTML = "";
    const bodyContent = createRows(data.reverse());
    _("#perpetratorTableBody").innerHTML = bodyContent.join("");
  }
};

const clearFields = (fields) => {
  all(fields).forEach((field) => (field.value = ""));
};

const createRows = (data) => {
  const rows = data.map((obj, index) => {
    return `<tr data-id=${obj.ID} class="table-row">
              <td>${index + 1}</td>
              <td>${obj.name}</td>
              <td>${obj.age}</td>
              <td>${obj.gender}</td>
              <td>${obj.contact}</td>
              <td><span class='fa fa-edit edit-info' data-id=${
                obj.ID
              }><span></td>
              <td><span class='fa fa-trash delete-info' data-id=${
                obj.ID
              }><span></td>
            </tr>`;
  });

  return rows;
};

const collectCaseInfo = () => {
  return {
    abuseType: _("#abuse-type").value,
    location: _("#location").value,
    eventDate: _("#event-date").value,
    otherInfo: _("#other-info").value,
    state: _("#state").value,
    city: _("#city").value,
  };
};

const collectEachInfo = (actor) => {
  let ID = Date.now();
  const info = {
    name:
      _(`#${actor}-first-name`).value + " " + _(`#${actor}-last-name`).value,
    age: Number(_(`#${actor}-age`).value),
    gender: _(`#${actor}-gender`).value,
    contact: _(`#${actor}-contact`).value,
  };

  return actor === "perpetrator" ? { ID, ...info } : info;
};

const collectGeneralCaseInfo = () => {
  let generatedID = crypto.randomUUID();
  generatedID = generatedID.split("-");
  generatedID = generatedID[0] + generatedID[1];

  return {
    caseID: generatedID,
    case: collectCaseInfo(),
    victim: collectEachInfo("victim"),
    perpetrator: fetchPerpetratorInfo(),
    reporter: collectEachInfo("reporter"),
  };
};

const saveEditedPerpetratorInfo = (recordID) => {
  let temp = JSON.parse(sessionStorage.getItem("perpetrator"));
  let perpetratorInfo = collectEachInfo("perpetrator");
  const tempArr = temp.findIndex(
    (item) => Number(item.ID) === Number(recordID)
  );

  perpetratorInfo = { ...perpetratorInfo, ID: recordID };

  //this ensures that the edited item retains its position on the table
  temp.splice(tempArr, 1, perpetratorInfo);

  // temp = temp.filter((item) => Number(item.ID) !== Number(recordID));
  // temp.push(perpetratorInfo);
  sessionStorage.setItem("perpetrator", JSON.stringify(temp));

  populateTable(fetchPerpetratorInfo());
  clearFields(".modal-field");
  _("#modal").style.display = "none";
  isEditIconClicked = false;
};

const savePerpetratorInfo = () => {
  let perpetratorInfo = collectEachInfo("perpetrator");
  if (!sessionStorage.hasOwnProperty("perpetrator")) {
    sessionStorage.setItem("perpetrator", JSON.stringify([perpetratorInfo]));
  } else {
    let temp = JSON.parse(sessionStorage.getItem("perpetrator"));
    temp.push(perpetratorInfo);
    sessionStorage.setItem("perpetrator", JSON.stringify(temp));
  }
  populateTable(fetchPerpetratorInfo());
  clearFields(".modal-field");
  _("#modal").style.display = "none";
};

_("#btn-save-perpetrator").addEventListener("click", () => {
  isEditIconClicked
    ? saveEditedPerpetratorInfo(idOfRecordToEdit)
    : savePerpetratorInfo();
});

const saveAllInfo = () => {
  const data = JSON.stringify(collectGeneralCaseInfo());

  fetch(SAVE_CASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        sessionStorage.removeItem("perpetrator");
        _("#success-msg").style.display = "block";
        _("#perpetratorTableBody").innerHTML = "";
        setTimeout(() => (_("#success-msg").style.display = "none"), 2000);
        clearFields(".reporting-field");
      } else if (data.status === "error") {
        throw new Error(data.message);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

_("#btn-submit-case").addEventListener("click", saveAllInfo);
