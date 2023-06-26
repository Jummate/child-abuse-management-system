const BASE_URL = "http://localhost/child-abuse-management-system/src";
const ADMIN_LOGIN_URL = `${BASE_URL}/frontend/admin-login.html`;
const UPDATE_CASE_URL = `${BASE_URL}/backend/api/update-case.php`;
const ALL_CASES_URL = `${BASE_URL}/backend/api/cases.php`;
const HOME_URL = `${BASE_URL}/frontend/`;
const _ = (elem) => document.querySelector(elem);
const all = (elements) => document.querySelectorAll(elements);
const CASE_STATUS = ["Unaddressed", "In Progress", "Addressed"];

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
    sessionStorage.removeItem("filteredItems");
    window.location.href = HOME_URL;
  }
});

window.addEventListener("DOMContentLoaded", () => {
  sessionStorage.removeItem("filteredItems");
  if (!sessionStorage.getItem("isLoggedIn")) {
    window.location.href = ADMIN_LOGIN_URL;
  }

  fetch(ALL_CASES_URL)
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
    { title: "Date", field: "event_date", width: 80 },
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
      editor: "list",
      editorParams: {
        values: CASE_STATUS,
      },
      width: 80,
      download: true,
      formatter: function (cell) {
        let value = cell.getValue();
        let elem = cell.getElement();
        switch (value) {
          case "Unaddressed":
            return (
              (elem.style.color = "red"),
              (elem.style.fontWeight = "bold"),
              (elem.style.textContent = value)
            );
          case "In Progress":
            return (
              (elem.style.color = "#9a710a"),
              (elem.style.fontWeight = "bold"),
              (elem.style.textContent = value)
            );
          default:
            return (
              (elem.style.color = "green"),
              (elem.style.fontWeight = "bold"),
              (elem.style.textContent = value)
            );
        }
      },
      cellEdited: function (cell) {
        const { case_id, case_status } = cell.getData();

        fetch(UPDATE_CASE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ case_id, case_status }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "success") {
              console.log(data.message);
            } else if (data.status === "failure") {
              throw new Error(data.message);
            }
          })
          .catch((error) => {
            console.error(error);
          });
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
      width: 40,
    },

    {
      title: "Gender",
      field: "perpetrator_gender",
      width: 60,
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
      width: 40,
    },

    {
      title: "Gender",
      field: "victim_gender",
      width: 60,
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
      width: 40,
    },

    {
      title: "Gender",
      field: "reporter_gender",
      width: 60,
    },

    {
      title: "Contact",
      field: "reporter_contact",
      width: 150,
    },
  ],
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
    //prevent duplicate entries
    itemToAdd = Object.values(temp).find(
      (content) =>
        content.field === item.field &&
        content.type === item.type &&
        content.value === item.value
    );

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
  if (Object.keys(temp).length > 0) {
    sessionStorage.setItem("filteredItems", JSON.stringify(temp));
  } else {
    sessionStorage.removeItem("filteredItems");
    removeMultipleChecked("input[type=checkbox]");
  }
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

const removeSingleChecked = (elem) => {
  _(elem).checked = false;
};
const removeMultipleChecked = (elems) => {
  all(elems).forEach((elem) => (elem.checked = false));
};

const getItemCountByCriteria = (arr, criterion) => {
  return arr.reduce((acc, item) => {
    if (acc.hasOwnProperty(item[`${criterion}`])) {
      acc[item[`${criterion}`]]++;
    } else {
      acc[item[`${criterion}`]] = 1;
    }
    return acc;
  }, {});
};

const getGroupedItems = (arr, criterion) => {
  const sortedData = getItemCountByCriteria(arr, criterion);
  return [Object.keys(sortedData), Object.values(sortedData)];
};

const getGroupedActorsByGender = (data) => {
  const perpetrator = getItemCountByCriteria(data, "perpetrator_gender");
  const victim = getItemCountByCriteria(data, "victim_gender");
  const reporter = getItemCountByCriteria(data, "reporter_gender");

  return [
    [victim.Male, perpetrator.Male, reporter.Male],
    [victim.Female, perpetrator.Female, reporter.Female],
  ];
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
    // removeSingleChecked(`#filter-abuse-type input#${ID}`);
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

_("#btn-clear-filter").addEventListener("click", () => {
  table.clearFilter();
  _("#filtered-item-container").innerHTML = "";
  removeMultipleChecked("input[type=checkbox]");
  sessionStorage.removeItem("filteredItems");
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

// The chart that displays the distribution of actors by gender
const genderChartOptions = {
  series: [],
  chart: {
    type: "bar",
    height: 350,
    // width: 300,
    stacked: false,
  },
  title: {
    text: "Gender distribution of actors",
    style: {
      fontSize: "12px",
    },
  },

  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "70%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    position: "top",
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: ["Victim", "Perpetrator", "Reporter"],
  },

  fill: {
    opacity: 1,
  },
};

const actorGenderChart = new ApexCharts(
  document.querySelector("#chart-actor-gender"),
  genderChartOptions
);
actorGenderChart.render();

//The chart that displays the distribution of Abuse Type
const abuseChartOptions = {
  series: [],
  chart: {
    // width: 380,
    type: "pie",
  },
  title: {
    text: "Abuse Type",
    style: {
      fontSize: "12px",
    },
  },
  legend: {
    position: "bottom",
  },

  labels: [],
  // responsive: [
  //   {
  //     breakpoint: 480,
  //     options: {
  //       chart: {
  //         width: 380,
  //       },
  //       legend: {
  //         position: "bottom",
  //       },
  //     },
  //   },
  //   {
  //     breakpoint: 320,
  //     options: {
  //       chart: {
  //         width: 300,
  //       },
  //       legend: {
  //         position: "bottom",
  //       },
  //     },
  //   },
  // ],
};

const abuseTypeChart = new ApexCharts(
  document.querySelector("#chart-abuse-type"),
  abuseChartOptions
);
abuseTypeChart.render();

//The chart that displays the distribution of Case Status
const caseChartOptions = {
  series: [],
  chart: {
    // width: 380,
    type: "pie",
  },

  title: {
    text: "Case Status",
    style: {
      fontSize: "12px",
    },
  },
  legend: {
    position: "bottom",
  },
  labels: [],
  responsive: [
    // {
    //   breakpoint: 480,
    //   options: {
    //     chart: {
    //       width: 380,
    //     },
    //     legend: {
    //       position: "bottom",
    //     },
    //   },
    // },
    // {
    //   breakpoint: 280,
    //   options: {
    //     chart: {
    //       width: 280,
    //     },
    //     legend: {
    //       position: "bottom",
    //     },
    //   },
    // },
  ],
};

const caseStatusChart = new ApexCharts(
  document.querySelector("#chart-case-status"),
  caseChartOptions
);
caseStatusChart.render();

table.on("dataProcessed", function (data) {
  if (data.length > 0) {
    const [male, female] = getGroupedActorsByGender(data);
    const [abuseTypeKeys, abuseTypeValues] = getGroupedItems(
      data,
      "abuse_type"
    );
    const [caseStatusKeys, caseStatusValues] = getGroupedItems(
      data,
      "case_status"
    );

    actorGenderChart.updateSeries([
      {
        name: "Male",
        data: male,
      },
      {
        name: "Female",
        data: female,
      },
    ]);

    abuseTypeChart.updateOptions({
      series: abuseTypeValues,
      labels: abuseTypeKeys,
    });

    caseStatusChart.updateOptions({
      series: caseStatusValues,
      labels: caseStatusKeys,
    });
  }
});
