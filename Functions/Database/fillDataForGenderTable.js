const arrayWithGenderData = ["Kobieta", "Mężczyzna", "Inna"];

function fillDataForGenderTable(Gender) {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < arrayWithGenderData.length; i++) {
    Gender.findOne({ where: { name: arrayWithGenderData[i] } })
      .then(() => {
        Gender.create({
          name: arrayWithGenderData[i],
        });
      })
      .catch(() => {
        throw new Error("Dane znajdują się już w bazie!");
      });
  }
}

module.exports = fillDataForGenderTable;
