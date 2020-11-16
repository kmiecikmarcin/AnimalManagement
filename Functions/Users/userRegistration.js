async function register(res, Users, userEmail, userPassword, idRole) {
  const user = await Users.create({
    email: userEmail,
    password: userPassword,
    idTypeOfUserRole: idRole,
  });

  return user;
}

module.exports = register;
