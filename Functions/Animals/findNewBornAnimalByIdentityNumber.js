const Herds = require("../../Models/Herds");
const KindsOfAnimals = require("../../Models/KindsOfAnimals");
const AnimalsInHerd = require("../../Models/AnimalsInHerd");

async function findNewBornAnimalByIdentityNumber(
  AnimalsBirths,
  herdId,
  identityNumberOfAnimal
) {
  const findAnimal = await AnimalsBirths.findOne({
    where: { idHerd: herdId, identityNumber: identityNumberOfAnimal },
    include: [
      { model: Herds, attributes: ["name"] },
      { model: KindsOfAnimals, attributes: ["name"] },
      { model: AnimalsInHerd, attributes: ["identityNumberOfAnimal"] },
    ],
    attributes: ["dateOfBirth", "identityNumber"],
  });
  if (findAnimal) {
    return findAnimal;
  }
  return null;
}

module.exports = findNewBornAnimalByIdentityNumber;
