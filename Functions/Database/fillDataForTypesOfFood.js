const arrayWithTypesOfFood = [
  "Zboże",
  "Roślina łąkowa",
  "Warzywo",
  "Pasza",
  "Granulat",
];

const findTypesOfProductByName = require("../Animals/findTypesOfFoodByName");

function fillDataForTypesOfFood(TypesOfFood) {
  for (let i = 0; i < arrayWithTypesOfFood.length; i++) {
    findTypesOfProductByName(TypesOfFood, arrayWithTypesOfFood[i])
      .then((typedOfFood) => {
        if (typedOfFood === null) {
          TypesOfFood.create({
            name: arrayWithTypesOfFood[i],
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

module.exports = fillDataForTypesOfFood;
