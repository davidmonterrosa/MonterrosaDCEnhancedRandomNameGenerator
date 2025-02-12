import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from "./localstorage.js";

// Id Section
const inputFieldForName = document.getElementById("inputFieldForName");
const addName = document.getElementById("addName");
const namesDisplayArea = document.getElementById("namesDisplayArea");
const getRandomName = document.getElementById("getRandomName");
const rngNameResult = document.getElementById("rngNameResult");
const generateDifferentName = document.getElementById("generateDifferentName");
const setPeoplePerGroup = document.getElementById("setPeoplePerGroup");
const setPeoplePerGroupBtn = document.getElementById("setPeoplePerGroupBtn");
const makeNumberGroups = document.getElementById("makeNumberGroups");
const makeNumberGroupsBtn = document.getElementById("makeNumberGroupsBtn");
const total = document.getElementById("total");
const groupsByPplArea = document.getElementById("groupsByPplArea");
const groupsByGroupsArea = document.getElementById("groupsByGroupsArea");



// Variables
let listOfNames = getFromLocalStorage();


// Functions
function displayListOfNames() {
    total.innerText = `Number of people: ${listOfNames.length}`;
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

            let idToRemove = listOfNames.indexOf(nameOfPerson.innerText);
            listOfNames.splice(idToRemove, 1);
        
            personCard.remove();
            console.log(listOfNames);
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

function pickRandomName() {
    let randomIndex = Math.floor(Math.random() * listOfNames.length);
    return listOfNames[randomIndex];
}


// The Following code was taken from ChatGPT 4o mini Web Edition w/o account on Feb 11, 2025
// and Isaiah Ferguson unity lecture on Fisher-Yates shuffle method
function randomizeArray(listOfNames) {
    // Create a copy of the original array to avoid mutating it
    let arrayCopy = [...listOfNames];
  
    // Fisher-Yates (Knuth) Shuffle
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
  
    return arrayCopy;
}
// End of Code Block  

function groupByNumberOfPeople(people) {
    // I want to iterate through the array
    // For every (people) items in the array
    // Create Group  
    const arrCopy = randomizeArray(listOfNames);
    let temporaryArray = [];
    let twoDArray = [];
    let counter = 0;
    for(let i = 0; i < listOfNames.length; i++) {
        if(counter == people) {
            twoDArray.push(temporaryArray);
            console.log(twoDArray);
            temporaryArray = [];
            counter = 0;
        } else {
            temporaryArray.push(arrCopy[i]);
            counter++;
        }
    }
    if(counter == 1) {
        twoDArray[twoDArray.length - 1].push(temporaryArray[0]);
    }
    if(counter > 1) {
        console.log(temporaryArray);
        twoDArray.push(temporaryArray);
    }
    let secondCounter = 1;
    groupsByPplArea.innerHTML = "";
    twoDArray.map((arrElement) => {
        let groupNumber = document.createElement("h1");
        groupNumber.className = "mt-4 mb-5 text-3xl font-normal text-gray-500 dark:text-gray-400";
        groupNumber.innerText = `Group ${secondCounter}: ${[...arrElement]}`
        groupsByPplArea.appendChild(groupNumber);
        secondCounter++;
    })
}

function groupByNumberOfGroups(groups) {
    // take number of names (listOfNames.length) and divide by groups
    // This gives number of people per group
    const arrCopy = randomizeArray(listOfNames);
    let peoplePerGroup = parseInt(arrCopy.length / groups);
    console.log(peoplePerGroup);
    let temporaryArray = [];
    let twoDArray = [];
    let counter = 0;
    for(let i = 0; i < listOfNames.length; i++) {
        if(counter == peoplePerGroup) {
            twoDArray.push(temporaryArray);
            console.log(twoDArray);
            temporaryArray = [];
            counter = 0;
        } else {
            temporaryArray.push(arrCopy[i]);
            counter++;
        }
    }
    if(counter == 1) {
        twoDArray[twoDArray.length - 1].push(temporaryArray[0]);
    }
    if(counter > 1) {
        console.log(temporaryArray);
        twoDArray.push(temporaryArray);
    }
    let secondCounter = 1;
    groupsByGroupsArea.innerHTML = "";
    twoDArray.map((arrElement) => {
        let groupNumber = document.createElement("h1");
        groupNumber.className = "mt-4 mb-5 text-3xl font-normal text-gray-500 dark:text-gray-400";
        groupNumber.innerText = `Group ${secondCounter}: ${[...arrElement]}`
        groupsByGroupsArea.appendChild(groupNumber);
        secondCounter++;
    })
}

// Event Listeners
addName.addEventListener("click", () => {
    if(!listOfNames.includes(inputFieldForName.value)) {
        listOfNames.push(inputFieldForName.value);
    }
    saveToLocalStorage(inputFieldForName.value);
    console.log(listOfNames);
    displayListOfNames();
    total.innerText = `Number of people: ${listOfNames.length}`;
});

getRandomName.addEventListener("click", () => {
    rngNameResult.innerText = pickRandomName();
});

generateDifferentName.addEventListener("click", () => {
    rngNameResult.innerText = pickRandomName();
    console.log(rngNameResult.innerText);
});

setPeoplePerGroupBtn.addEventListener("click", () => {
    groupByNumberOfPeople(parseInt(setPeoplePerGroup.value))
});

makeNumberGroupsBtn.addEventListener("click", () => {
    groupByNumberOfGroups(parseInt(makeNumberGroups.value))
});

// On Load of site
displayListOfNames();