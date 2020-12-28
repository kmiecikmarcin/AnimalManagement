async function findAllUserHerds(Herds, userId) {
  const findHerds = await Herds.findAll({
    where: { idUser: userId },
    attributes: ["id", "name"],
  });
  if (findHerds !== null) {
    return findHerds;
  }
  return null;
}

module.exports = findAllUserHerds;
