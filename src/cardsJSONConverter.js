const fs = require("fs/promises");
const csv = require("csvtojson");

function getCardText(functionalText) {
  // Now we parse text from csv into somethng we can render as html
  // without dangersourlySetInnerHTML.
  // ** ** is bold text, * * is italic, /n is newline
  //We initially split on /n to create all the text lines
  const chunks = functionalText.split("\n");
  const parsedResult = chunks.map((chunk, i) => {
    const reB = /\*\*(.*?)\*\*/g;
    const reI = /\*(.*?)\*/g;
    const reS = /\*\*/g;
    const reSI = /\*/g;
    const boldmatch = chunk.match(reB);
    const splits = chunk.split(reB);
    const strippedBold = boldmatch
      ? boldmatch.map((b) => b.replace(reS, ""))
      : [];
    const returning = [];
    splits.map((sp) => {
      sp.replace("\n", "");
      if (strippedBold.length > 0 && strippedBold.indexOf(sp) !== -1) {
        returning.push({ strong: true, italic: false, text: sp.trim() });
      } else if (sp.indexOf("*") !== -1) {
        const italicmatch = sp.match(reI);
        const split = sp.split(reI);
        const strippeditalic = italicmatch
          ? italicmatch.map((b) => b.replace(reSI, ""))
          : [];
        split.map((s) => {
          if (strippeditalic.length > 0 && strippeditalic.indexOf(s) !== -1) {
            returning.push({ italic: true, strong: false, text: s.trim() });
          } else {
            if (s !== "")
              returning.push({ strong: false, italic: false, text: s.trim() });
          }
          return s;
        });
        return { strong: false, italic: true, text: sp };
      } else {
        if (sp !== "")
          returning.push({ strong: false, italic: false, text: sp.trim() });
      }
      return sp;
    });
    return returning;
  });

  return parsedResult.filter((r) => r.length > 0);
}

function fixNums(card) {
  if (card.pitch === "") {
    delete card.pitch;
  } else {
    card.pitch = Number(card.pitch);
  }
  if (card.cost === "") {
    delete card.cost;
  } else {
    card.cost = Number(card.cost);
  }
  if (card.power === "") {
    delete card.power;
  } else {
    card.power = Number(card.power);
  }
  if (card.defense === "") {
    delete card.defense;
  } else {
    card.defense = Number(card.defense);
  }
  if (card.health === "") {
    delete card.health;
  } else {
    card.health = Number(card.health);
  }
  if (card.intelligence === "") {
    delete card.intelligence;
  } else {
    card.intelligence = Number(card.intelligence);
  }
}

function fixList(stringList) {
  const reSpace = /\s/g;
  return stringList.length > 0
    ? stringList.replace(reSpace, "").split(",")
    : [];
}

function formatCard(card, cards) {
  const result = {};
  const keys = Object.keys(card);
  for (var i = 0; i < keys.length; i++) {
    const key = keys[i];
    const splits = key.split(" ");
    const formattedKey = splits.map((s) => s.toLowerCase()).join("_");
    result[formattedKey] = card[key];
  }
  const reSpace = /\s/g;
  //   const reComma = /,/g;
  const reImage = /https.{1,}\.png/g;
  result.identifiers = result.identifiers.replace(reSpace, "").split(",");
  result.set_identifiers = result.set_identifiers
    .replace(reSpace, "")
    .split(",");
  result.rarity = result.rarity.replace(reSpace, "").split(",");
  result.types = result.types.replace(reSpace, "").split(",");
  result.card_keywords = fixList(result.card_keywords);
  result.granted_keywords = fixList(result.granted_keywords);
  result.abilities_and_effects = fixList(result.abilities_and_effects);
  result.ability_and_effect_keywords = fixList(
    result.ability_and_effect_keywords
  );

  const id = result.identifiers.join("-");
  //check if we have a flip card here
  result.id = cards[id] ? `${id}F` : id;
  const splits = result.image_urls.split(",");
  const imgMatches = splits[0].match(reImage);
  if (imgMatches) {
    result.img_url = imgMatches[0];
  }
  delete result.image_urls;
  result.functional_text = getCardText(result.functional_text);
  fixNums(result);
  delete result.field38;
  delete result.field39;
  delete result.field40;
  delete result.variations;
  return result;
}

async function main() {
  try {
    // csvToJson
    //   .fieldDelimiter("\t")
    //   .generateJsonFileFromCsv("card.csv", "testingcsv.json");
    const cards = await csv({
      delimiter: "\t",
      quote: '"',
    }).fromFile("card.csv");
    //await fs.writeFile("testingcsv.json", JSON.stringify(jsonArray));
    // const raw = await fs.readFile("csvjson.json");
    // const cards = JSON.parse(raw);
    console.log("CONVERTING CSV...");
    const content = cards.map((card) => formatCard(card, cards));
    await fs.writeFile("converted.json", JSON.stringify(content));
    console.log("CARDS CONVERTED!");
  } catch (err) {
    console.log(err);
  }
}
main();
