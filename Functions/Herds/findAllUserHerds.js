async function findAllUserHerds(Herds, userId) {
  const findHerds = await Herds.findAll({
    where: { idUser: userId },
    attributes: ["name", "creationDate"],
  });
  if (findHerds !== null && Object.keys(findHerds) !== 0) {
    return findHerds;
  }
  return null;
}

module.exports = findAllUserHerds;
