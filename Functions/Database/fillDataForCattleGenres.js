const arrayWithCattleGenres = ["Mleczne", "Mięsne", "Kombinowane"];

function fillDataForCattleGenres(KindOfAnimals, TypesOfAnimals) {
  TypesOfAnimals.findOne({ where: { name: "Bydło" } })
    .then((typeOfAnimal) => {
      if (typeOfAnimal !== null) {
        for (let i = 0; i < arrayWithCattleGenres.length; i++) {
          KindOfAnimals.findOne({
            where: { name: arrayWithCattleGenres[i] },
          })
            .then((kindOfAnimals) => {
              if (kindOfAnimals === null) {
                KindOfAnimals.create({
                  name: arrayWithCattleGenres[i],
                  idTypesOfAnimals: typeOfAnimal.id,
                })
                  .then(() => {
                    console.log(
                      "Pomyślnie wypełniono dane dotyczące rodzajów zwierząt!"
                    );
                  })
                  .catch();
              } else {
                console.log(
                  "Dane dotyczące rodzajów zwierząt znajdują się już w bazie!"
                );
              }
            })
            .catch();
        }
      } else {
        console.log("Brak danych w bazie! Nie można uzupełnić tabeli!");
      }
    })
    .catch();
}

module.exports = fillDataForCattleGenres;
