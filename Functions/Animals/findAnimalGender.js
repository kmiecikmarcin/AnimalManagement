async function findAnimalGender(GenderOfAnimal, animalGender) {
  const checkAnimalGender = await GenderOfAnimal.findOne({
    where: { name: animalGender },
  });
  if (checkAnimalGender) {
    return checkAnimalGender;
  }
  return null;
}

module.exports = findAnimalGender;
