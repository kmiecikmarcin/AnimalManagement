async function findHerdByName(Herds, herdName, userId) {
  const findHerd = await Herds.findOne({
    where: { name: herdName, UserId: userId },
  });
  if (findHerd === null) {
    return null;
  }
  return findHerd;
}

module.exports = findHerdByName;
