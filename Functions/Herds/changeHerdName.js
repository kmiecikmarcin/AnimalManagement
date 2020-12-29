async function changeHerdName(Herds, newHerdName, userId) {
  const updateHerdName = await Herds.update(
    { name: newHerdName },
    { where: { idUser: userId } }
  );
  if (updateHerdName.includes(1)) {
    return updateHerdName;
  }
  return null;
}

module.exports = changeHerdName;
