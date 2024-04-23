import { userData } from "./data.js";

const tableHeadElement = document.getElementById("table-head"); // calling head elem by id
const tableBodyElement = document.getElementById("table-body"); // calling body  elem by id

const previousBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");
const pageNoText = document.getElementById("page-no");

let currentPage = 1;
let dataLimit = 20;
let filteredData = [];
const URL = "https://jsonplaceholder.typicode.com/photos";

function getPaginatedData(data) {
  const startIndex = (currentPage - 1) * dataLimit;
  const endIndex = Math.min(dataLimit + startIndex, data.length);
  return data.slice(startIndex, endIndex);
}

function handleSearchInput(inputKey) {
  const searchInputValue = document.getElementById(`${inputKey}-search-input`).value;
  console.log(searchInputValue);

  const filterData = userData.filter((rowData) =>
    String(rowData[inputKey])
      .toLowerCase()
      .includes(String(searchInputValue.toLowerCase()))
  );
  //   console.log(filterData);
  filteredData = filterData;
  currentPage = 1;
  pageNoText.innerText = currentPage;
  createTableBody(getPaginatedData(filteredData));
}

function createTableHeader(tableData) {
  const tableHeaderKeys = Object.keys(tableData[0]);

  tableHeaderKeys.forEach((headerKey) => {
    const tableHeaderKeyElement = document.createElement("th");
    const searchInputElement = document.createElement("input");
    const searchInputId = `${headerKey}-search-input`;

      searchInputElement.setAttribute("type", "search");
      searchInputElement.setAttribute("placeholder", `search ${headerKey}`);
      searchInputElement.setAttribute("id", searchInputId);
      searchInputElement.addEventListener("keyup", () =>
        handleSearchInput(headerKey));
    // console.log(searchInputElement);

    tableHeaderKeyElement.innerText = headerKey;
    tableHeadElement.appendChild(tableHeaderKeyElement);
    tableHeaderKeyElement.appendChild(searchInputElement);
  });
}
function createTableBody(tableData) {
  tableBodyElement.innerHTML = "";
  tableData.forEach((rowData) => {
    const tableRowElement = document.createElement("tr");
    const tableRowValues = Object.values(rowData); // object of values of indexes i.e. {id name age city}
    tableRowValues.forEach((desriptionText) => {
      const tableDescriptionElement = document.createElement("td");
      tableDescriptionElement.innerText = desriptionText; // ek ek element ek ek bar element aaega ex: pahle  {id} the {alex} then {age} then {gender}
      tableRowElement.appendChild(tableDescriptionElement);
    });
    tableBodyElement.appendChild(tableRowElement);
  });
}
previousBtn.addEventListener("click", () => {
  let currentData = filteredData.length ? filteredData : userData;

  currentPage = currentPage > 1 ? currentPage - 1 : 1;
  pageNoText.innerText = currentPage;
  createTableBody(getPaginatedData(currentData));
});
nextBtn.addEventListener("click", () => {
  let currentData = filteredData.length ? filteredData : userData;

  const totalPages = Math.ceil(currentData.length / dataLimit);
  currentPage = currentPage < totalPages ? currentPage + 1 : totalPages;
  pageNoText.innerText = currentPage;
  createTableBody(getPaginatedData(currentData));
});

pageNoText.innerText = currentPage;
// createTableHeader(userData);
// createTableBody(getPaginatedData(userData));

// Fetch data from API
// Using ASYNC AWAIT
// const fetchTableData = async () => {
//     const response = await fetch(URL);
//     if(!response.ok){
//         throw new Error("Failed to fetch data");
//     }
//     const data = await response.json();
//     return data;
// }

// fetchTableData().then((data)=> {
//     console.log(data);
//     createTableHeader(data);
//     createTableBody(getPaginatedData(data));})
// .catch(err => {console.log(err)});

// Using THEN CATCH

fetch(URL).then(response => response.json().then((data)=>{
    createTableHeader(data);
    createTableBody(getPaginatedData(data));
}));