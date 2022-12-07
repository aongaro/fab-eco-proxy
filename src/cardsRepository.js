import lunr from "lunr";
import cards from "./converted.json";

export const cardDB = lunr(function () {
  this.pipeline.remove(lunr.stemmer);
  this.pipeline.remove(lunr.stopWordFilter);
  this.searchPipeline.remove(lunr.stemmer);
  this.searchPipeline.remove(lunr.stopWordFilter);

  this.ref("id");
  this.field("name");
  this.field("set_identifiers");
  this.field("identifiers");

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
