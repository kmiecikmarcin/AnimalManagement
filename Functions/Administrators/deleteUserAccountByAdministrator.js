async function deleteUserAccountByAdministrator(
  res,
  Users,
  administratorPermission,
  userId,
  userEmail
) {
  if (administratorPermission === process.env.S3_PERMISSION) {
    const deleteUserAccount = await Users.destroy({
      where: { id: userId, email: userEmail },
    });
    if (deleteUserAccount) {
      return deleteUserAccount;
    }
    return res
      .status(400)
      .json({ Error: "Nie udało się usunąć wybranych danych!" });
  }
  return null;
}

module.exports = deleteUserAccountByAdministrator;
