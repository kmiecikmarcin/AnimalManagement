async function findAllUserHerds(Herds) {
  const findHerds = await Herds.findAll({
    attributes: ["id", "name", "creationDate"],
  });
  if (findHerds !== null) {
    return findHerds;
  }
  return null;
}

module.exports = findAllUserHerds;
