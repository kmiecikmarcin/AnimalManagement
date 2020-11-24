const fillDataForCattleGenres = require("./fillDataForCattleGenres");

// const arrayWithPoultryGenres = [""];
// const arrayWithFurryGenres = [""];
// const arrayWithEquidaeGenres = [""];
// const arrayWithSheepGenres = [""];
// const arrayWithGoatGenres = [""];
// const arrayWithBeeGenres = [""];
// const arrayWithOthersGenres = ["Pozostałe"];

function fillDataForKindOfAnimalsTable(KindOfAnimals, TypesOfAnimals) {
  TypesOfAnimals.findAll({})
    .then(() => {
      fillDataForCattleGenres(KindOfAnimals, TypesOfAnimals);
    })
    .catch((error) => {
      throw new Error(error);
    });
}

module.exports = fillDataForKindOfAnimalsTable;
