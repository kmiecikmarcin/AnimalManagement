const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const jwt = require("jsonwebtoken");

async function userLogin(
  enteredPasswordFromUser,
  userPassword,
  userId,
  userIdRole,
  nameOfRole
) {
  const match = await bcrypt.compare(enteredPasswordFromUser, userPassword);
  if (match) {
    jwt.sign(
      {
        id: userId,
        idTypeOfUserRole: userIdRole,
        typeOfRole: nameOfRole,
      },
      process.env.S3_SECRETKEY,
      { expiresIn: "36h" },
      (token) => {
        json({ token });
      }
    );
  }
  return json({ Error: "User name or password is incorrect!" });
}

module.exports = userLogin;
