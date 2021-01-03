const AnimalsInHerd = require("../../Models/AnimalsInHerd");
const ReasonOfDeath = require("../../Models/ReasonOfDeath");
const findAnimalByHerdNameAndIdentityNumber = require("./findAnimalByHerdIdAndIdentityNumber");
const findReasonOfDeathByName = require("./findReasonOfDeathByName");
const changeLifeStatusOfAnimal = require("./changeLifeStatusOfAnimal");

async function createNewDeadAnimal(
  res,
  AnimalsDeads,
  herdId,
  identityNumberOfAnimal,
  dateOfDeath,
  reasonDeath,
  descriptionOfDeath
) {
  const checkIdentityNumberOfAnimal = await findAnimalByHerdNameAndIdentityNumber(
    AnimalsInHerd,
    herdId,
    identityNumberOfAnimal
  );
  if (checkIdentityNumberOfAnimal) {
    const checkReasonOfDeath = await findReasonOfDeathByName(
      ReasonOfDeath,
      reasonDeath
    );
    if (checkReasonOfDeath) {
      const addNewDeadAnimal = AnimalsDeads.create({
        identityNumber: checkIdentityNumberOfAnimal.identityNumber,
        date: dateOfDeath,
        description: descriptionOfDeath,
        ReasonOfDeathId: checkReasonOfDeath.id,
        HerdId: herdId,
      });
      if (addNewDeadAnimal) {
        const changeLifeStatus = await changeLifeStatusOfAnimal(
          AnimalsInHerd,
          herdId,
          checkIdentityNumberOfAnimal.identityNumber
        );
        if (changeLifeStatus) {
          return changeLifeStatus;
        }
        return null;
      }
      return null;
    }
    return res
      .status(404)
      .json({ Error: "Wprowadzona przyczyna śmierci jest nieprawidłowa!" });
  }
  return res.status(404).json({
    Error: "Zwierzę numerze identyfikacyjnym nie istnieje!",
  });
}

module.exports = createNewDeadAnimal;
