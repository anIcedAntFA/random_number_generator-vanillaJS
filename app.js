const $ = document.querySelector.bind(document);
const result = $('[app-result]');
const form = $('[form-group]');
const inputFrom = $('[first-number]');
const inputTo = $('[last-number]');
const errorMessage = $('[form-message]');
const btnRandom = $('[btn-random]');
const NUMBERS = /^-?[0-9]\d*(\.\d+)?$/; // only numbers from 0 to 9 including negative numbers

const validateInputFrom = () => {
  if (checkIfEmpty(inputFrom)) return;
  if (!checkIfNumber(inputFrom)) return;
  if (!checkIfGreaterThan(inputFrom, inputTo)) return;
  return true;
}

const validateInputTo = () => {
  if (checkIfEmpty(inputTo)) return;
  if (!checkIfNumber(inputTo)) return;
  if (!checkIfGreaterThan(inputFrom, inputTo)) return;
  return true;
}

const checkIfEmpty = field => {
  if (isEmpty(field.value.trim())) {
    setInvalid('Please fill out this field!');
    return true;
  } else {
    setValid();
    return false;
  }
}

const checkIfNumber = field => {
  if (isNumber(field.value.trim())) {
    setValid();
    return true;
  } else {
    setInvalid('This field must contain numbers!')
    return false;
  }
}

const checkIfGreaterThan = (field1, field2)=> {
  if (isGreaterThan(field1.value.trim(), field2.value.trim())) {
    setValid();
    return true;
  } else {
    setInvalid('This number must be greater than the one above!')
    return false;
  }
}

const isEmpty = value => value === '';

const isNumber = value => value.match(NUMBERS);

const isGreaterThan = (number1, number2) => number2 - number1 > 0; 

const setInvalid = message => {
  form.classList.add('invalid');
  errorMessage.innerText = message;
  result.innerHTML = 'ERROR!';
  result.style.color = 'var(--red)';
}

const setValid = ()  => {
  form.classList.remove('invalid');
  errorMessage.innerText = '';
  renderNumber();
}

const storeNumber = {
  number: 0,
}

const renderNumber = () => result.innerHTML = storeNumber.number;

const generateRandomInteger = (min, max) => {
  return Math.ceil(min + Math.random() * (max - min));
}

const updateTextColor = () => {
  if (storeNumber.number < 0) {
    result.classList.remove('text-yellow');
    result.classList.add('text-red');
  } else if (storeNumber.number > 0) {
    result.classList.remove('text-red');
    result.classList.add('text-yellow');
  } else if (storeNumber.number === 0) {
    result.classList.remove('text-yellow');
    result.classList.remove('text-red');
  }
}
  
const handleEvent = () => {
  inputFrom.onblur = () => validateInputFrom();
  inputTo.onblur = () => validateInputTo();

  inputFrom.oninput = () => setValid();
  inputTo.oninput = () => setValid();

  btnRandom.onclick = () => {
    if (validateInputFrom() && validateInputTo()) {
      storeNumber.number = generateRandomInteger(
        parseInt(inputFrom.value), parseInt(inputTo.value)
      );
      updateTextColor();
      renderNumber();
    }
  }
}

const init = () => {
  handleEvent();
  renderNumber();
}

init();