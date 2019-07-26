import { firebaseApp } from "./firebase";
import Firebase from "firebase/app";

const firestore = Firebase.firestore();
const POSTS = "posts";
const PORTFOLIOS = "portfolios";
const USERS = "users";
const COMMENTS = "comments";

firestore.enablePersistence();
// .catch(err => {
//   if (err.code == "failed-precondition") {
//     console.log("Persistence can only be enabled in one tab at a time.");
//   } else if (err.code == "unimplemented ") {
//     console.log(
//       "The current browser does not support all of the features required to enable persistence."
//     );
//   }
// })

export default {
  // User
  postUser(email, authority) {
    return new Promise((resolve, reject) => {
      firestore
        .collection(USERS)
        .add({ email, authority })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  updateUserAuthorityByEmail(email, authority) {
    return new Promise((resolve, reject) => {
      firestore
        .collection(USERS)
        .get()
        .then(snapshot => {
          const docID = snapshot.docs.find(doc => doc.data().email === email)
            .id;
          firestore
            .collection(USERS)
            .doc(docID)
            .update({ authority });
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  getUserAuthority(email) {
    return new Promise((resolve, reject) => {
      firestore
        .collection(USERS)
        .get()
        .then(snapshot => {
          const targetUser = snapshot.docs.find(
            doc => doc.data().email === email
          );
          if (targetUser) {
            resolve(targetUser.data().authority);
          } else {
            resolve(null);
          }
        })
        .catch(err => reject(err));
    });
  },
  getUserAll() {
    return new Promise((resolve, reject) => {
      let userAll = [];
      firestore
        .collection(USERS)
        .orderBy("authority", "asc")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            userAll.push({
              id: doc.id,
              ...doc.data()
            });
          });
          resolve(userAll);
        })
        .catch(err => reject(err));
    });
  },
  updateUserById(docID, authority) {
    return new Promise((resolve, reject) => {
      firestore
        .collection(USERS)
        .doc(docID)
        .update({
          authority: authority
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },

  // Article
  getArticle(type) {
    return new Promise((resolve, reject) => {
      const article = [];
      const ref = firestore.collection(type);
      ref
        .orderBy("created_at", "desc")
        .get()
        .then(snapshot => {
          let counter = 0;
          snapshot.docs.forEach(doc => {
            ref
              .doc(doc.id)
              .collection(COMMENTS)
              .orderBy("created_at", "desc")
              .get()
              .then(comments => {
                article.push({
                  id: doc.id,
                  comments: comments.docs.map(res => ({
                    id: res.id,
                    ...res.data()
                  })),
                  ...doc.data()
                });
              })
              .then(() => {
                counter++;
                if (counter === snapshot.docs.length) {
                  resolve(article);
                }
              });
          });
        })
        .catch(err => reject(err));
    });
  },
  postArticle(type, payload) {
    return new Promise((resolve, reject) => {
      firestore
        .collection(type)
        .add({
          ...payload,
          created_at: Firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  deleteArticle(type, docID) {
    return new Promise((resolve, reject) => {
      firestore
        .collection(type)
        .doc(docID)
        .delete()
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  updateArticle(type, docID, payload) {
    return new Promise((resolve, reject) => {
      firestore
        .collection(type)
        .doc(docID)
        .update({
          ...payload
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  postComment(isPortfolio, articleID, content, user) {
    return new Promise((resolve, reject) => {
      const article = firestore
        .collection(isPortfolio ? PORTFOLIOS : POSTS)
        .doc(articleID);
      article.update({
        updated_at: Firebase.firestore.FieldValue.serverTimestamp()
      });
      article
        .collection(COMMENTS)
        .add({
          content,
          userID: user.id,
          userName: user.name,
          created_at: Firebase.firestore.FieldValue.serverTimestamp(),
          updated_at: Firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  updateComment(isPortfolio, articleID, commentID, content) {
    return new Promise((resolve, reject) => {
      firestore
        .collection(isPortfolio ? PORTFOLIOS : POSTS)
        .doc(articleID)
        .collection(COMMENTS)
        .doc(commentID)
        .update({
          content,
          updated_at: Firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  deleteComment(isPortfolio, articleID, commentID) {
    return new Promise((resolve, reject) => {
      firestore
        .collection(isPortfolio ? PORTFOLIOS : POSTS)
        .doc(articleID)
        .collection(COMMENTS)
        .doc(commentID)
        .delete()
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },

  // Log
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
