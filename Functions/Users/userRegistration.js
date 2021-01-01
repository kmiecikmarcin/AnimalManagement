const bcrypt = require("bcrypt");

async function register(Users, userEmail, userPassword, idRole, idUserGender) {
  const hash = await bcrypt.hash(userPassword, 8);

  const user = await Users.create({
    email: userEmail,
    password: hash,
    accountDeletedStatus: false,
    TypesOfUsersRoleId: idRole,
    GenderId: idUserGender,
  });
  if (user === null) {
    return null;
  }
  return user;
}

module.exports = register;
