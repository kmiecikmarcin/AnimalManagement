const arrayWithTypesOfProducts = ["Mięso", "Jajka", "Futro", "Mleko"];
const findTypesOfProductsByName = require("../Animals/findTypesOfProductsByName");

function fillDataForTypesOfProducts(TypesOfProducts) {
  for (let i = 0; i < arrayWithTypesOfProducts.length; i++) {
    findTypesOfProductsByName(TypesOfProducts, arrayWithTypesOfProducts[i])
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
