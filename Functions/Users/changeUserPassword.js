const bcrypt = require("bcrypt");

async function changeUserPassword(
  Users,
  oldUserPassword,
  newUserPassword,
  userId,
  userPassword
) {
  if (oldUserPassword !== newUserPassword) {
    console.log(userId);
    const checkPassword = await bcrypt.compare(oldUserPassword, userPassword);
    if (checkPassword) {
      const hash = await bcrypt.hash(newUserPassword, 8);
      console.log(hash);
      if (hash) {
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
  return null;
}

module.exports = changeUserPassword;
