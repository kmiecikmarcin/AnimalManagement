async function findAllUserTransactions(UserTransactions, userId) {
  const findTransactions = await UserTransactions.findAll({
    where: { UserId: userId },
    attributes: { exclude: ["createdAt", "updatedAt", "UserId"] },
  });
  if (findTransactions) {
    return findTransactions;
  }
  return null;
}

module.exports = findAllUserTransactions;
