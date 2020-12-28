async function changeTypeOfHerd(Herds, newTypeOfHerdId, userId) {
  const updateType = await Herds.update(
    { idKindOfAnimals: newTypeOfHerdId },
    { where: { idUser: userId } }
  );
  if (updateType) {
    return updateType;
  }
  return null;
}

module.exports = changeTypeOfHerd;
