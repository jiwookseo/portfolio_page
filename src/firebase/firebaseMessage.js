import firebase from "firebase";
const messaging = firebase.messaging();
messaging.usePublicVapidKey(
  "BBBpw-_z752QFHrMQElXJSrxpEB8_vKtiKUgD6sQvuuIbLSS5odGEeh--BzMYSqxYw3ikgePoUgQKPFJK1ed9D0"
);

export default {
  getNewToken() {
    return new Promise(resolve => {
      messaging
        .requestPermission()
        .then(() => {
          messaging
            .getToken()
            .then(token => resolve(token))
            .catch(() => resolve(null));
        })
        .catch(() => {
          console.log("Unable to get permission to notify.");
          resolve(null);
        });
    });
  }
};
