import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from "./localstorage.js";

// Id Section
const inputFieldForName = document.getElementById("inputFieldForName");
const addName = document.getElementById("addName");
const namesDisplayArea = document.getElementById("namesDisplayArea");


// Variables
let listOfNames = [];


// Functions
function displayListOfNames() {
    let namesList = getFromLocalStorage();
    namesDisplayArea.innerHTML = "";
    namesList.map((personName) => {
        let personCard = document.createElement('div');
        personCard.className = "flex justify-between items-center rounded-2xl bg-slate-600 px-6"

        let nameOfPerson = document.createElement('h1');
        nameOfPerson.className = "text-white text-2xl";
        nameOfPerson.innerText = personName;

        let removePersonBtn = document.createElement('button');
        removePersonBtn.className = "w-8";

        removePersonBtn.addEventListener("click", () => {
            removeFromLocalStorage(nameOfPerson.innerText);
            personCard.remove();
        });

        let deleteIcon = document.createElement('img');
        deleteIcon.src = "./assets/icons/delete.png";
        deleteIcon.alt = "Remove name from list";

        namesDisplayArea.appendChild(personCard);

        personCard.appendChild(nameOfPerson);
        personCard.appendChild(removePersonBtn);

        removePersonBtn.appendChild(deleteIcon);

    })
}

// Event Listeners
addName.addEventListener("click", () => {
    listOfNames.push(inputFieldForName.value);
    saveToLocalStorage(inputFieldForName.value);
    console.log(listOfNames);
    displayListOfNames();
});

// On Load of site
displayListOfNames();