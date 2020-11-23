const arrayWithTypesOfAnimals = [
  "Bydło",
  "Trzoda chlewna",
  "Drób",
  "Futerkowce",
  "Koniowate",
  "Jeleniowate",
  "Owce",
  "Kozy",
  "Pszczoły",
  "Ryby",
  "Inne",
];

function fillDataInTypesOfAnimalsTable(TypesOfAnimals) {
  for (let i = 0; i < arrayWithTypesOfAnimals.length; i++) {
    TypesOfAnimals.findOne({
      where: { name: arrayWithTypesOfAnimals[i] },
    }).then((animalType) => {
      if (animalType === null) {
        TypesOfAnimals.create({ name: arrayWithTypesOfAnimals[i] }).then(() => {
          console.log("Dane zostały utworzone!");
        });
      } else {
        console.log("Dane znajdują się już w bazie!");
      }
    });
  }
}

module.exports = fillDataInTypesOfAnimalsTable;
