import { cards } from "@flesh-and-blood/cards";
import { Card } from "@flesh-and-blood/types";
import { v4 as uuidv4 } from "uuid";
import EcoProxyCard from "./interfaces";
import Fuse from "fuse.js";

export class CardsDB {
  private static instance: CardsDB;
  private db: Fuse<Card>;
  public static cardMap = new Map<string, Card>(
    cards.map((card) => [card.cardIdentifier, card])
  );

  private constructor() {
    const index = Fuse.createIndex(["name", "setIdentifiers"], cards);
    this.db = new Fuse<Card>(
      Array.from(CardsDB.cardMap.values()),
      {
        findAllMatches: false,
        threshold: 0.2,
        // useExtendedSearch: true,
        shouldSort: true,
        sortFn: (a, b) => {
          if (a.item.name < b.item.name) {
            return -1;
          }
          if (a.item.name > b.item.name) {
            return 1;
          }
          return 0;
        },
        keys: ["name", "setIdentifiers", "cardIdentifier"],
      },
      index
    );
  }

  public static getInstance(): CardsDB {
    if (!CardsDB.instance) {
      CardsDB.instance = new CardsDB();
    }
    return CardsDB.instance;
  }

  public searchCards(query: string): Card[] {
    const parts = query.split(" ");
    const orQuery = parts.reduce((queryParts, part) => {
      return [...queryParts, { setIdentifiers: part }, { name: part }];
    }, [] as { [x: string]: string }[]);
    return this.db
      .search<Card>(
        {
          $and: [
            {
              $or: [
                // ...parts.map((part) => ({ setIdentifiers: part })),
                // ...parts.map((part) => ({ name: part })),
                ...orQuery,
              ],
            },
          ],
        },
        { limit: 20 }
      )
      .map((match) => match.item);
  }

  public getCardsFromQueryParams(key: string): EcoProxyCard[] {
    const search = window.location.search;
    let result: EcoProxyCard[] = [];
    if (search) {
      const qparams = new URLSearchParams(search);
      const ids = qparams.get(key);
      if (ids) {
        const setIds = ids.split(",");
        // create a map {SETID: num_to_print}
        const setIdCountMap = setIds.reduce((acc, id) => {
          if (!acc[id]) {
            return { ...acc, [id]: 1 };
          }
          return { ...acc, [id]: acc[id] + 1 };
        }, {} as { [x: string]: number });
        const countMapKeys = Object.keys(setIdCountMap);
        // creates fuse query
        const fuseQuery = setIds.map((id) => ({ setIdentifiers: id }));
        const matches = this.db.search<EcoProxyCard>({ $or: fuseQuery });
        // find and add to print, accounting for for multiple copies
        result = matches.reduce((res, match) => {
          const card = match.item;
          let found = false;
          let cardsToAdd: EcoProxyCard[] = [];
          for (let index = 0; index < countMapKeys.length && !found; index++) {
            const setId = countMapKeys[index];
            found = card.setIdentifiers.indexOf(setId) > -1;
            if (found) {
              const quantity = setIdCountMap[setId];
              for (let j = 0; j < quantity; j++) {
                cardsToAdd.push({ ...card, uuid: uuidv4() });
              }
            }
          }
          return [...res, ...cardsToAdd];
        }, [] as EcoProxyCard[]);
      }
    }
    return result.sort((a, b) => a.name.localeCompare(b.name));
  }

  public static getCardsFromList(list: string): {
    match: EcoProxyCard[];
    noMatch: string[];
  } {
    //matches something between ()
    const regExp = /\(([^)]+)\)/g;
    const rows = list.split("\n");
    const noMatch: string[] = [];
    const match = rows.reduce((cards, row) => {
      if (!row.match(regExp)) return cards;
      const elems = row
        .split(regExp)
        .filter((el) => el !== "")
        .map((el) => el.trim());
      const quantity = Number(elems[0]);
      const id = `${elems[1]
        .replace(/[^\w\s]/gi, "")
        .toLowerCase()
        .replaceAll(" ", "-")}${elems[2] ? `-${elems[2]}` : ""}`;
      const untouchedId = `${elems[1].replace(/[^\w\s]/gi, "")}${
        elems[2] ? ` ${elems[2]}` : ""
      }`;

      const finds: EcoProxyCard[] = [];
      if (CardsDB.cardMap.has(id)) {
        for (let index = 0; index < quantity; index++) {
          finds.push({
            ...(CardsDB.cardMap.get(id) as EcoProxyCard),
            uuid: uuidv4(),
          });
        }
      } else {
        noMatch.push(untouchedId);
      }
      return [...cards, ...finds];
    }, [] as EcoProxyCard[]);
    return { match, noMatch };
  }
}
