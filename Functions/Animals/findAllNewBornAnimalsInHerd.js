async function findAllNewBornAnimalsInHerd(AnimalsBirths, herdId) {
  const search = await AnimalsBirths.findAll({
    raw: true,
    where: { idHerd: herdId },
    attributes: ["dateOfBirth", "identityNumber"],
  });
  if (search !== null && Object.keys(search).length !== 0) {
    return search;
  }
  return null;
}

module.exports = findAllNewBornAnimalsInHerd;
