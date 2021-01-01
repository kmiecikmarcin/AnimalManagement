const KindsOfAnimals = require("../../Models/KindsOfAnimals");

async function findHerdByName(Herds, herdName, userId) {
  const findHerd = await Herds.findOne({
    where: { name: herdName, UserId: userId },
    include: { model: KindsOfAnimals, attributes: ["name"] },
    attributes: ["id", "name", "creationDate"],
  });
  if (findHerd === null) {
    return null;
  }
  return findHerd;
}

module.exports = findHerdByName;
