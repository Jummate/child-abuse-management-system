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
      // _("body").style.overflow = "hidden";
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

const collectPerpertratorInfo = () => {
  return {
    ID: Date.now(),
    name: _("#perpetrator-name").value,
    age: _("#perpetrator-age").value,
    gender: _("#perpetrator-gender").value,
    contact: _("#perpetrator-contact").value,
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
  clearModal();
  _("#modal").style.display = "none";
};

_("#btn-save-perpetrator").addEventListener("click", savePerpetratorInfo);

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

const clearModal = () => {
  all(".modal-field").forEach((field) => (field.value = ""));
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

_("#btn-submit-case").addEventListener("click", () => {
  sessionStorage.removeItem("perpetrator");
});
