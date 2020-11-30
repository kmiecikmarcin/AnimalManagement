const bcrypt = require("bcrypt");

async function changeUserPassword(
  Users,
  oldUserPassword,
  newUserPassword,
  userId
) {
  if (oldUserPassword !== newUserPassword) {
    const checkPassword = await bcrypt.compare(
      oldUserPassword,
      userId.password
    );
    if (checkPassword) {
      const hash = await bcrypt.hash(newUserPassword, 8);
      const changePasswordForUser = Users.update(
        { password: hash },
        { where: { id: userId } }
      );
      if (changePasswordForUser) {
        return changePasswordForUser;
      }
      return null;
    }
    return null;
  }
  return null;
}

module.exports = changeUserPassword;
