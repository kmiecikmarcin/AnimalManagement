const arrayWithTypesOfUsersRolesData = ["Administrator", "Hodowca"];

function fillDataForUsersTypesOfRolesInDatabase(TypesOfUsersRoles) {
  for (let i = 0; i < arrayWithTypesOfUsersRolesData.length; i++) {
    TypesOfUsersRoles.findOne({
      where: { name: arrayWithTypesOfUsersRolesData[i] },
    })
      .then((type) => {
        if (type === null) {
          TypesOfUsersRoles.create({
            name: arrayWithTypesOfUsersRolesData[i],
          }).catch((error) => {
            throw new Error(error);
          });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}

module.exports = fillDataForUsersTypesOfRolesInDatabase;
