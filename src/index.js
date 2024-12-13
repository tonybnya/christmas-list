// Get references to DOM elements
const itemInput = document.getElementById("item-input");
const addItemButton = document.getElementById("add-item-button");
const shoppingList = document.getElementById("shopping-list");
const listArr = [];
const lowercaseList = [];

// Log Function for debugging 😀😀😀
const log = (arg) => console.log(arg);

// Function to clean an entry
// 1. Remove whitespaces from both ends
// 2. Remove extra spaces between words
const processEntry = (entry) => {
    return entry.replace(/\s{2,}/g, " ").trim();
};

// Function to check item is not duplicate
function checkDuplicate() {
    let itemText = itemInput.value;

    // If Grandpa enters no item
    if (!itemText) {
        alert("Please enter a valid gift");
        return;
    }

    // Clean the entry value
    const gift = processEntry(itemText);

    // Get the lowercase version of the entry value
    const lower = gift.toLowerCase();

    // Check if the shadow list with all lowercases versions
    // already contains the entry value
    if (lowercaseList.includes(lower)) {
        alert("This gift already exists in the list!");
    } else {
        listArr.push(gift);
        lowercaseList.push(lower);
    }
    renderList();
}

// Function to add an item to the shopping list
function renderList() {
    shoppingList.innerHTML = "";
    listArr.forEach((gift) => {
        const listItem = document.createElement("li");
        // listItem.textContent = gift;
        listItem.innerHTML = `${gift} 
            <button class="editBtn" onclick="editItem('${gift}')">
                <i class="fa-solid fa-pen-to-square"></i>
            </button> 
            <button class="deleteBtn" onclick="deleteItem('${gift}')">
                <i class="fa-solid fa-trash"></i>
            </button>`;
        shoppingList.appendChild(listItem);
    });
    itemInput.value = ""; // Clear the input field
}

// Function to edit an item in the shopping list
window.editItem = function(oldGift) {
    // Prompt Grandpa to edit the gift
    const newGift = prompt("Please, edit the gift:", oldGift);

    if (newGift === null) {
        return;
    }

    // Clean the new entry
    const processedGift = processEntry(newGift);

    if (!processedGift) {
        alert("Please enter a valid gift name.");
        return;
    }

    const lowerNewGift = processedGift.toLowerCase();

    // Check if the new entry is already in the main list
    // and it not the same as the current one
    if (
        lowercaseList.includes(lowerNewGift) &&
        oldGift.toLowerCase() !== lowerNewGift
    ) {
        alert("This gift already exists in the list!");
        return;
    }

    const index = listArr.indexOf(oldGift);
    if (index !== -1) {
        // Update the gift in the main list by its index previously retrieved
        listArr[index] = processedGift;
        // Update the lowercase list
        lowercaseList[index] = lowerNewGift;
    }

    renderList();
};

window.deleteItem = function(gift) {
    // Get the index of the gift in the list
    const index = listArr.indexOf(gift);

    // If index is != to -1, the gift do exist in the main list
    if (index !== -1) {
        // Remove the gift from the main list
        listArr.splice(index, 1);
        // Remove the gift from the lowercase list
        lowercaseList.splice(index, 1);
    }
    renderList();
};

// Function to delete an item from the list
window.deleteItem = function(gift) {
    const index = listArr.indexOf(gift);
    if (index !== -1) {
        // Remove the gift from the main list
        listArr.splice(index, 1);
        // Remove from the lowercase list
        lowercaseList.splice(index, 1);
        renderList();
    }
};

// Add event listener to button
addItemButton.addEventListener("click", checkDuplicate);

// Allow adding items by pressing Enter key
itemInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkDuplicate();
    }
});