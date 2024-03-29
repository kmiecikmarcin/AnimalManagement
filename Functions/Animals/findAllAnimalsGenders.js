async function findAllAnimalsGenders(GenderOfAnimal) {
  const search = await GenderOfAnimal.findAll({
    raw: true,
    attributes: ["name"],
  });
  if (search !== null && Object.keys(search) !== 0) {
    return search;
  }
  return null;
}

module.exports = findAllAnimalsGenders;
