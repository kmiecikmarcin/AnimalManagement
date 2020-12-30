const Herds = require("../../Models/Herds");
const AnimalsInHerd = require("../../Models/AnimalsInHerd");
const ReasonOfDeath = require("../../Models/ReasonOfDeath");
const findHerdByName = require("../Herds/findHerdByName");
const findAnimalByIdentityNumber = require("./findAnimalByIdentityNumber");
const findReasonOfDeathByName = require("./findReasonOfDeathByName");

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
    const checkIdentityNumberOfAnimal = await findAnimalByIdentityNumber(
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
          date: dateOfDeath,
          description: descriptionOfDeath,
          AnimalsInHerdId: checkIdentityNumberOfAnimal.id,
          ReasonOfDeathId: checkReasonOfDeath.id,
          HerdId: checkHerdName.id,
        });
        if (addNewDeadAnimal) {
          return addNewDeadAnimal;
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
