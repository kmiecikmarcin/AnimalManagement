const arrayWithReasonsOfDeath = ["Ubój", "Choroba", "Przyczyna naturalna"];

const findReasonOfDeathByName = require("../Animals/findReasonOfDeathByName");

function fillDataForReasonOfDeath(ReasonOfDeath) {
  for (let i = 0; i < arrayWithReasonsOfDeath.length; i++) {
    findReasonOfDeathByName(ReasonOfDeath, arrayWithReasonsOfDeath[i])
      .then((reasonOfDeath) => {
        if (reasonOfDeath === null) {
          ReasonOfDeath.create({
            description: arrayWithReasonsOfDeath[i],
          }).catch((error) => {
            throw new Error(error);
          });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}

module.exports = fillDataForReasonOfDeath;
