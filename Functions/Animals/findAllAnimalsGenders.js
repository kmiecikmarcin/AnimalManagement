async function findAllAnimalsGenders(GenderOfAnimal) {
  const search = await GenderOfAnimal.findAll({
    attributes: ["name"],
  });
  if (search !== null) {
    return search;
  }
  return null;
}

module.exports = findAllAnimalsGenders;
