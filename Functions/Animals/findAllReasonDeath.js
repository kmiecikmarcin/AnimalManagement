async function findAllReasonDeath(ReasonOfDeath) {
  const search = await ReasonOfDeath.findAll({
    attributes: ["description"],
  });
  if (search !== null && Object.keys(search) !== 0) {
    return search;
  }
  return null;
}

module.exports = findAllReasonDeath;
