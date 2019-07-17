import { firebaseApp } from "./firebase";
import Firebase from "firebase/app";

const firestore = Firebase.firestore();

const POSTS = "posts";
const PORTFOLIOS = "portfolios";

export default {
  async getPosts() {
    let posts = [];
    let snapshot = await firestore
      .collection(POSTS)
      .orderBy("created_at", "desc")
      .get();
    snapshot.docs.forEach(doc => {
      posts.push({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        created_at: doc.data().created_at
      });
    });
    return posts;
  },
  async postPost(title, content) {
    await firestore.collection(POSTS).add({
      title,
      content,
      created_at: Firebase.firestore.FieldValue.serverTimestamp()
    });
  },
  async deletePost(docID) {
    await firestore
      .collection(POSTS)
      .doc(docID)
      .delete();
  },
  async updatePost(docID, title, content) {
    await firestore
      .collection(POSTS)
      .doc(docID)
      .update({
        title: title,
        content: content
      });
  },
  async getPortfolios() {
    let portfolios = [];
    let snapshot = await firestore
      .collection(PORTFOLIOS)
      .orderBy("created_at", "desc")
      .get();
    snapshot.docs.forEach(doc => {
      portfolios.push({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        img: doc.data().img,
        created_at: doc.data().created_at
      });
    });
    return portfolios;
  },
  async postPortfolio(title, content, img) {
    await firestore.collection(PORTFOLIOS).add({
      title,
      content,
      img,
      created_at: Firebase.firestore.FieldValue.serverTimestamp()
    });
  },
  async deletePortfolio(docID) {
    await firestore
      .collection(PORTFOLIOS)
      .doc(docID)
      .delete();
  },
  async updatePortfolio(docID, title, content, img) {
    await firestore
      .collection(PORTFOLIOS)
      .doc(docID)
      .update({
        title: title,
        content: content,
        img: img
      });
  },
  logView(user, id, path, time) {
    db.ref("LOG/" + user).set({
      userId: id,
      path: path,
      time: time
    });
  },
  addLog(path, username, time) {
    let db = firebaseApp.database();
    let log = db.ref("LOG");
    log.push({
      path: path,
      username: username,
      time: time
    });
  },
  async getLog() {
    let data = [];

    let db = await firebaseApp.database();
    var ind = 0
    let ref = db.ref("LOG").orderByChild("time");
    ref.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        // console.log(childSnapshot.val().path);
        data.push(
          {
            path : childSnapshot.val().path,
            username : childSnapshot.val().username,
            time : childSnapshot.val().time,
          }
        );
        ind ++;
      });
    });
    return data;
  }
};
