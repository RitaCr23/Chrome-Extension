let myLinks = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const ulEl = document.getElementById("ul-el");
const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"));

//if there are items on local storage, render them
if (linksFromLocalStorage) {
  myLinks = linksFromLocalStorage;
  renderLinks(myLinks);
}

function renderLinks(links) {
  let listItems = "";
  //loop over array and display each item
  for (let i = 0; i < links.length; i++) {
    //use inner HTML in order to display items as a list with links
    listItems += `
            <li>
                <a target='_blank' href='${links[i]}'>
                    ${links[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

//delete all items on click
deleteBtn.addEventListener("click", function () {
  localStorage.clear();
  myLinks = [];
  renderLinks(myLinks);
});

inputBtn.addEventListener("click", function () {
  //push input value to array
  myLinks.push(inputEl.value);
  //reset the input value after it's submitted
  inputEl.value = "";
  //set items from input to local storage and turn them into a string
  localStorage.setItem("myLinks", JSON.stringify(myLinks));
  renderLinks(myLinks);
});

tabBtn.addEventListener("click", function () {
  //communicate with Google API to get the active tab and current window link
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //push tab link to array
    myLinks.push(tabs[0].url);
    //save link on local storage
    localStorage.setItem("myLinks", JSON.stringify(myLinks));
    renderLinks(myLinks);
  });
});
