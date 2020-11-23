const arrayWithTypesOfUsersRolesData = ["Administrator", "Hodowca"];

function fillDataForUsersTypesOfRolesInDatabase(TypesOfUsersRoles) {
  for (let i = 0; i < arrayWithTypesOfUsersRolesData.length; i++) {
    TypesOfUsersRoles.findOne({
      where: { name: arrayWithTypesOfUsersRolesData[i] },
    }).then((type) => {
      if (type === null) {
        TypesOfUsersRoles.create({
          name: arrayWithTypesOfUsersRolesData[i],
        }).then(() => {
          console.log(
            "Pomyślnie wypełniono dane dotyczące rodzajów użytkowników!"
          );
        });
      } else {
        console.log("Dane znajdują się już w bazie!");
      }
    });
  }
}

module.exports = fillDataForUsersTypesOfRolesInDatabase;
