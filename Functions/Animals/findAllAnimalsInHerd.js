const Herds = require("../../Models/Herds");
const TypesOfJoinToTheHerd = require("../../Models/TypesOfJoinToTheHerd");
const KindsOfAnimals = require("../../Models/KindsOfAnimals");
const GenderOfAnimal = require("../../Models/GenderOfAnimal");

async function findAllAnimalsInHerd(AnimalsInHerd, herdId) {
  const search = await AnimalsInHerd.findAll({
    raw: true,
    where: { idHerd: herdId },
    include: [
      { model: Herds, attributes: ["name"] },
      { model: TypesOfJoinToTheHerd, attributes: ["name"] },
      { model: KindsOfAnimals, attributes: ["name"] },
      { model: GenderOfAnimal, attributes: ["name"] },
    ],
    attributes: [
      "identityNumberOfAnimal",
      "breedOfAnimal",
      "dateOfJoinToTheHerd",
      "birthDate",
      "animalWeight",
    ],
  });
  if (search !== null && Object.keys(search).length !== 0) {
    return search;
  }
  return null;
}

module.exports = findAllAnimalsInHerd;
