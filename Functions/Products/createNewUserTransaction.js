async function createNewUserTransaction(
  UserTransactions,
  identityNumberOfTransaction,
  dateOfSoldProduct,
  userId
) {
  const addNewtransaction = await UserTransactions.create({
    identityNumber: identityNumberOfTransaction,
    date: dateOfSoldProduct,
    UserId: userId,
  });
  if (addNewtransaction) {
    return addNewtransaction;
  }
  return null;
}

module.exports = createNewUserTransaction;
