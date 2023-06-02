const _ = (elem) => document.querySelector(elem);

const all = (elements) => document.querySelectorAll(elements);

_("#hamburger").addEventListener("click", () => {
  _("#menu-container").style.display = "flex";
});

_("#close-menu").addEventListener("click", () => {
  _("#menu-container").style.display = "none";
});

_("#add-perpetrator").addEventListener("click", () => {
  _("#modal").style.display = "flex";

  // _("#modal").style.overflow = "hidden";
  // _("body").style.overflow = "hidden";
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
    data.forEach((item, index) => {
      _("#perpetratorTableBody").appendChild(createNewRow(item, index));
    });
  }
};

const clearFields = (fields) => {
  all(fields).forEach((field) => (field.value = ""));
};

const createNewRow = (obj, index) => {
  let newRow = document.createElement("tr");
  newRow.classList.add("table-row");
  newRow.setAttribute("data-id", obj.ID);
  newRow.innerHTML += `<td>${index + 1}</td>`;
  newRow.innerHTML += `<td>${obj.name}</td>`;
  newRow.innerHTML += `<td>${obj.age}</td>`;
  newRow.innerHTML += `<td>${obj.contact}</td>`;

  return newRow;
};

const collectCaseInfo = () => {
  return {
    abuseType: _("#abuse-type").value,
    location: _("#location").value,
    eventDate: _("#event-date").value,
    otherInfo: _("#other-info").value,
  };
};
const collectVictimInfo = () => {
  return {
    name: _("#victim-name").value,
    age: _("#victim-age").value,
    gender: _("#victim-gender").value,
    contact: _("#victim-contact").value,
  };
};

const collectReporterInfo = () => {
  return {
    name: _("#reporter-name").value,
    age: _("#reporter-age").value,
    gender: _("#reporter-gender").value,
    contact: _("#reporter-contact").value,
  };
};

const collectPerpertratorInfo = () => {
  return {
    ID: Date.now(),
    name: _("#perpetrator-name").value,
    age: _("#perpetrator-age").value,
    gender: _("#perpetrator-gender").value,
    contact: _("#perpetrator-contact").value,
  };
};

const collectGeneralCaseInfo = () => {
  return {
    ID: Date.now(),
    data: {
      case: collectCaseInfo(),
      victim: collectVictimInfo(),
      perpetrator: fetchPerpetratorInfo(),
      reporter: collectReporterInfo(),
    },
  };
};

const savePerpetratorInfo = () => {
  const perpetratorInfo = collectPerpertratorInfo();
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

_("#btn-save-perpetrator").addEventListener("click", savePerpetratorInfo);
_("#btn-submit-case").addEventListener("click", () => {
  console.log(collectGeneralCaseInfo());
  sessionStorage.removeItem("perpetrator");
  clearFields(".reporting-field");
});
