const findAnimalByHerdNameAndIdentityNumber = require("./findAnimalByHerdIdAndIdentityNumber");

async function changeLifeStatusOfAnimal(
  AnimalsInHerd,
  herdId,
  identityNumberOfAnimal
) {
  const findAnimal = await findAnimalByHerdNameAndIdentityNumber(
    AnimalsInHerd,
    herdId,
    identityNumberOfAnimal
  );
  if (findAnimal) {
    const updateLifeStatus = await AnimalsInHerd.update(
      { lifeStatusOfAnimal: false },
      { where: { HerdId: herdId, identityNumber: identityNumberOfAnimal } }
    );
    if (updateLifeStatus) {
      return updateLifeStatus;
    }
    return null;
  }
  return null;
}

module.exports = changeLifeStatusOfAnimal;
