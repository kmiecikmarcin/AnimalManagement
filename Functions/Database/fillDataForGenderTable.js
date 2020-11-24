const arrayWithGenderData = ["Kobieta", "Mężczyzna", "Inna"];

function fillDataForGenderTable(Gender) {
  for (let i = 0; i < arrayWithGenderData.length; i++) {
    Gender.findOne({ where: { name: arrayWithGenderData[i] } })
      .then((gender) => {
        if (gender === null) {
          Gender.create({
            name: arrayWithGenderData[i],
          })
            .then(() => {
              console.log("Pomyślnie wypełniono dane dotyczące płci!");
            })
            .catch((error) => {
              throw new Error(error);
            });
        } else {
          console.log("Dane znajdują się już w bazie!");
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}

module.exports = fillDataForGenderTable;
