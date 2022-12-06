export function getCardTextFromCSV(card) {
  // Now we parse text from csv into somethng we can render as html
  // without dangersourlySetInnerHTML.
  // ** ** is bold text, * * is italic, /n is newline
  //We initially split on /n to create all the text lines
  const chunks = card["Functional Text"].split("\n");
  const parsedResult = chunks.map((chunk, i) => {
    const reB = /\*\*(.*?)\*\*/g;
    const reI = /\*(.*?)\*/g;
    const boldmatch = chunk.match(reB);
    const splits = chunk.split(reB);
    const strippedBold = boldmatch
      ? boldmatch.map((b) => b.replaceAll("**", ""))
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
          ? italicmatch.map((b) => b.replaceAll("*", ""))
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

  return parsedResult;
}
