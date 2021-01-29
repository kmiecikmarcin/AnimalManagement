async function findAllReasonDeath(ReasonOfDeath) {
  const search = await ReasonOfDeath.findAll({
    raw: true,
    attributes: ["name"],
  });
  if (search !== null && Object.keys(search) !== 0) {
    return search;
  }
  return null;
}

module.exports = findAllReasonDeath;
