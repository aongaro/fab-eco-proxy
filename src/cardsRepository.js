import lunr from "lunr";
import cards from "./converted.json";

// const cards = reduce(
//   cardsJSON,
//   (res, card) => {
//     const ids = card["Identifiers"].split(" ");
//     const setIds = card["Set Identifiers"].split(" ");
//     const imgs = card["Image URLs"].split(" ");
//     const id = res[ids[0].replace(",", "")]
//       ? `${ids[0].replace(",", "")}F`
//       : ids[0].replace(",", "");
//     return [
//       ...res,
//       {
//         ...card,
//         id,
//         imgUrl: imgs[0].replace(",", ""),
//         ed: setIds.map((id) => id.replace(",", "")),
//       },
//     ];
//   },
//   []
// );

export const cardDB = lunr(function () {
  this.pipeline.remove(lunr.stemmer);
  this.pipeline.remove(lunr.stopWordFilter);
  this.searchPipeline.remove(lunr.stemmer);
  this.searchPipeline.remove(lunr.stopWordFilter);

  this.ref("id");
  this.field("name");
  this.field("set_identifiers");

  cards.forEach(function (card) {
    this.add(card);
  }, this);
});

export const cardMap = cards.reduce((obj, item) => {
  return {
    ...obj,
    [item.id]: { ...item },
  };
}, {});
