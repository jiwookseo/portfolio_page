import axios from "axios";

const translateURL =
  "https://us-central1-test-68bfc.cloudfunctions.net/translate";

const translateDOM = function(source, target, textDOMs) {
  return new Promise(resolve => {
    const originalText = [];
    const translatedText = Array(textDOMs.length);
    textDOMs.forEach(dom => originalText.push(dom.innerText));
    let counter = 0;
    textDOMs.forEach((dom, i) => {
      axios
        .get(
          `${translateURL}?text=${
            originalText[i]
          }&source=${source}&target=${target}`
        )
        .then(res => {
          translatedText[target][i] = res.data.message.result.translatedText;
        })
        .then(() => {
          dom.innerText = translatedText[target][i];
          counter++;
          if (counter === textDOMs.length) {
            resolve({
              originalText,
              translatedText
            });
          }
        })
        .catch(() => {
          counter++;
          if (counter === textDOMs.length) {
            resolve({
              originalText,
              translatedText
            });
          }
        });
    });
  });
};

export default translateDOM;
