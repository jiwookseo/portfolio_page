import dummy from "./dummy.json";
import Firebase from "firebase/app";

const firestore = Firebase.firestore();


export default {
  postDummy() {
    dummy.forEach(d => {
      firestore
        .collection(d.type)
        .add({
          ...d.article,
          edited: false,
          created_at: Firebase.firestore.FieldValue.serverTimestamp()
        })
    });
  }
}