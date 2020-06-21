const fetch = require("node-fetch");
const cheerio = require("cheerio");
 async function data(word) {
  let data = await fetch(
    `https://www.m-translate.com.ua/en-uk/word-${word}-translation`
  );
  let html = await data.text();

  const $ = cheerio.load(html, { decodeEntities: false });

  let translate = $(".to_w").text();
  let transcription = $(".transcription").text();

  // let allwards=$('.word_block ul').html()
  // console.log( cheerio.html($('.word_block ul')))

  let nameSynonim = [];
  let verbs = [];
  let nouns = [];
  let = others = [];

  let examples = $(".examples").text();

  let date = $(".variants.word_block")
    .children()
    .each(function (i, el) {
      if ($(el)[0].name === "b") {
        nameSynonim.push(
          $(el).text().trim().split("\n\n").join("\n").split("\n")
        );
      }
      if ($(el)[0].name === "ul" && i == 3) {
        verbs.push(
          $(el).children().text().trim().split("\n\n").join("\n").split("\n")
        );
      } else if ($(el)[0].name === "ul" && i == 6) {
        nouns.push(
          $(el).children().text().trim().split("\n\n").join("\n").split("\n")
        );
      } else if ($(el)[0].name === "ul" && i == 9) {
        others.push(
          $(el).children().text().trim().split("\n\n").join("\n").split("\n")
        );
      }
    })
    .get();

  let prepareForRender = function (arg) {
    let flat = arg[0];
    let allWords = {};
    var verbName = "";

    for (let i = 0; i < flat.length; i++) {
      if (!flat[i]) {
        continue;
      }
      if (flat[i].codePointAt(0) >= 1072 && flat[i].codePointAt(0) <= 1103) {
        allWords[flat[i]] = [];
        verbName = flat[i];
      } else allWords[verbName].push(flat[i]);
    }
    return allWords;
  };

  let allVerbs = prepareForRender(verbs);
  let allNoun = nouns.length !== 0 ? prepareForRender(nouns) : false;
  let otherWords = others.length !== 0 ? prepareForRender(others) : false;

  let allSynonim = [];
  allSynonim.push(allVerbs);
  allSynonim.push(allNoun);
  allSynonim.push(otherWords);

  let resultAllSynonim = allSynonim.filter((elem, i) => elem !== false);

  let contextExamples = examples
    .trim()
    .split("\n\n")
    .join("\n")
    .split("\n")
    .filter((elem, i) => {
      if (elem == ""||i==0) {
        return false;
      } else return elem;
    });
  contextExamples.pop();

  contextExamples = contextExamples.map((elem, i) => {
    let result = elem.charAt(0).toUpperCase() + elem.slice(1);
    return result;
  });
  // result=result.map((elem,i)=>{ elem[0].toUpperCase()
  // return elem})
 
  return {'translate':translate,"transcript":transcription,"allExamples":contextExamples,"allSynonim":resultAllSynonim,"allNames":nameSynonim}
}


module.exports=data













