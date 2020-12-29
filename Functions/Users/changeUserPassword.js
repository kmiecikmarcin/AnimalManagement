const bcrypt = require("bcrypt");

async function changeUserPassword(
  Users,
  oldUserPassword,
  newUserPassword,
  userId,
  userPassword
) {
  if (oldUserPassword !== newUserPassword) {
    const checkPassword = await bcrypt.compare(oldUserPassword, userPassword);
    if (checkPassword) {
      const hash = await bcrypt.hash(newUserPassword, 8);
      if (hash) {
        const changePasswordForUser = Users.update(
          { password: hash },
          { where: { id: userId } }
        );
        if (changePasswordForUser.includes(1)) {
          return changePasswordForUser;
        }
        return null;
      }
      return null;
    }
    return null;
  }
  return null;
}

module.exports = changeUserPassword;
