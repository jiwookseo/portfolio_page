import { type } from "os";

const gcTranslate = async (text, target = "en") => {
  // Imports the Google Cloud client library
  const { Translate } = require("@google-cloud/translate");

  // Creates a client
  const translate = new Translate();

  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  console.log("Translations:");
  translations.forEach((translation, i) => {
    console.log(`${text[i]} => (${target}) ${translation}`);
  });
  return translations;
};
export default gcTranslate;
