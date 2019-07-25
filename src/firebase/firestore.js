import { firebaseApp } from "./firebase";
import Firebase from "firebase/app";

const firestore = Firebase.firestore();

const POSTS = "posts";
const PORTFOLIOS = "portfolios";
const USERS = "users";
const COMMENTS = "comments";

export default {
  postUser(email, authority) {
    return new Promise((resolve, reject) => {
      firestore
        .collection(USERS)
        .add({
          email,
          authority
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  updateUserAuthorityByEmail(email, authority) {
    return new Promise((resolve, reject) => {
      firestore.collection(USERS).get()
        .then(snapshot => {
          const docID = snapshot.docs.find(doc => doc.data().email === email).id
          firestore.collection(USERS).doc(docID).update({authority})
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  getUserAuthority(email) {
    return new Promise((resolve, reject) => {
      firestore.collection(USERS).get()
        .then(snapshot => {
          const targetUser = snapshot.docs.find(doc => doc.data().email === email);
          if (targetUser) {
            resolve(targetUser.data().authority);
          }
          else {
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
  // getUser(id) {
  //   return new Promise((resolve, reject) => {
  //     firestore.collection(USERS).doc(id).get()
  //       .then(doc => {
  //         if (doc.exists) {
  //           resolve({
  //             id: doc.id,
  //             ...doc.data()
  //           });
  //         }
  //         else {
  //           // alert msg saying that the particular document does not exist
  //         }
  //       })
  //       .catch(err => reject(err));
  //   })
  // },
  getPosts() {
    return new Promise((resolve, reject) => {
      const posts = [];
      const ref = firestore.collection(POSTS);
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
                posts.push({
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
                  resolve(posts);
                }
              });
          });
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
      const portfolios = [];
      const ref = firestore.collection(PORTFOLIOS);
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
                portfolios.push({
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
                  resolve(portfolios);
                }
              });
          });
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
