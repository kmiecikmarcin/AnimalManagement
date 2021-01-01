async function findAllJoinTypeToTheHerd(TypesOfJoinToTheHerd) {
  const search = await TypesOfJoinToTheHerd.findAll({
    attributes: ["name"],
  });
  if (search !== null && Object.keys(search) !== 0) {
    return search;
  }
  return null;
}

module.exports = findAllJoinTypeToTheHerd;
