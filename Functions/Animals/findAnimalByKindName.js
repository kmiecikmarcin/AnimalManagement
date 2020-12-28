const findKindOfAnimalsByName = require("./findKindOfAnimalsByName");

async function findAnimalByKindName(
  AnimalsInHerd,
  KindsOfAnimals,
  kindOfAnimalName
) {
  const findKindOfAnimalName = await findKindOfAnimalsByName(
    KindsOfAnimals,
    kindOfAnimalName
  );
  if (findKindOfAnimalName) {
    const findAnimals = await AnimalsInHerd.findAll({
      where: { idKindOfAnimals: findKindOfAnimalName.id },
      attributes: [
        "identityNumber",
        "breed",
        "joinDate",
        "birthDate",
        "weight",
      ],
    });
    if (findAnimals === null) {
      return null;
    }
    return findAnimals;
  }
  return null;
}

module.exports = findAnimalByKindName;
