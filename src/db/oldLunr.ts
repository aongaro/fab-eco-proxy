import lunr from "lunr";
import { cards } from "@flesh-and-blood/cards";
import { v4 as uuidv4 } from "uuid";
import EcoProxyCard from "./interfaces";
import sortBy from "lodash/sortBy";

export const cardDB = lunr(function () {
  this.pipeline.remove(lunr.stemmer);
  this.pipeline.remove(lunr.stopWordFilter);
  this.searchPipeline.remove(lunr.stemmer);
  this.searchPipeline.remove(lunr.stopWordFilter);

  this.ref("cardIdentifier");
  this.field("name");
  this.field("setIdentifiers");
  this.field("sets");

  cards.forEach((card) => {
    this.add(card);
  }, this);
});

export const cardMap: { [x: string]: EcoProxyCard } = cards.reduce(
  (obj, item) => {
    return {
      ...obj,
      [item.cardIdentifier]: { ...item },
    };
  },
  {}
);

export const cardsFromQueryParamsList = (key: string): EcoProxyCard[] => {
  const search = window.location.search;

  const res: EcoProxyCard[] = [];
  if (search) {
    const qparams = new URLSearchParams(search);
    const ids = qparams.get(key);
    if (ids) {
      //This will search also in set identifiers
      // with lunr query sintax
      const qres = cardDB.search(ids.replaceAll(",", " "));
      const values = ids.split(",");
      // create a map {SETID: num_to_print}
      const idCountMap = values.reduce((acc, id) => {
        if (!acc[id]) {
          return { ...acc, [id]: 1 };
        }
        return { ...acc, [id]: acc[id] + 1 };
      }, {} as { [x: string]: number });
      const countMapKeys = Object.keys(idCountMap);
      qres.map((r) => {
        if (cardMap[r.ref]) {
          let found = false;
          // Match metadata keys should be the matched setIdentifier
          // i.e. fab001 in lower case
          const matchKeys = Object.keys(r.matchData.metadata);
          // find and add to print, taking account for multiple copies
          for (let i = 0; i < countMapKeys.length && !found; i++) {
            if (matchKeys.indexOf(countMapKeys[i].toLowerCase()) !== -1) {
              found = true;
              const repeat = idCountMap[countMapKeys[i]];
              for (let j = 0; j < repeat; j++) {
                res.push({ ...cardMap[r.ref], uuid: uuidv4() });
              }
            }
          }
        }
        return r;
      });
    }
  }
  return sortBy(res, [(card) => card.name]);
};
