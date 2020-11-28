const arrayWithTypesOfFeed = [
  "Zboże",
  "Roślina łąkowa",
  "Warzywo",
  "Pasza",
  "Granulat",
];

const findTypesOfProductByName = require("../Animals/findTypesOfFeedByName");

function fillDataForTypesOfFeed(TypesOfFeed) {
  for (let i = 0; i < arrayWithTypesOfFeed.length; i++) {
    findTypesOfProductByName(TypesOfFeed, arrayWithTypesOfFeed[i])
      .then((typedOfFeed) => {
        if (typedOfFeed === null) {
          TypesOfFeed.create({
            name: arrayWithTypesOfFeed[i],
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

module.exports = fillDataForTypesOfFeed;
