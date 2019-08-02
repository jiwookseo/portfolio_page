import dummy from "./dummy.json";
import "./firebase";
import firebase from "firebase/app";

const firestore = firebase.firestore();

export default {
  postDummy() {
    dummy.forEach(d => {
      firestore.collection(d.type).add({
        ...d.article,
        edited: false,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
      });
    });
  }
};
