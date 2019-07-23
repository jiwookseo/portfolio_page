import axios from "axios";

const translateURL =
  "https://us-central1-test-68bfc.cloudfunctions.net/translate";

const translateText = function(source, target, text) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${translateURL}?text=${text}&source=${source}&target=${target}`)
      .then(res => {
        resolve({ translatedText: res.data.message.result.translatedText });
      })
      .catch(err => reject(err));
  });
};

export default translateText;
