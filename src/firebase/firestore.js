import { firebaseApp } from "./firebase";
import Firebase from "firebase/app";

const firestore = Firebase.firestore();

const POSTS = "posts";
const PORTFOLIOS = "portfolios";

export default {
  getPosts() {
    return new Promise((resolve, reject) => {
      let posts = [];
      firestore
        .collection(POSTS)
        .orderBy("created_at", "desc")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            posts.push({
              id: doc.id,
              ...doc.data()
            });
          });
          resolve(posts);
        })
        .catch(err => reject(err));
    });
  },
  postPost(title, content) {
    return new Promise((resolve, reject) => {
      firestore
        .collection(POSTS)
        .add({
          title,
          content,
          created_at: Firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  deletePost(docID) {
    return new Promise((resolve, reject) => {
      firestore
        .collection(POSTS)
        .doc(docID)
        .delete()
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  updatePost(docID, title, content) {
    return new Promise((resolve, reject) => {
      firestore
        .collection(POSTS)
        .doc(docID)
        .update({
          title: title,
          content: content
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  getPortfolios() {
    return new Promise((resolve, reject) => {
      let portfolios = [];
      firestore
        .collection(PORTFOLIOS)
        .orderBy("created_at", "desc")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            portfolios.push({
              id: doc.id,
              ...doc.data()
            });
          });
          resolve(portfolios);
        })
        .catch(err => reject(err));
    });
  },
  postPortfolio(title, content, img) {
    return new Promise((resolve, reject) => {
      firestore
        .collection(PORTFOLIOS)
        .add({
          title,
          content,
          img,
          created_at: Firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  deletePortfolio(docID) {
    return new Promise((resolve, reject) => {
      firestore
        .collection(PORTFOLIOS)
        .doc(docID)
        .delete()
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  updatePortfolio(docID, title, content, img) {
    return new Promise((resolve, reject) => {
      firestore
        .collection(PORTFOLIOS)
        .doc(docID)
        .update({
          title,
          content,
          img
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  addLog(path, username, time) {
    let db = firebaseApp.database();
    let log = db.ref("LOG");
    log.push({
      path,
      username,
      time
    });
  },
  getLog() {
    return new Promise((resolve, reject) => {
      let data = [];
      let db = firebaseApp.database();
      let ref = db.ref("LOG").orderByChild("time");
      ref
        .once("value")
        .then(snapshot => {
          snapshot.forEach(function(childSnapshot) {
            data.push(childSnapshot.val());
          });
          resolve(data);
        })
        .catch(err => reject(err));
    });
  }
};
