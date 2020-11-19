const arrayWithGenderData = ["Kobieta", "Mężczyzna", "Inna"];

function fillDataForGenderTable(Gender) {
  for (let i = 0; i < arrayWithGenderData.length; i++) {
    Gender.findOne({ where: { name: arrayWithGenderData[i] } }).then(
      (gender) => {
        if (gender === null) {
          Gender.create({
            name: arrayWithGenderData[i],
          }).then(() => {
            console.log("Dane zostały dodane popawnie!");
          });
        } else {
          console.log("Dane znajdują się już w bazie!");
        }
      }
    );
  }
}

module.exports = fillDataForGenderTable;
