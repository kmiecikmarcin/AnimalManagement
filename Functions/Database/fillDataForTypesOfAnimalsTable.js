const arrayWithTypesOfAnimals = [
  "Bydło",
  "Świnie",
  "Drób",
  "Futerkowce",
  "Koniowate",
  "Owce",
  "Kozy",
  "Pszczoły",
  "Inne",
];

function fillDataForTypesOfAnimalsTable(TypesOfAnimals) {
  for (let i = 0; i < arrayWithTypesOfAnimals.length; i++) {
    TypesOfAnimals.findOne({
      where: { name: arrayWithTypesOfAnimals[i] },
    })
      .then((animalType) => {
        if (animalType === null) {
          TypesOfAnimals.create({ name: arrayWithTypesOfAnimals[i] })
            .then(() => {
              console.log(
                "Pomyślnie wypełniono dane dotyczące typów zwierząt!"
              );
            })
            .catch();
        } else {
          console.log("Dane znajdują się już w bazie!");
        }
      })
      .catch();
  }
}

module.exports = fillDataForTypesOfAnimalsTable;
