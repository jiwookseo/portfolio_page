import firebase from "firebase";
import axios from "axios";
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
  },
  pushMessage() {
    axios
      .post(
        "https://fcm.googleapis.com/fcm/send", {
          to: "fyjfGNIHCNw:APA91bF57ChQiNNAu-RPGG5nKdaVuGJJwRGbrDLzKhuSPTYuV3v1DJL2Nq3_iS86RbZtXczmK9HIMRNt_BnJ253Bz4Z2fdhtxNhJ0f-k542e095jxLiB27N1WiYfORR3M8uXKHTPeQM4",
          notification: {
            title: "test",
            body: "test"
          }
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "key=AAAAMFkjNys:APA91bGdpabEB2sSOHZu8yLpt1gnIWeeqKPtTrjCVgO-f5Kv2CDu9-olA11IvSxqANaY6GWFNl68XmzIvg5tX4SzPb5PU2P6v05TIuvJGPkuOP0gZzQvlXIZU8YxKB8_dToy_JOFrB9P"
          }
        }
      )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
};