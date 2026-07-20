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


extras.forEach(function (extra) {
    extra.addEventListener("change", function() {
        const selectedExtras = [];

        extras.forEach(function (item) {
            if(item.checked) {
                selectedExtras.push(item.value);
            }
        });

        if(selectedExtras.length === 0){
            summaryExtras.textContent = "None";
        } else {
            summaryExtras.textContent = selectedExtras.join(", ");
        }
        updateTotal();
    });
});

function updateTotal(){
    let total = 0;

    const selectedDrink = document.querySelector(
        'input[name="drink"]:checked'
    );

    if (selectedDrink) {
        total = total + Number(selectedDrink.dataset.price);
    }

    if (drinkSize.value !== "") {
        const selectedSize = drinkSize.options[drinkSize.selectedIndex];
        total = total + Number(selectedSize.dataset.price);
    }

    extras.forEach(function (extra) {
        if (extra.checked === true){
            total = total + Number(extra.dataset.price);
        }
    });

    totalPrice.textContent = total.toFixed(2);
};


orderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    console.log("Submit event fired!");

    messageDisplay.textContent = "";
    messageDisplay.classList.remove (
        "error-message",
        "success-message"
    );

    const selectedDrink = document.querySelector(
        'input[name="drink"]:checked'
    );

    if(!orderForm.checkValidity()) {
        orderForm.reportValidity();

        const errorMessage = document.createElement("p");
        errorMessage.textContent = 
        "Please complete all required fields";

        messageDisplay.appendChild(errorMessage);
        messageDisplay.classList.add("error-message");
        messageDisplay.setAttribute("role", "alert");

        return;
    }

    if(selectedDrink === null) {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = 
        "Please select a drink before placing your order";

        messageDisplay.appendChild(errorMessage);
        messageDisplay.classList.add("error-message");
        messageDisplay.setAttribute("role", "alert");

        return;
    }

    const receiptCopy = receiptTemplate.content.cloneNode(true);

    const receiptText = receiptCopy.querySelector(".receiptText");

    receiptText.textContent = 
    `${customerName.value}, your ${drinkSize.value}` +
    `${selectedDrink.value} order has been placed.` +
    `Your total is $${totalPrice.textContent}.`;

    receiptContainer.innerHTML = "";
    receiptContainer.appendChild(receiptCopy);

    messageDisplay.textContent = "Thank You! Your order was submitted succesfully.";

    messageDisplay.classList.add("success-message");
    messageDisplay.setAttribute("role", "status");

    orderHeading.classList.add("completed-order");

    window.alert("Your Fratushka Cafe order was placed!");
});


clearOrderBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const clearConfirmed = window.confirm(
        "Are you sure you want to clear your order?"
    );

    if (clearConfirmed === false) {
        return;
    }

    orderForm.reset ();

    summaryName.textContent =  "Not entered";
    summaryDrink.textContent = "Not selected";
    summarySize.textContent = "Not selected";
    summaryExtras.textContent = "None";
    totalPrice.textContent = "0.00";

    messageDisplay.textContent = "";
    messageDisplay.classList.remove(
        "error-message", "success-message"
    )

    receiptContainer.innerHTML = "";
    orderHeading.classList.remove("completed-order");
});