// Functions
function saveToLocalStorage(person) {
    let listOfNames = getFromLocalStorage();

    if (!listOfNames.includes(person)) {
        listOfNames.push(person);
    }

    localStorage.setItem('Names', JSON.stringify(listOfNames));
}

function getFromLocalStorage() {
    let localStorageData = localStorage.getItem('Names');

    if (localStorageData == null) {
        return [];
    }

    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(person) {
    let localStorageData = getFromLocalStorage();

    let idToRemove = localStorageData.indexOf(person);

    localStorageData.splice(idToRemove, 1);

    localStorage.setItem('Names', JSON.stringify(localStorageData));
}

export {saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage}