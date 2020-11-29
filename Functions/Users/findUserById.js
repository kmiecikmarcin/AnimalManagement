async function findUserById(Users, authData) {
  const findUser = await Users.findOne({
    where: { id: authData.id },
  });
  if (findUser === null) {
    return null;
  }
  return findUser;
}

module.exports = findUserById;
