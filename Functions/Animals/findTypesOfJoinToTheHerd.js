async function findTypesOfJoinToTheHerd(TypesOfJoinToTheHerd, joinTypeName) {
  const search = await TypesOfJoinToTheHerd.findOne({
    where: { name: joinTypeName },
  });
  if (search !== null) {
    return search;
  }
  return null;
}

module.exports = findTypesOfJoinToTheHerd;
