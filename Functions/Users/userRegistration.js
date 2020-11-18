const bcrypt = require("bcrypt");

async function register(Users, userEmail, userPassword, idRole, idGender) {
  const hash = await bcrypt.hash(userPassword, 8);

  const user = await Users.create({
    email: userEmail,
    password: hash,
    idTypeOfUserRole: idRole,
    gender: idGender,
  });

  return user;
}

module.exports = register;
