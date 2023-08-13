const specialCharacters = ['@', '%', '+', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];
const numericCharacters = Array.from({ length: 10 }, (_, i) => i.toString());
const lowerCasedCharacters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
const upperCasedCharacters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

function getPasswordOptions() {
  const length = parseInt(prompt('How many characters would you like your password to contain?'), 10);
  if (isNaN(length) || length < 8 || length > 128) {
    alert('Password length must be a number between 8 and 128');
    return null;
  }

  const hasSpecialCharacters = confirm('Click OK to confirm including special characters.');
  const hasNumericCharacters = confirm('Click OK to confirm including numeric characters.');
  const hasLowerCasedCharacters = confirm('Click OK to confirm including lowercase characters.');
  const hasUpperCasedCharacters = confirm('Click OK to confirm including uppercase characters.');

  if (!(hasSpecialCharacters || hasNumericCharacters || hasLowerCasedCharacters || hasUpperCasedCharacters)) {
    alert('Must select at least one character type');
    return null;
  }

  return {
    length,
    hasSpecialCharacters,
    hasNumericCharacters,
    hasLowerCasedCharacters,
    hasUpperCasedCharacters,
  };
}

function getRandom(arr) {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
}

function generatePassword() {
  const options = getPasswordOptions();
  if (!options) return null;

  const possibleCharacters = []
    .concat(options.hasSpecialCharacters ? specialCharacters : [])
    .concat(options.hasNumericCharacters ? numericCharacters : [])
    .concat(options.hasLowerCasedCharacters ? lowerCasedCharacters : [])
    .concat(options.hasUpperCasedCharacters ? upperCasedCharacters : []);

  const guaranteedCharacters = [];
  if (options.hasSpecialCharacters) guaranteedCharacters.push(getRandom(specialCharacters));
  if (options.hasNumericCharacters) guaranteedCharacters.push(getRandom(numericCharacters));
  if (options.hasLowerCasedCharacters) guaranteedCharacters.push(getRandom(lowerCasedCharacters));
  if (options.hasUpperCasedCharacters) guaranteedCharacters.push(getRandom(upperCasedCharacters));

  const remainingLength = options.length - guaranteedCharacters.length;
  for (let i = 0; i < remainingLength; i++) {
    guaranteedCharacters.push(getRandom(possibleCharacters));
  }

  return guaranteedCharacters.join('');
}


const generateBtn = document.querySelector("#generate");
const passwordText = document.querySelector("#password");


function writePassword() {
  const password = generatePassword();
  passwordText.value = password;
}

generateBtn.addEventListener("click", writePassword);

