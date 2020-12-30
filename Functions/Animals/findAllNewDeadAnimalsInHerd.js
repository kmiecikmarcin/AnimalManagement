const AnimalsInHerd = require("../../Models/AnimalsInHerd");

async function findAllNewDeadAnimalsInHerd(AnimalsDeads, herdId) {
  const search = await AnimalsDeads.findAll({
    raw: true,
    where: { idHerd: herdId },
    include: { model: AnimalsInHerd, attributes: ["identityNumber"] },
    attributes: ["date", "description"],
  });
  if (search !== null && Object.keys(search).length !== 0) {
    return search;
  }
  return null;
}

module.exports = findAllNewDeadAnimalsInHerd;
