async function findTypeOfUserRoleById(TypesOfUsersRoles, idTypeOfUserRole) {
  const findtypeOfRole = await TypesOfUsersRoles.findOne({
    where: { id: idTypeOfUserRole },
  });
  if (findtypeOfRole === null) {
    return null;
  }
  return findtypeOfRole;
}

module.exports = findTypeOfUserRoleById;
