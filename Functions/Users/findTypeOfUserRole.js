async function checkTypeOfRole(TypesOfUsersRoles, typeUserRoleName) {
  const findtypeOfRole = await TypesOfUsersRoles.findOne({
    where: { name: typeUserRoleName },
  });
  if (findtypeOfRole === null) {
    return null;
  }
  return findtypeOfRole;
}

module.exports = checkTypeOfRole;
