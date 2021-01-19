const KindsOfAnimals = require("../../Models/KindsOfAnimals");

async function findAllUserHerds(Herds, userId) {
  const findHerds = await Herds.findAll({
    raw: true,
    where: { UserId: userId },
    include: { model: KindsOfAnimals, attributes: ["name"] },
    attributes: ["name", "creationDate"],
  });
  if (findHerds !== null && Object.keys(findHerds) !== 0) {
    console.log(findHerds);
    return findHerds;
  }
  return null;
}

module.exports = findAllUserHerds;
