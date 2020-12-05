async function findHerdByName(Herds, herdType, userId) {
  const findHerd = await Herds.findOne({
    where: { name: herdType, idUser: userId },
  });
  if (findHerd === null) {
    return null;
  }
  return findHerd;
}

module.exports = findHerdByName;
