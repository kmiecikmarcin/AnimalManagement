const arrayWithAnimalGenderData = ["Samica", "Samiec"];

function fillDataForAnimalGender(GenderOfAnimal) {
  for (let i = 0; i < arrayWithAnimalGenderData.length; i++) {
    GenderOfAnimal.findOne({ where: { name: arrayWithAnimalGenderData[i] } })
      .then((gender) => {
        if (gender === null) {
          GenderOfAnimal.create({
            name: arrayWithAnimalGenderData[i],
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

module.exports = fillDataForAnimalGender;
