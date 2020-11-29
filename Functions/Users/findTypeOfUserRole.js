async function checkTypeOfRole(TypesOfUsersRoles, typeName) {
  const findtypeOfRole = await TypesOfUsersRoles.findOne({
    where: { name: typeName },
  });
  if (findtypeOfRole === null) {
    return null;
  }
  return findtypeOfRole;
}

module.exports = checkTypeOfRole;
