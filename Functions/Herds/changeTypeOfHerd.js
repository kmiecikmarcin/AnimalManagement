async function changeTypeOfHerd(Herds, newTypeOfHerdId, userId) {
  const updateType = await Herds.update(
    { KindsOfAnimalId: newTypeOfHerdId },
    { where: { UserId: userId } }
  );
  if (updateType.includes(1)) {
    return updateType;
  }
  return null;
}

module.exports = changeTypeOfHerd;
