async function findHerdByAnimalType(KindOfAnimals, Herds, herdType, userId) {
  const findHerdType = await KindOfAnimals.findOne({
    where: { name: herdType },
  });
  if (findHerdType != null) {
    const findHerd = await Herds.findOne({
      where: { idKindOfAnimals: findHerdType.id, idUser: userId },
    });
    if (findHerd === null) {
      return null;
    }
    return findHerd;
  }
  return null;
}

module.exports = findHerdByAnimalType;
