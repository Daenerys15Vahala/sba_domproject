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
const messageDisplay = document.querySelector("#messageDisplay");
const clearOrderBtn = document.querySelector("#clearOrderBtn");
