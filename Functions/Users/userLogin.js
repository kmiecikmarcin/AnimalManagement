const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function userLogin(
  enteredPasswordFromUser,
  userPassword,
  userId,
  userIdRole,
  nameOfUserRole
) {
  const match = await bcrypt.compare(enteredPasswordFromUser, userPassword);
  if (match) {
    const token = jwt.sign(
      {
        id: userId,
        idTypeOfUserRole: userIdRole,
        name: nameOfUserRole,
      },
      process.env.S3_SECRETKEY,
      { expiresIn: "36h" }
    );
    return token;
  }
  return "Hasło jest nieprawidłowe!";
}

module.exports = userLogin;
