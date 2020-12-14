async function findHerdByName(Herds, herdName, userId) {
  const findHerd = await Herds.findOne({
    where: { name: herdName, idUser: userId },
  });
  if (findHerd === null) {
    return null;
  }
  return findHerd;
}

module.exports = findHerdByName;
