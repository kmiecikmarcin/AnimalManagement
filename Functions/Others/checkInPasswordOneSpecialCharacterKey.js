function checkInPasswordOneSpecialCharacterKey(enteredPassword) {
  const checkEnteredPassword = /[!@#$%^&*]/.test(enteredPassword);
  return checkEnteredPassword;
}

module.exports = checkInPasswordOneSpecialCharacterKey;
