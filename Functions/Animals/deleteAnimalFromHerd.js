async function deleteAnimalFromHerd(
  AnimalsInHerd,
  herdId,
  identityNumberOfAnimal
) {
  const deleteAnimal = await AnimalsInHerd.destroy({
    where: { identityNumber: identityNumberOfAnimal, HerdId: herdId },
  });
  if (deleteAnimal) {
    return deleteAnimal;
  }
  return null;
}

module.exports = deleteAnimalFromHerd;
