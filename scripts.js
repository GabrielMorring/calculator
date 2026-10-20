const NUMBER = "1234567890";
const OPERATOR = "+-/X";

let operandA;
let operator;
let operandB;

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
  if (typeof operandA !== "string") {
    operandA = num;
  } else {
    operandA += num;
  }
  lowerDisplay.textContent = operandA;
}

function handleOperator(op) {
  if (op === "X") {
    op = "*";
  }
}

function handleCA() {}

function handleC() {}

function handleStore() {}

function handlePoint() {}

function flipSign() {}

function handleSubmit() {}
