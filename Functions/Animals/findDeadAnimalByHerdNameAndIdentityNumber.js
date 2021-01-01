async function findDeadAnimalByHerdNameAndIdentityNumber(
  AnimalsDeads,
  herdId,
  identityNumberOfAnimal
) {
  const findAnimal = await AnimalsDeads.findOne({
    where: {
      identityNumber: identityNumberOfAnimal,
      idHerd: herdId,
    },
    attributes: ["id", "identityNumber", "dateOfDeath", "description"],
  });
  if (findAnimal) {
    return findAnimal;
  }
  return null;
}

module.exports = findDeadAnimalByHerdNameAndIdentityNumber;
