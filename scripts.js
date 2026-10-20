const NUMBER = "1234567890";
const OPERATOR = "+-/X";

let operandA = { value: null };
let operator;
let operandB = { value: null };
let currentOperand = operandA;

const upperDisplay = document.querySelector(".upperDisplay");
const lowerDisplay = document.querySelector(".lowerDisplay");

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return 5318008;
  return a / b;
}

function operate(a, operator, b) {
  a = +a;
  b = +b;
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

function handleButtonClick(event) {
  if (NUMBER.includes(event.target.textContent)) {
    handleNumber(event.target.textContent);
    return;
  }
  if (OPERATOR.includes(event.target.textContent)) {
    handleOperator(event.target.textContent);
    return;
  }

  switch (event.target.textContent) {
    case "CA":
      handleCA();
      break;
    case "C":
      handleC();
      break;
    case "STO/ RCL":
      handleStore();
      break;
    case ".":
      handlePoint();
    case "+/-":
      flipSign();
      break;
    case "=":
      handleSubmit();
      break;
  }
}

const buttons = document.querySelector(".buttons").querySelectorAll("button");
buttons.forEach((button) =>
  button.addEventListener("click", handleButtonClick),
);

function handleNumber(num) {
  if (typeof currentOperand.value !== "string") {
    currentOperand.value = num;
  } else {
    currentOperand.value += num;
  }
  lowerDisplay.textContent = currentOperand.value;
}

function handleOperator(op) {
  if (op === "X") {
    op = "*";
  }
  if (currentOperand === operandA) {
    operator = op;
    currentOperand = operandB;
    return;
  }
  if (currentOperand === operandB) {
    handleSubmit();
    operator = op;
    currentOperand = operandB;
  }
}

function handleCA() {
  currentOperand = operandA;
  operandA.value = null;
  operator = null;
  operandB.value = null;
  upperDisplay.textContent = "";
  lowerDisplay.textContent = "";
}

function handleC() {
  if (currentOperand.value !== null) {
    currentOperand.value = currentOperand.value.slice(0, -1);
    lowerDisplay.textContent = currentOperand.value;
    if (currentOperand.value === "") {
      currentOperand.value = null;
    }
  }
}

function handleStore() {}

function handlePoint() {}

function flipSign() {
  if (currentOperand.value !== null) {
    if (currentOperand.value[0] === "-") {
      currentOperand.value = currentOperand.value.slice(1);
    } else {
      currentOperand.value = "-" + currentOperand.value;
    }
    lowerDisplay.textContent = currentOperand.value;
  }
}

function handleSubmit() {
  operandA.value = operate(operandA.value, operator, operandB.value);
  lowerDisplay.textContent = operandA.value;
  operator = null;
  //   operandA.value = null;
  operandB.value = null;
  currentOperand = operandA;
}
