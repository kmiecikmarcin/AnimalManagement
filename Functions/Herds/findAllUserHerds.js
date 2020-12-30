const KindsOfAnimals = require("../../Models/KindsOfAnimals");

async function findAllUserHerds(Herds, userId) {
  const findHerds = await Herds.findAll({
    where: { UserId: userId },
    include: { model: KindsOfAnimals, attributes: ["name"] },
    attributes: ["name", "creationDate"],
  });
  if (findHerds !== null && Object.keys(findHerds) !== 0) {
    return findHerds;
  }
  return null;
}

module.exports = findAllUserHerds;
