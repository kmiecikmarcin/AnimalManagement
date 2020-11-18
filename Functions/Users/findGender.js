async function findGender(Gender, genderFromUser) {
  const findGenderForUser = await Gender.findOne({
    where: { name: genderFromUser },
  });
  if (findGenderForUser == null) {
    return null;
  }
  return findGenderForUser;
}

module.exports = findGender;
