const arrayWithCattleGenres = ["Mleczne", "Mięsne", "Kombinowane"];
const findTypesOfAnimalsByName = require("../Animals/findTypesOfAnimalsByName");
const findKindOfAnimalsbyName = require("../Animals/findKindOfAnimalsByName");

function fillDataForCattleGenres(KindOfAnimals, TypesOfAnimals) {
  findTypesOfAnimalsByName(TypesOfAnimals, "Bydło")
    .then((typesOfAnimals) => {
      if (typesOfAnimals !== null) {
        for (let i = 0; i < arrayWithCattleGenres.length; i++) {
          findKindOfAnimalsbyName(KindOfAnimals, arrayWithCattleGenres[i])
            .then((kindOfAnimals) => {
              if (kindOfAnimals === null) {
                KindOfAnimals.create({
                  name: arrayWithCattleGenres[i],
                  idTypesOfAnimals: typesOfAnimals.id,
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
    })
    .catch((error) => {
      throw new Error(error);
    });
}

module.exports = fillDataForCattleGenres;
