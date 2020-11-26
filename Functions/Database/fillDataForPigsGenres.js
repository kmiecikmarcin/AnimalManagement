const arrayWithPigsGenres = [
  "Smalcowe",
  "Słoninowe",
  "Tłuszczowo-mięsne",
  "Mięsne",
];

function fillDataForPigsGenres(KindOfAnimals, TypesOfAnimals) {
  TypesOfAnimals.findOne({ where: { name: "Świnie" } }).then((typeOfAnimal) => {
    if (typeOfAnimal !== null) {
      for (let i = 0; i < arrayWithPigsGenres.length; i++) {
        KindOfAnimals.findOne({
          where: { name: arrayWithPigsGenres[i] },
        })
          .then((kindOfAnimals) => {
            if (kindOfAnimals === null) {
              KindOfAnimals.create({
                name: arrayWithPigsGenres[i],
                idTypesOfAnimals: typeOfAnimal.id,
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
  });
}

module.exports = fillDataForPigsGenres;
