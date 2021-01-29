async function deleteTransactionAddedByUser(
  UserTransactions,
  transactionId,
  userId
) {
  const deleteUserTransaction = await UserTransactions.destroy({
    where: { idUserTransaction: transactionId, UserId: userId },
  });
  if (deleteUserTransaction) {
    return deleteUserTransaction;
  }
  return null;
}

module.exports = deleteTransactionAddedByUser;
