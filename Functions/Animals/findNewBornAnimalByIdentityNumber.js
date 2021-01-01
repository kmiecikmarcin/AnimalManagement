const Herds = require("../../Models/Herds");
const KindsOfAnimals = require("../../Models/KindsOfAnimals");

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
    ],
    attributes: ["dateOfBirth", "identityNumber"],
  });
  if (findAnimal) {
    return findAnimal;
  }
  return null;
}

module.exports = findNewBornAnimalByIdentityNumber;
