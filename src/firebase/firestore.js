import "./firebase";
import firebaseMessage from "../firebase/firebaseMessage";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
const firestore = firebase.firestore();
const firedatabase = firebase.database();
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
  postUser(email, authority, token, deleted) {
    return new Promise((resolve, reject) => {
      firestore
        .collection(USERS)
        .add({
          email,
          authority,
          token,
          deleted
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  deleteUser(email) {
    // 쓰면 안돼요~!
    return new Promise((resolve, reject) => {
      firestore
        .collection(USERS)
        .where("email", "==", email)
        .get()
        .then(snapshot => {
          let counter = 0;
          snapshot.docs.forEach(doc =>
            doc.ref.delete().then(() => {
              counter++;
              if (counter === snapshot.docs.length) {
                resolve();
              }
            })
          );
        })
        .catch(err => reject(err));
    });
  },
  updateUserByEmail(email, payload) {
    return new Promise((resolve, reject) => {
      firestore
        .collection(USERS)
        .where("email", "==", email)
        .get()
        .then(snapshot => {
          snapshot.docs[0].ref
            .update(payload)
            .then(res => resolve(res))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  },
  getUserAuthority(email) {
    return new Promise((resolve, reject) => {
      firestore
        .collection(USERS)
        .where("email", "==", email)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            resolve(null);
          } else {
            resolve(snapshot.docs[0].data().authority);
          }
        })
        .catch(err => reject(err));
    });
  },
  getUserDeleted(email) {
    return new Promise((resolve, reject) => {
      firestore
        .collection(USERS)
        .where("email", "==", email)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            resolve(null);
          } else {
            resolve(snapshot.docs[0].data().deleted);
          }
        })
        .catch(err => reject(err));
    });
  },
  getUserToken(email) {
    return new Promise((resolve, reject) => {
      firestore
        .collection(USERS)
        .where("email", "==", email)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            resolve(null);
          } else {
            resolve(snapshot.docs[0].data().token);
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
  updateUserById(docID, payload) {
    return new Promise((resolve, reject) => {
      firestore
        .collection(USERS)
        .doc(docID)
        .update(payload)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },

  // Article
  getArticles(type) {
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
                const data = {
                  id: doc.id,
                  ...doc.data()
                };
                data.comments = comments.docs.map(res => ({
                  id: res.id,
                  ...res.data()
                }));
                article.push(data);
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
  postArticle(type, user, payload) {
    return new Promise((resolve, reject) => {
      this.getUserAll().then(userAll =>
        userAll.forEach(user => {
          let UserToken = user.token;
          if (UserToken) {
            firebaseMessage.pushMessage(
              UserToken,
              type.toUpperCase(),
              "새글이 등록 되었습니다."
            );
          }
        })
      );
      firestore
        .collection(type)
        .add({
          ...payload,
          userID: user.id,
          userName: user.name,
          edited: false,
          created_at: firebase.firestore.FieldValue.serverTimestamp(),
          userEmail: user.email
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
      const newtitle = payload.title;
      this.getUserAll().then(userAll =>
        userAll.forEach(user => {
          let UserToken = user.token;
          if (UserToken) {
            firebaseMessage.pushMessage(
              UserToken,
              type.toUpperCase(),
              newtitle + "글이 수정 되었습니다."
            );
          }
        })
      );
      firestore
        .collection(type)
        .doc(docID)
        .update({
          ...payload,
          edited: true,
          updated_at: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },

  // Comment
  postComment(isPortfolio, articleID, content, user) {
    return new Promise((resolve, reject) => {
      const article = firestore
        .collection(isPortfolio ? PORTFOLIOS : POSTS)
        .doc(articleID);
      article.get().then(doc => {
        const articleData = doc.data();
        this.getUserToken(articleData.userEmail).then(token => {
          if (token) {
            firebaseMessage.pushMessage(
              token,
              articleData.title,
              "당신의 글에 댓글이 등록 되었습니다."
            );
          }
        });
      });
      article
        .collection(COMMENTS)
        .add({
          content,
          userID: user.id,
          userName: user.name,
          edited: false,
          created_at: firebase.firestore.FieldValue.serverTimestamp()
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
          edited: true,
          updated_at: firebase.firestore.FieldValue.serverTimestamp()
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
    const log = firedatabase.ref("LOG");
    log.push({
      path,
      username,
      time
    });
  },
  getLog() {
    return new Promise((resolve, reject) => {
      const data = [];
      const ref = firedatabase.ref("LOG").orderByChild("time");
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
