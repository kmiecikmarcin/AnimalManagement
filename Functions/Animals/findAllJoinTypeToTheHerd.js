async function findAllJoinTypeToTheHerd(TypesOfJoinToTheHerd) {
  const search = await TypesOfJoinToTheHerd.findAll({
    attributes: ["name"],
  });
  if (search !== null) {
    return search;
  }
  return null;
}

module.exports = findAllJoinTypeToTheHerd;
