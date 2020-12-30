const Herds = require("../../Models/Herds");
const KindsOfAnimals = require("../../Models/KindsOfAnimals");
const GenderOfAnimal = require("../../Models/GenderOfAnimal");
const TypesOfJoinToTheHerd = require("../../Models/GenderOfAnimal");

async function findAnimalByHerdIdAndIdentityNumber(
  AnimalsInHerd,
  herdId,
  identityNumberOfAnimal
) {
  const findAnimal = await AnimalsInHerd.findOne({
    where: { identityNumber: identityNumberOfAnimal, idHerd: herdId },
    attributes: [
      "id",
      "identityNumber",
      "breed",
      "joinDate",
      "birthDate",
      "weight",
    ],
    include: [
      { model: Herds, attributes: ["name"] },
      { model: KindsOfAnimals, attributes: ["name"] },
      { model: GenderOfAnimal, attributes: ["name"] },
      { model: TypesOfJoinToTheHerd, attributes: ["name"] },
    ],
  });
  if (findAnimal) {
    console.log(findAnimal);
    return findAnimal;
  }
  return null;
}

module.exports = findAnimalByHerdIdAndIdentityNumber;
