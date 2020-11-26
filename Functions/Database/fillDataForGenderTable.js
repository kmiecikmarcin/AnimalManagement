const arrayWithGenderData = ["Kobieta", "Mężczyzna", "Inna"];

function fillDataForGenderTable(Gender) {
  for (let i = 0; i < arrayWithGenderData.length; i++) {
    Gender.findOne({ where: { name: arrayWithGenderData[i] } })
      .then((gender) => {
        if (gender === null) {
          Gender.create({
            name: arrayWithGenderData[i],
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

module.exports = fillDataForGenderTable;
