const $ = document.querySelector.bind(document);
const result = $('[app-result]');
const form = $('[app-form]');
const input = $('[form-control]');
const errorMessage = $('[form-message]');
const btnRandom = $('[btn-random]');
const NUMBERS = /^[0-9]*$/; // only numbers from 0 to 9

const validateInput = () => 
  checkIfEmpty(input) || !checkIfNumber(input) ? false : true;

const checkIfEmpty = field => {
  if (isEmpty(field.value.trim())) {
    setInvalid('Please fill out this field!');
    return true;
  } else {
    setValid();
    return false;
  }
}

const isEmpty = value => value === '';

const checkIfNumber = field => {
  if (isNumber(field.value.trim())) {
    setValid()
    return true
  } else {
    setInvalid('This field must contain numbers!')
    return false;
  }
}

const isNumber = value => value.match(NUMBERS);

const setInvalid = message => {
  form.classList.add('invalid');
  errorMessage.innerText = message;
  errorMessage.style.backgroundColor = 'var(--white)';
  result.innerHTML = 'ERROR!';
  result.style.color = 'var(--red)';
}

const setValid = ()  => {
  form.classList.remove('invalid');
  errorMessage.innerText = '';
  result.style.color = 'var(--yellow)';
  renderNumber();
}

const storeNumber = {
  number: 0,
}

const renderNumber = () => result.innerHTML = storeNumber.number;

const randomNumber = number => Math.ceil(Math.random() * number);

const handleEvent = () => {
  input.onblur = () => validateInput();

  input.oninput = () => setValid();

  btnRandom.onclick = () => {
    if (validateInput()) {
      const inputValue = parseInt(input.value);
      storeNumber.number = randomNumber(inputValue);
      renderNumber();
    }
  }
}

const init = () => {
  handleEvent();
  renderNumber();
}

init();