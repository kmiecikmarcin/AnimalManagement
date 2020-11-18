async function checkTypeOfRole(TypesOfUsersRoles, nameOfUserRole) {
  const findtypeOfRole = await TypesOfUsersRoles.findOne({
    where: { name: nameOfUserRole },
  });
  if (findtypeOfRole == null) {
    return null;
  }
  return findtypeOfRole;
}

module.exports = checkTypeOfRole;
