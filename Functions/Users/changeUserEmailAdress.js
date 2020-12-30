const bcrypt = require("bcrypt");
const checkUserEmail = require("./checkUserEmail");

async function changeUserEmailAdress(
  Users,
  oldUserEmailAdress,
  newUserEmailAdress,
  userPassword
) {
  const checkUserEmailAdress = await checkUserEmail(Users, oldUserEmailAdress);
  if (checkUserEmailAdress !== null) {
    const checkPassword = await bcrypt.compare(
      userPassword,
      checkUserEmailAdress.password
    );
    if (checkPassword) {
      const updateUserEmail = await Users.update(
        { email: newUserEmailAdress },
        { where: { id: checkUserEmailAdress.id } }
      );
      if (updateUserEmail.includes(1)) {
        return updateUserEmail;
      }
      return null;
    }
    return null;
  }
  return null;
}

module.exports = changeUserEmailAdress;
