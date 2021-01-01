const bcrypt = require("bcrypt");

async function deleteHerdByUser(
  Herds,
  enteredPasswordFromUser,
  herdName,
  userId,
  userPassword
) {
  const checkPassword = await bcrypt.compare(
    enteredPasswordFromUser,
    userPassword
  );
  if (checkPassword) {
    const deleteHerd = await Herds.destroy({
      where: { name: herdName, UserId: userId },
    });
    if (deleteHerd) {
      return deleteHerd;
    }
    return null;
  }
  return null;
}

module.exports = deleteHerdByUser;
