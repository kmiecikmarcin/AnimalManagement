const KindsOfAnimals = require("../../Models/KindsOfAnimals");

async function findHerdByAnimalType(KindOfAnimals, Herds, herdType, userId) {
  const findHerdType = await KindOfAnimals.findOne({
    where: { name: herdType },
  });
  if (findHerdType != null) {
    const findHerd = await Herds.findOne({
      where: { idKindOfAnimals: findHerdType.id, UserId: userId },
      include: { model: KindsOfAnimals, attributes: ["name"] },
      attributes: ["name", "creationDate"],
    });
    if (findHerd === null) {
      return null;
    }
    return findHerd;
  }
  return null;
}

module.exports = findHerdByAnimalType;
