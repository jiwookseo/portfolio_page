import axios from "axios";

import "./firebase";
import firebase from "firebase/app";
import "firebase/messaging";
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
          // console.log("Unable to get permission to notify.");
          resolve(null);
        });
    });
  },
  pushMessage(userToken, title, body) {
    axios
      .post(
        "https://fcm.googleapis.com/fcm/send", {
          to: userToken,
          notification: {
            title: title,
            body: body,
            icon: "./img/icons/logo.png"
          }
        }, {
          headers: {
            "Content-Type": "application/json;charset=ms949",
            Authorization: "key=AAAAMFkjNys:APA91bGdpabEB2sSOHZu8yLpt1gnIWeeqKPtTrjCVgO-f5Kv2CDu9-olA11IvSxqANaY6GWFNl68XmzIvg5tX4SzPb5PU2P6v05TIuvJGPkuOP0gZzQvlXIZU8YxKB8_dToy_JOFrB9P"
          }
        }
      )
      .then(res => res)
      .catch(err => err);
  }
};