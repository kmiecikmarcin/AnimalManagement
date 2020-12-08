async function checkUserEmail(Users, userEmail) {
  const checkEmail = await Users.findOne({
    where: { email: userEmail, accountDeletedStatus: false },
  });
  if (checkEmail !== null) {
    return checkEmail;
  }
  return null;
}

module.exports = checkUserEmail;
