const gcTranslate = async () => {
  // Imports the Google Cloud client library
  const { Translate } = require("@google-cloud/translate");

  // Creates a client
  const translate = new Translate();

  const text = [
    "안녕하세요. 저는 Python 과 Node.js 를 주로 사용하는 서지욱이라고 합니다."
  ];
  const target = "en";

  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  console.log("Translations:");
  translations.forEach((translation, i) => {
    console.log(`${text[i]} => (${target}) ${translation}`);
  });
};
gcTranslate();
