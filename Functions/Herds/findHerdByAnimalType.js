async function findHerdByAnimalType(Herds, herdType, userId) {
  const findHerd = await Herds.findOne({
    where: { idKindOfAnimals: herdType, idUser: userId },
  });
  if (findHerd === null) {
    return null;
  }
  return findHerd;
}

module.exports = findHerdByAnimalType;
