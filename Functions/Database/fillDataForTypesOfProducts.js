const arrayWithTypesOfProducts = [
  "Zboże",
  "Roślina łąkowa",
  "Warzywo",
  "Pasza",
  "Granulat",
];

const findTypesOfProductByName = require("../Animals/findTypesOfProductByName");

function fillDataForTypesOfProducts(TypesOfProducts) {
  for (let i = 0; i < arrayWithTypesOfProducts.length; i++) {
    findTypesOfProductByName(TypesOfProducts, arrayWithTypesOfProducts[i])
      .then((typesOfProducts) => {
        if (typesOfProducts === null) {
          TypesOfProducts.create({
            name: arrayWithTypesOfProducts[i],
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

module.exports = fillDataForTypesOfProducts;
