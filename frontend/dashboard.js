const BASE_URL = "http://localhost/child-abuse-management-system/src";
const ADMIN_LOGIN_URL = `${BASE_URL}/frontend/admin-login.html`;
const HOME_URL = `${BASE_URL}/frontend/`;
const _ = (elem) => document.querySelector(elem);
const all = (elements) => document.querySelectorAll(elements);

[...all(".sign-out")].forEach((elem) => (elem.style.display = "initial"));

_("#hamburger").addEventListener("click", () => {
  _("#menu-container").style.display = "flex";
});

_("#close-menu").addEventListener("click", () => {
  _("#menu-container").style.display = "none";
});

window.addEventListener("click", (event) => {
  let target = event.target;
  if (target.classList.contains("btn-sign-out")) {
    event.preventDefault();
    sessionStorage.removeItem("isLoggedIn");
    window.location.href = HOME_URL;
  }
});

window.addEventListener("DOMContentLoaded", () => {
  if (!sessionStorage.getItem("isLoggedIn")) {
    window.location.href = ADMIN_LOGIN_URL;
  }

  const url =
    "http://localhost/child-abuse-management-system/src/backend/api/read-case.php";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        table.setData(data.data.reverse());
      } else {
        throw new Error(data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

//create Tabulator on DOM element with id "example-table"
const table = new Tabulator("#table-container", {
  height: 205,
  // minHeight: 500, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)

  layout: "fitColumns", //fit columns to width of table (optional)
  pagination: true,
  // paginationSize: 3,
  // resizableRows: true,
  columns: [
    //Define Table Columns

    {
      title: "Abuse Type",
      field: "abuse_type",
      width: 80,
    },
    {
      title: "State",
      field: "state",
      width: 80,
    },
    {
      title: "City",
      field: "city",
      width: 80,
    },
    {
      title: "Location",
      field: "location",
      hozAlign: "left",
      width: 150,
    },
    { title: "Date", field: "event_date", editor: "input", width: 80 },
    {
      title: "Relevant Info",
      field: "other_info",
      // sorter: "date",
      // hozAlign: "center",
      width: 150,
    },

    {
      title: "Status",
      field: "case_status",
      // sorter: "date",
      hozAlign: "center",
      editor: "input",
      width: 80,
      download: true,
      formatter: function (cell) {
        let value = cell.getValue();
        let elem = cell.getElement();
        if (value === "Unaddressed") {
          return (elem.style.color = "red"), (elem.style.textContent = value);
          // return (
          //   "<span style='color:#3FB449; font-weight:bold;'>" +
          //   value +
          //   "</span>"
          // );
        } else {
          return value;
        }
      },
    },
    {
      title: "Perpetrator",
      field: "perpetrator_name",
      width: 150,
    },

    {
      title: "Age",
      field: "perpetrator_age",
      width: 150,
    },

    {
      title: "Gender",
      field: "perpetrator_gender",
      width: 80,
    },

    {
      title: "Contact",
      field: "perpetrator_contact",
      width: 150,
    },

    {
      title: "Victim",
      field: "victim_name",
      width: 150,
    },

    {
      title: "Age",
      field: "victim_age",
      width: 80,
    },

    {
      title: "Gender",
      field: "victim_gender",
      width: 80,
    },

    {
      title: "Contact",
      field: "victim_contact",
      width: 150,
    },

    {
      title: "Reporter",
      field: "reporter_name",
      width: 150,
    },

    {
      title: "Age",
      field: "reporter_age",
      width: 80,
    },

    {
      title: "Gender",
      field: "reporter_gender",
      width: 80,
    },

    {
      title: "Contact",
      field: "reporter_contact",
      width: 150,
    },
  ],
});

table.on("cellEdited", function (cell) {
  // console.log(cell.getData());
});

_("#filter-select").addEventListener("change", () => {
  switch (_("#filter-select").value) {
    case "Abuse Type":
      _("#filter-abuse-type").style.display = "block";
      _("#filter-state").style.display = "none";
      _("#filter-gender").style.display = "none";
      _("#filter-city").style.display = "none";
      _("#filter-age").style.display = "none";
      _("#filter-location").style.display = "none";
      _("#filter-status").style.display = "none";
      _("#filter-date").style.display = "none";
      break;
    case "Location":
      _("#filter-abuse-type").style.display = "none";
      _("#filter-state").style.display = "none";
      _("#filter-gender").style.display = "none";
      _("#filter-city").style.display = "none";
      _("#filter-age").style.display = "none";
      _("#filter-location").style.display = "block";
      _("#filter-status").style.display = "none";
      _("#filter-date").style.display = "none";
      break;
    case "State":
      _("#filter-abuse-type").style.display = "none";
      _("#filter-state").style.display = "block";
      _("#filter-gender").style.display = "none";
      _("#filter-city").style.display = "none";
      _("#filter-age").style.display = "none";
      _("#filter-location").style.display = "none";
      _("#filter-status").style.display = "none";
      _("#filter-date").style.display = "none";
      break;
    case "City":
      _("#filter-abuse-type").style.display = "none";
      _("#filter-state").style.display = "none";
      _("#filter-gender").style.display = "none";
      _("#filter-city").style.display = "block";
      _("#filter-age").style.display = "none";
      _("#filter-location").style.display = "none";
      _("#filter-status").style.display = "none";
      _("#filter-date").style.display = "none";
      break;
    case "Gender":
      _("#filter-abuse-type").style.display = "none";
      _("#filter-state").style.display = "none";
      _("#filter-gender").style.display = "block";
      _("#filter-city").style.display = "none";
      _("#filter-age").style.display = "none";
      _("#filter-location").style.display = "none";
      _("#filter-status").style.display = "none";
      _("#filter-date").style.display = "none";
      break;

    case "Status":
      _("#filter-abuse-type").style.display = "none";
      _("#filter-state").style.display = "none";
      _("#filter-gender").style.display = "none";
      _("#filter-city").style.display = "none";
      _("#filter-age").style.display = "none";
      _("#filter-location").style.display = "none";
      _("#filter-status").style.display = "block";
      _("#filter-date").style.display = "none";
      break;

    case "Age":
      _("#filter-abuse-type").style.display = "none";
      _("#filter-state").style.display = "none";
      _("#filter-gender").style.display = "none";
      _("#filter-city").style.display = "none";
      _("#filter-age").style.display = "none";
      _("#filter-location").style.display = "none";
      _("#filter-status").style.display = "block";
      _("#filter-date").style.display = "none";
      break;
    default:
      _("#filter-abuse-type").style.display = "none";
      _("#filter-state").style.display = "none";
      _("#filter-gender").style.display = "none";
      _("#filter-city").style.display = "none";
      _("#filter-age").style.display = "none";
      _("#filter-location").style.display = "none";
      _("#filter-status").style.display = "none";
      _("#filter-date").style.display = "block";
  }
});

_("#filter").addEventListener("click", () => {
  _("#filter-container").style.display = "flex";
});

_("#filter-close").addEventListener(
  "click",
  () => (_("#filter-container").style.display = "none")
);

const createFilterTag = (field, fieldAlias, typeAlias, value, ID) => {
  let anyVariable = field.split("_")[0];
  return `<div class='filtered-item' id=${anyVariable}-${ID}>
              <span>${fieldAlias}${typeAlias}${value}</span>
              <span class="fa fa-times" data-custom-id=${ID}></span>
          </div>`;
};

const addFilter = ({ ID, field, type, value, fieldAlias, typeAlias }) => {
  let item = { field, type, value };
  let itemToAdd = null;

  if (!sessionStorage.hasOwnProperty("filteredItems")) {
    sessionStorage.setItem(
      "filteredItems",
      JSON.stringify({ [`${ID}`]: item })
    );
    _("#filtered-item-container").innerHTML += createFilterTag(
      field,
      fieldAlias,
      typeAlias,
      value,
      ID
    );
    table.addFilter(field, type, value);
  } else {
    let temp = JSON.parse(sessionStorage.getItem("filteredItems"));
    itemToAdd = Object.values(temp).find(
      (content) =>
        content.field === item.field &&
        content.type === item.type &&
        content.value === item.value
    );
    //prevent duplicate entries
    if (!itemToAdd) {
      temp = { ...temp, [`${ID}`]: item };
      sessionStorage.setItem("filteredItems", JSON.stringify(temp));
      _("#filtered-item-container").innerHTML += createFilterTag(
        field,
        fieldAlias,
        typeAlias,
        value,
        ID
      );
      table.addFilter(field, type, value);
    }
  }
};

const removeFilter = (ID) => {
  let temp = JSON.parse(sessionStorage.getItem("filteredItems"));
  const { field, type, value } = temp[`${ID}`];
  delete temp[`${ID}`];
  sessionStorage.setItem("filteredItems", JSON.stringify(temp));
  table.removeFilter(field, type, value);
  return { field, type, value };
};

_("#filter-abuse-type").addEventListener("click", (e) => {
  let target = e.target;
  let ID = target.getAttribute("data-custom-id");
  let arg = {
    ID,
    field: "abuse_type",
    type: "=",
    value: target.value,
    fieldAlias: "Abuse Type",
    typeAlias: ":",
  };
  if (target.checked) {
    addFilter(arg);
  } else {
    const { field } = removeFilter(ID);
    let anyVariable = field.split("_")[0];
    _(`#filtered-item-container #${anyVariable}-${ID}`).remove();
  }
});

_("#filter-gender").addEventListener("click", (e) => {
  let target = e.target;
  let actorClass = target.getAttribute("data-actor-class");
  let actorID = target.getAttribute("data-custom-id");
  let ID = `${actorID}_${actorClass}`;
  let arg = {
    ID,
    field: `${actorClass}_gender`,
    type: "=",
    value: target.value,
    fieldAlias: `Gender(${actorClass})`,
    typeAlias: ":",
  };
  if (target.checked) {
    addFilter(arg);
  } else {
    const { field } = removeFilter(ID);
    let anyVariable = field.split("_")[0];
    _(`#filtered-item-container #${anyVariable}-${ID}`).remove();
  }
});

const removeChecked = (elem) => {
  _(elem).checked = false;
};

_("#filter-age").addEventListener("click", (e) => {
  let target = e.target;

  if (target.nodeName === "BUTTON") {
    let actorClass = target.getAttribute("data-actor-class");
    const operators = { gteq: ">=", eq: "=", lteq: "<=", lt: "<", gt: ">" };
    let value = Number(_(`#filter-age-input-${actorClass}`).value);
    let type = _(`#filter-age-operator-${actorClass}`).value;
    let arg = {
      ID: `${actorClass}_age`,
      field: `${actorClass}_age`,
      type: operators[type],
      value,
      fieldAlias: `Age(${actorClass})`,
      typeAlias: ` ${operators[type]} `,
    };
    addFilter(arg);
  }
});

_("#filter-status").addEventListener("click", (e) => {
  let target = e.target;
  let ID = target.getAttribute("data-custom-id");
  let arg = {
    ID,
    field: "abuse_type",
    type: "=",
    value: target.value,
    fieldAlias: "Abuse Type",
    typeAlias: ":",
  };
  if (target.checked) {
    addFilter(arg);
  } else {
    const { field } = removeFilter(ID);
    let anyVariable = field.split("_")[0];
    _(`#filtered-item-container #${anyVariable}-${ID}`).remove();
  }
});

_("#filtered-item-container").addEventListener("click", (e) => {
  let target = e.target;
  if (target.classList.contains("fa-times")) {
    let ID = target.getAttribute("data-custom-id");
    removeFilter(ID);
    target.parentElement.remove();
    // removeChecked(`#filter-abuse-type input#${ID}`);
  }
});

_("#add-filter-state").addEventListener("click", () => {
  let value = _("#filter-state-input").value;
  let ID = _("#filter-state-input").getAttribute("data-custom-id");
  let arg = {
    ID,
    field: "state",
    type: "like",
    value,
    fieldAlias: "State",
    typeAlias: " has ",
  };
  addFilter(arg);
});

_("#add-filter-city").addEventListener("click", () => {
  let value = _("#filter-city-input").value;
  let ID = _("#filter-city-input").getAttribute("data-custom-id");
  let arg = {
    ID,
    field: "city",
    type: "like",
    value,
    fieldAlias: "City",
    typeAlias: " has ",
  };
  addFilter(arg);
});

_("#add-filter-location").addEventListener("click", () => {
  let value = _("#filter-location-input").value;
  let ID = _("#filter-location-input").getAttribute("data-custom-id");
  let arg = {
    ID,
    field: "location",
    type: "like",
    value,
    fieldAlias: "Location",
    typeAlias: " has ",
  };
  addFilter(arg);
});

_("#add-filter-date").addEventListener("click", () => {
  let value = _("#filter-date-input").value;
  const operators = { gteq: ">=", eq: "=", lteq: "<=", lt: "<", gt: ">" };

  let type = _(`#filter-date-operator`).value;

  let arg = {
    ID: "date",
    field: "event_date",
    type: operators[type],
    value,
    fieldAlias: "Date",
    typeAlias: ` ${operators[type]} `,
  };
  addFilter(arg);
});

_("#export").addEventListener("change", () => {
  if (sessionStorage.getItem("isLoggedIn")) {
    switch (_("#export").value) {
      case "csv":
        table.download("csv", "data.csv");
        break;
      case "pdf":
        table.downloadToTab("pdf");
        break;
    }
  } else {
    window.location.href = ADMIN_LOGIN_URL;
  }
});

var options = {
  chart: {
    type: "line",
  },
  series: [
    {
      name: "sales",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ],
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  },

  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 380,
        },
        legend: {
          position: "bottom",
        },
      },
    },
    {
      breakpoint: 320,
      options: {
        chart: {
          width: 300,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};
var option2 = {
  series: [44, 55, 13, 43, 22],
  chart: {
    width: 380,
    type: "pie",
  },
  labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 380,
        },
        legend: {
          position: "bottom",
        },
      },
    },
    {
      breakpoint: 320,
      options: {
        chart: {
          width: 300,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

var chart1 = new ApexCharts(document.querySelector("#mChart"), options);

chart1.render();

var chart2 = new ApexCharts(document.querySelector("#yChart"), option2);

chart2.render();

// table.on("dataLoaded", function (data) {
//   if (sessionStorage.hasOwnProperty("loadOnce")) {
//     _("#dashboard").style.display = "flex";
//   } else {
//     sessionStorage.setItem("loadOnce", true);
//     _("#dashboard").style.display = "none";
//   }
// });

//trigger an alert message when the row is clicked
//   table.on("rowClick", function (e, row) {
//     alert("Row " + row.getData().id + " Clicked!!!!");
//   });
