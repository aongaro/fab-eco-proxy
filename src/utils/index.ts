import EcoProxyCard from "../db/interfaces";

export const getCardsQuantityById = (cards: EcoProxyCard[]) =>
  cards.reduce((res, card) => {
    let quantity = 0;
    if (res[card.cardIdentifier]) {
      quantity += res[card.cardIdentifier].count;
    }
    return { ...res, [card.cardIdentifier]: { count: quantity + 1, card } };
  }, {} as { [x: string]: { card: EcoProxyCard; count: number } });

// export const symbolsToImage = (text: string) => {
// 	const regExp = /\{([^)]+)\}/g;
// 	const matches = text.matchAll(regExp);
// 	let x = matches.next();
// 	while (!x.done) {
// 		const value = x.value;
// 		value.
// 	}
// }
