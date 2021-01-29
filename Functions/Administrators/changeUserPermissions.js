async function changeTypeOfUserRole(
  res,
  Users,
  administratorPermission,
  userId,
  typeOfUserRoleId,
  newTypeOfUserRoleId
) {
  if (administratorPermission === process.env.S3_PERMISSION) {
    const chagneUserPermissions = await Users.update(
      { TypesOfUsersRoleId: newTypeOfUserRoleId },
      { where: { TypesOfUsersRoleId: typeOfUserRoleId, id: userId } }
    );
    if (chagneUserPermissions.includes(1)) {
      return chagneUserPermissions;
    }
    return null;
  }
  return null;
}

module.exports = changeTypeOfUserRole;
