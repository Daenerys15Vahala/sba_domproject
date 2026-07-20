// SBA DOM PROJECT


const orderForm = document.querySelector("#orderForm");

// customer info
const customerName = document.querySelector("#customerName");
const customerEmail = document.querySelector("#customerEmail");

// order
const drinkOptions = document.querySelectorAll('input[name="drink"]');
const drinkSize = document.querySelector("#drinkSize");
const extras = document.querySelectorAll('input[name="extras"]');

// summary
const summaryName = document.querySelector("#summaryName");
const summaryDrink = document.querySelector("#summaryDrink");
const summarySize = document.querySelector("#summarySize");
const summaryExtras = document.querySelector("#summaryExtras");
const totalPrice = document.querySelector("#totalPrice");

// buttons
const messageDisplay = document.getElementById("messageDisplay");
const clearOrderBtn = document.querySelector("#clearOrderBtn");

// receipt
const receiptTemplate = document.querySelector("#receiptTemplate");
const receiptContainer = document.querySelector("#receiptContainer");

const orderSection = orderForm.parentElement;
const orderHeading = orderSection.firstElementChild;


// events
customerName.addEventListener("input", function () {
    if (customerName.value.trim() === "") {
        summaryName.textContent = "Not entered";
    } else {
        summaryName.textContent = customerName.value;
    }
});

drinkOptions.forEach(function(drink) {
    drink.addEventListener("change", function () {
        summaryDrink.textContent = drink.value;
        updateTotal();
    });
});

drinkSize.addEventListener("change", function() {
    if (drinkSize.value === "") {
        summarySize.textContent = "Not selected";
    } else {
        summarySize.textContent = drinkSize.value;
    }
    updateTotal();
});
