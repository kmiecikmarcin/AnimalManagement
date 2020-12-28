async function findAllUserHerds(Herds) {
  const findHerds = await Herds.findAll({
    attributes: ["name"],
  });
  if (findHerds !== null) {
    return findHerds;
  }
  return null;
}

module.exports = findAllUserHerds;
