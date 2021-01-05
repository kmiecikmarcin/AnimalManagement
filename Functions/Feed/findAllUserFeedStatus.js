const SpeciesOfFeeds = require("../../Models/SpeciesOfFeeds");

async function findAllUserFeedStatus(PurchasedFeedForHerd) {
  const search = await PurchasedFeedForHerd.findAll({
    attributes: ["identityNumber", "quantity", "currentQuantity", "date"],
    include: [{ model: SpeciesOfFeeds, attributes: ["name"] }],
  });
  if (search !== null && Object.keys(search) !== 0) {
    return search;
  }
  return null;
}

module.exports = findAllUserFeedStatus;
