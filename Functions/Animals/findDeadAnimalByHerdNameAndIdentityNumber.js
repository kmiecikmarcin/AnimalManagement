async function findDeadAnimalByHerdNameAndIdentityNumber(
  AnimalsDeads,
  herdId,
  identityNumberOfAnimal
) {
  const findAnimal = await AnimalsDeads.findOne({
    where: {
      idHerd: herdId,
      identityNumber: identityNumberOfAnimal,
    },
    attributes: ["id", "dateOfDeath", "description"],
  });
  if (findAnimal) {
    return findAnimal;
  }
  return null;
}

module.exports = findDeadAnimalByHerdNameAndIdentityNumber;
