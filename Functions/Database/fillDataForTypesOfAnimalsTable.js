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
          TypesOfAnimals.create({ name: arrayWithTypesOfAnimals[i] }).catch(
            (error) => {
              throw new Error(error);
            }
          );
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}

module.exports = fillDataForTypesOfAnimalsTable;
