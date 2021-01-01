async function changeHerdName(Herds, oldHerdName, newHerdName, userId) {
  const updateHerdName = await Herds.update(
    { name: newHerdName },
    {
      where: {
        name: oldHerdName,
        UserId: userId,
      },
    }
  );

  if (updateHerdName.includes(1)) {
    return updateHerdName;
  }
  return null;
}

module.exports = changeHerdName;
