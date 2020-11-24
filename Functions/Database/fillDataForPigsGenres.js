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
              })
                .then(() => {
                  console.log(
                    "Pomyślnie wypełniono dane dotyczące rodzajów zwierząt!"
                  );
                })
                .catch((error) => {
                  throw new Error(error);
                });
            } else {
              console.log(
                "Dane dotyczące rodzajów zwierząt znajdują się już w bazie!"
              );
            }
          })
          .catch((error) => {
            throw new Error(error);
          });
      }
    } else {
      console.log("Brak danych w bazie! Nie można uzupełnić tabeli!");
    }
  });
}

module.exports = fillDataForPigsGenres;
