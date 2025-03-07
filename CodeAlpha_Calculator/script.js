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


buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    if (value === 'C') {
      currentInput = '';
      firstOperand = '';
      secondOperand = '';
      operator = null;
      updateDisplay('0');
    } else if (value === 'DEL') {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput || '0');
    } else if (value === '=') {
      if (operator && firstOperand && currentInput) {
        secondOperand = currentInput;
        const result = calculate(firstOperand, secondOperand, operator);
        updateDisplay(result);
        currentInput = result;
        operator = null;
        firstOperand = '';
      }
    } else if (['+', '-', '*', '/'].includes(value)) {
      if (currentInput) {
        firstOperand = currentInput;
        operator = value;
        currentInput = '';
      }
    } else {
      currentInput += value;
      updateDisplay(currentInput);
    }
  });
});


function calculate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  if (op === '+') return a + b;
  if (op === '-') return a - b;
  if (op === '*') return a * b;
  if (op === '/') return a / b;
  return 0;
}


themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
});