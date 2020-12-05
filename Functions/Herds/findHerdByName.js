async function findHerdByName(Herds, herdType, userId) {
  const findHerd = await Herds.findOne({
    where: { name: herdType, idUser: userId },
  });
  if (findHerd === null) {
    return true;
  }
  return false;
}

module.exports = findHerdByName;
