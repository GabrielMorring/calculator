const NUMBER = "1234567890";
const OPERATOR = "+-/X";
const STORE = "123";
const RECALL = "456";

let operandA = { value: null };
let operator;
let operandB = { value: null };
// currentOperand is a reference, so changing currentOperand.value will change operandA.value. If currentOperand is set to equal operandB then it will change operandB.value
let currentOperand = operandA;

let addPoint = false;
let storeMode = false;

let register1 = 0;
let register2 = 0;
let register3 = 0;

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
  let result;
  switch (operator) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "*":
      result = multiply(a, b);
      break;
    case "/":
      result = divide(a, b);
      break;
  }

  if (result > 9999999999999) {
    return "too large";
  }
  if (result.toString().length > 13) {
    let num = Math.floor(result);
    num = num.toString();
    return result.toFixed(13 - num.length);
  }
  return result;
}

function storeRegister(register) {
  switch (register) {
    case "1":
      register1 = currentOperand.value;
      break;
    case "2":
      register2 = currentOperand.value;
      break;
    case "3":
      register3 = currentOperand.value;
      break;
  }
}

function recallRegister(register) {
  switch (register) {
    case "4":
      currentOperand.value = register1;
      break;
    case "5":
      currentOperand.value = register2;
      break;
    case "6":
      currentOperand.value = register3;
      break;
  }
  lowerDisplay.textContent = currentOperand.value;
}

function handleButtonClick(event) {
  if (storeMode) {
    if (STORE.includes(event.target.textContent)) {
      storeRegister(event.target.textContent);
    }
    if (RECALL.includes(event.target.textContent)) {
      recallRegister(event.target.textContent);
    }
    storeMode = false;
    return;
  }

  if (!Number.isFinite(Number(operandA.value)) && operandA.value !== null) {
    operandA.value = null;
  }
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
      break;
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
  if (
    (currentOperand.value === null ||
      typeof currentOperand.value === "number") &&
    addPoint
  ) {
    currentOperand.value = "0." + num;
    addPoint = false;
    lowerDisplay.textContent = currentOperand.value;
    return;
  }
  if (typeof currentOperand.value !== "string") {
    currentOperand.value = num;
  } else {
    if (currentOperand.value.length > 13) return;
    if (addPoint) {
      currentOperand.value = currentOperand.value + "." + num;
      addPoint = false;
    } else {
      currentOperand.value += num;
    }
  }
  lowerDisplay.textContent = currentOperand.value;
}

function handleOperator(op) {
  let correctedOp = op;
  if (op === "X") {
    correctedOp = "*";
  }

  if (operandA.value === null) return;
  if (currentOperand === operandA) {
    operator = correctedOp;
    upperDisplay.textContent = operandA.value + " " + op;
    currentOperand = operandB;
    return;
  }
  if (currentOperand === operandB && operandB.value !== null) {
    handleSubmit();
    operator = correctedOp;
    upperDisplay.textContent = operandA.value + " " + op;

    currentOperand = operandB;
    return;
  }
  if (currentOperand === operandB && operandB.value === null) {
    operator = correctedOp;
    upperDisplay.textContent = operandA.value + " " + op;
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
  if (typeof currentOperand.value !== "string") return;
  if (currentOperand.value !== null) {
    currentOperand.value = currentOperand.value.slice(0, -1);
    lowerDisplay.textContent = currentOperand.value;
    if (currentOperand.value === "") {
      currentOperand.value = null;
    }
  }
}

function handleStore() {
  storeMode = true;
}

function handlePoint() {
  if (currentOperand.value === null) {
    addPoint = true;
    return;
  }
  if (typeof currentOperand.value === "number") {
    addPoint = true;
    return;
  }
  if (currentOperand.value.includes(".")) return;
  addPoint = true;
}

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
  upperDisplay.textContent = "";
  operator = null;
  operandB.value = null;
  currentOperand = operandA;
}
