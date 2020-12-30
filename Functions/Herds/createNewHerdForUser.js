const KindsOfAnimals = require("../../Models/KindsOfAnimals");
const findKindOfAnimalsByName = require("../Animals/findKindOfAnimalsByName");
const findHerdByName = require("./findHerdByName");

async function createNewHerdForUser(
  Herds,
  herdName,
  creationDateFromUser,
  userId,
  herdType
) {
  const checkEnteredHerdTypeFromUser = await findKindOfAnimalsByName(
    KindsOfAnimals,
    herdType
  );
  if (checkEnteredHerdTypeFromUser !== null) {
    const checkHerd = await findHerdByName(Herds, herdType, userId);
    if (checkHerd === null) {
      const createNewHerd = await Herds.create({
        name: herdName,
        creationDate: creationDateFromUser,
        UserId: userId,
        KindsOfAnimalId: checkEnteredHerdTypeFromUser.id,
      });
      if (createNewHerd) {
        return createNewHerd;
      }
      return null;
    }
    return null;
  }
  return null;
}

module.exports = createNewHerdForUser;
