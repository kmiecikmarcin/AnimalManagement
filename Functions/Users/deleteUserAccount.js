const bcrypt = require("bcrypt");

async function deleteUserAccount(
  Users,
  enteredUserPassword,
  userId,
  userPassword,
  accountStatus
) {
  if (accountStatus === false) {
    const checkPassword = await bcrypt.compare(
      enteredUserPassword,
      userPassword
    );
    if (checkPassword) {
      const deleteAccount = await Users.update(
        { accountDeletedStatus: true },
        { where: { id: userId } }
      );
      if (deleteAccount) {
        return deleteAccount;
      }
      return null;
    }
    return null;
  }
  return null;
}

module.exports = deleteUserAccount;
