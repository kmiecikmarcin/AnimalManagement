const Herds = require("../../Models/Herds");

async function findAllNewDeadAnimalsInHerd(AnimalsDeads, herdId) {
  const search = await AnimalsDeads.findAll({
    raw: true,
    where: { idHerd: herdId },
    include: [{ model: Herds, attributes: ["name"] }],
    attributes: ["date", "description"],
  });
  if (search !== null && Object.keys(search).length !== 0) {
    return search;
  }
  return null;
}

module.exports = findAllNewDeadAnimalsInHerd;
