async function findReasonOfDeathByName(ReasonOfDeath, reasonOfDeathName) {
  const search = await ReasonOfDeath.findOne({
    where: { name: reasonOfDeathName },
  });
  if (search !== null) {
    return search;
  }
  return null;
}

module.exports = findReasonOfDeathByName;
