const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const themeToggle = document.getElementById('theme-toggle');

let currentInput = '';
let operator = null;
let firstOperand = '';
let secondOperand = '';


function updateDisplay(value) {
  display.textContent = value;
}


