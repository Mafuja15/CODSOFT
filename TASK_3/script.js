const display = document.getElementById('display');
const fullExpression = document.getElementById('full-expression');
const buttons = Array.from(document.getElementsByClassName('btn'));

let currentOperand = '';
let previousOperand = '';
let operation = undefined;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if ((value >= '0' && value <= '9') || value === '.') {
            appendNumber(value);
        }
        else if (value === '=') {
            compute();
            updateDisplay(); // Update display with the result after clicking '='
            updateFullExpression(); // Update full expression display to show the final result
        } else if (value === 'DEL') {
            deleteNumber();
            updateDisplay(); // Update display after deleting a number
            updateFullExpression(); // Update full expression display
        } else if (value === 'AC') {
            clearAll();
            updateDisplay(); // Update display after clearing all
            fullExpression.innerText = ''; // Clear full expression display
        } else if (value === '%') {
            computePercentage();
            updateDisplay(); // Update display after computing percentage
            updateFullExpression(); // Update full expression display
        } else {
            chooseOperation(value);
            updateDisplay(); // Update display when an operation is chosen
            updateFullExpression(); // Update full expression display
        }
    });
});

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand += number;
    updateDisplay(); // Update display with the current number
}

function clearAll() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
}

function deleteNumber() {
    currentOperand = currentOperand.slice(0, -1);
    updateDisplay(); // Update display after deleting a number
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateFullExpression(); // Update the expression display
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
}

function computePercentage() {
    let percentage;
    const current = parseFloat(currentOperand);
    
    if (operation && previousOperand !== '') {
        const prev = parseFloat(previousOperand);
        switch (operation) {
            case '+':
            case '-':
                percentage = (prev * current) / 100;
                break;
            case '×':
            case '÷':
                percentage = current / 100;
                break;
            default:
                return;
        }
        currentOperand = percentage.toString();
    } else {
        currentOperand = (current / 100).toString();
    }
}

function updateDisplay() {
    display.innerText = currentOperand;
}

function updateFullExpression() {
    fullExpression.innerText = `${previousOperand} ${operation || ''} ${currentOperand}`;
}

clearAll();
updateDisplay();
