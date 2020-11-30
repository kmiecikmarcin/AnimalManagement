async function findTypeOfUserRoleByName(TypesOfUsersRoles, typeOfUserRoleName) {
  const findtypeOfRole = await TypesOfUsersRoles.findOne({
    where: { name: typeOfUserRoleName },
  });
  if (findtypeOfRole === null) {
    return null;
  }
  return findtypeOfRole;
}

module.exports = findTypeOfUserRoleByName;
