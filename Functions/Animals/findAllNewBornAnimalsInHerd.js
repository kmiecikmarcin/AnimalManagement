const KindsOfAnimals = require("../../Models/KindsOfAnimals");
const Herds = require("../../Models/Herds");

async function findAllNewBornAnimalsInHerd(AnimalsBirths, herdId) {
  const search = await AnimalsBirths.findAll({
    where: { idHerd: herdId },
    include: [
      { model: Herds, attributes: ["name"] },
      { model: KindsOfAnimals, attributes: ["name"] },
    ],
    attributes: ["dateOfBirth", "identityNumber"],
  });
  if (search !== null && Object.keys(search).length !== 0) {
    return search;
  }
  return null;
}

module.exports = findAllNewBornAnimalsInHerd;
