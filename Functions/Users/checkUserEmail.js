async function checkUserEmail(Users, userEmail) {
  const checkEmail = await Users.findOne({ where: { email: userEmail } });
  if (checkEmail !== null) {
    return checkEmail;
  }
  return null;
}

module.exports = checkUserEmail;
