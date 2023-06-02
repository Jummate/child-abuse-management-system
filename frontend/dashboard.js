const _ = (elem) => document.querySelector(elem);

const all = (elements) => document.querySelectorAll(elements);

// _("#login").addEventListener("click", (e) => {
//   e.preventDefault();
//   // _("#reporting-container").style.display = "none";
//   _("#dashboard").style.display = "flex";
// });

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

//define some sample data
var tabledata = [
  { id: 1, name: "Oli Bob", age: "12", col: "red", dob: "01/08/1980" },
  { id: 2, name: "Mary May", age: "1", col: "blue", dob: "14/05/1982" },
  {
    id: 3,
    name: "Christine Lobowski",
    age: "42",
    col: "green",
    dob: "22/05/1982",
  },
  {
    id: 4,
    name: "Brendon Philips",
    age: "125",
    col: "orange",
    dob: "01/08/1980",
  },
  {
    id: 5,
    name: "Margret Marmajuke",
    age: "16",
    col: "yellow",
    dob: "31/01/1999",
  },
  {
    id: 6,
    name: "Margret Marmajuke",
    age: "16",
    col: "yellow",
    dob: "31/01/1999",
  },
];

//create Tabulator on DOM element with id "example-table"
const table = new Tabulator("#table-container", {
  height: 205,
  // minHeight: 500, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
  // data: tabledata, //assign data to table
  data: tabledata,
  layout: "fitColumns", //fit columns to width of table (optional)
  pagination: true,
  // paginationSize: 3,
  resizableRows: true,
  columns: [
    //Define Table Columns
    { title: "Name", field: "name", width: 150, editor: "input" },
    {
      title: "Age",
      field: "age",
      hozAlign: "left",
      editor: "input",
      // frozen: true,
      // formatter: "progress",
    },
    { title: "Favourite Color", field: "col", editor: "input" },
    {
      title: "Date Of Birth",
      field: "dob",
      sorter: "date",
      hozAlign: "center",
      editor: "input",
      // frozen: true,
    },
  ],
});

_("#export").addEventListener("change", () => {
  console.log(_("#export").value);
  switch (_("#export").value) {
    case "csv":
      table.download("csv", "data.csv");
      break;
    case "pdf":
      table.downloadToTab("pdf");
      break;
  }
});

table.on("dataLoaded", function (data) {
  if (sessionStorage.hasOwnProperty("loadOnce")) {
    _("#dashboard").style.display = "flex";
  } else {
    sessionStorage.setItem("loadOnce", true);
    _("#dashboard").style.display = "none";
  }
});

//trigger an alert message when the row is clicked
//   table.on("rowClick", function (e, row) {
//     alert("Row " + row.getData().id + " Clicked!!!!");
//   });
