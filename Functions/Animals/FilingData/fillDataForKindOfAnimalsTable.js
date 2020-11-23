const fillDataForCattleGenres = require("./fillDataForCattleGenres");
/* const arrayWithPigsGenres = [
  "Smalcowe",
  "Słoninowy",
  "Tłuszczowo-mięsny",
  "Mięsny",
]; */
// const arrayWithPoultryGenres = [""];
// const arrayWithFurryGenres = [""];
// const arrayWithEquidaeGenres = [""];
// const arrayWithSheepGenres = [""];
// const arrayWithGoatGenres = [""];
// const arrayWithBeeGenres = [""];
// const arrayWithOthersGenres = ["Pozostałe"];

function fillDataForKindOfAnimalsTable(KindOfAnimals, TypesOfAnimals) {
  fillDataForCattleGenres(KindOfAnimals, TypesOfAnimals);
}

module.exports = fillDataForKindOfAnimalsTable;
