async function deleteAnimal(AnimalsInHerd, herdId, identityNumberOfAnimal) {
  const deleteAnimalByUser = await AnimalsInHerd.destroy({
    where: { identityNumber: identityNumberOfAnimal, HerdId: herdId },
  });
  if (deleteAnimalByUser) {
    return deleteAnimalByUser;
  }
  return null;
}

module.exports = deleteAnimal;
