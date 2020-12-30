const Herds = require("../../Models/Herds");
const AnimalsInHerd = require("../../Models/AnimalsInHerd");
const ReasonOfDeath = require("../../Models/ReasonOfDeath");
const findHerdByName = require("../Herds/findHerdByName");
const findAnimalByHerdNameAndIdentityNumber = require("./findAnimalByHerdIdAndIdentityNumber");
const findReasonOfDeathByName = require("./findReasonOfDeathByName");
const changeLifeStatusOfAnimal = require("./changeLifeStatusOfAnimal");

async function createNewDeadAnimal(
  res,
  AnimalsDeads,
  userId,
  herdName,
  identityNumberOfAnimal,
  dateOfDeath,
  reasonDeath,
  descriptionOfDeath
) {
  const checkHerdName = await findHerdByName(Herds, herdName, userId);
  if (checkHerdName) {
    const checkIdentityNumberOfAnimal = await findAnimalByHerdNameAndIdentityNumber(
      AnimalsInHerd,
      checkHerdName.id,
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
          AnimalsInHerdId: checkIdentityNumberOfAnimal.id,
          ReasonOfDeathId: checkReasonOfDeath.id,
          HerdId: checkHerdName.id,
        });
        if (addNewDeadAnimal) {
          const changeLifeStatus = await changeLifeStatusOfAnimal(
            AnimalsInHerd,
            checkHerdName.id,
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
  return res
    .status(400)
    .json({ Error: "Hodowla o wprowadzonej nazwie nie istnieje!" });
}

module.exports = createNewDeadAnimal;
