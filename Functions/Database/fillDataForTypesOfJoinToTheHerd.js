const arrayWithTypesOfJoinToTheHerd = ["Urodzony w hodowli", "Kupiony", "Inny"];
const findTypesOfJoinToTheHerd = require("../Animals/findTypesOfJoinToTheHerd");

function fillDataForTypesOfJoinToTheHerd(TypesOfJoinToTheHerd) {
  for (let i = 0; i < arrayWithTypesOfJoinToTheHerd.length; i++) {
    findTypesOfJoinToTheHerd(
      TypesOfJoinToTheHerd,
      arrayWithTypesOfJoinToTheHerd[i]
    )
      .then((typesOfJoinToTheHerd) => {
        if (typesOfJoinToTheHerd === null) {
          TypesOfJoinToTheHerd.create({
            name: arrayWithTypesOfJoinToTheHerd[i],
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

module.exports = fillDataForTypesOfJoinToTheHerd;
