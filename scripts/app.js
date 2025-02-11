import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from "./localstorage.js";

// Id Section
const inputFieldForName = document.getElementById("inputFieldForName");
const addName = document.getElementById("addName");
const namesDisplayArea = document.getElementById("namesDisplayArea");


// Variables
let listOfNames = [];


// Functions
function displayListOfNames() {
    
}

// Event Listeners
addName.addEventListener("click", () => {
    listOfNames.push(inputFieldForName.value);
    saveToLocalStorage(inputFieldForName.value);
    console.log(listOfNames);
});
