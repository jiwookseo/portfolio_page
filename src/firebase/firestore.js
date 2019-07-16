import {firebaseApp} from './firebase';
import Firebase from 'firebase/app';

const firestore = Firebase.firestore()

const POSTS = 'posts'
const PORTFOLIOS = 'portfolios'

export default {
  async getPosts() {
    let posts = [];
    let snapshot = await firestore.collection(POSTS).orderBy('created_at', 'desc').get();
    snapshot.docs.forEach(doc => {
      posts.push({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        created_at: doc.data().created_at
      });
    });
    return posts
  },
  postPost(title, content) {
    return firestore.collection(POSTS).add({
      title,
      content,
      created_at: Firebase.firestore.FieldValue.serverTimestamp()
    })
  },
  deletePost(docID) {
    firestore.collection(POSTS).doc(docID).delete();
  },
  updatePost(docID, title, content) {
    firestore.collection(POSTS).doc(docID).update({
      title: title,
      content: content,
    });
  },
  async getPortfolios() {
    let portfolios = [];
    let snapshot = await firestore.collection(PORTFOLIOS).orderBy('created_at', 'desc').get();
    snapshot.docs.forEach(doc => {
      portfolios.push({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        img: doc.data().img,
        created_at: doc.data().created_at
      });
    });
    return portfolios
  },
  postPortfolio(title, content, img) {
    return firestore.collection(PORTFOLIOS).add({
      title,
      content,
      img,
      created_at: Firebase.firestore.FieldValue.serverTimestamp()
    })
  },
  deletePortfolio(docID) {
    firestore.collection(PORTFOLIOS).doc(docID).delete();
  },
  updatePortfolio(docID, title, content, img) {
    firestore.collection(PORTFOLIOS).doc(docID).update({
      title: title,
      content: content,
      img: img
    });
  },
  logView(user, id, path, time) {
    db.ref('LOG/' + user).set({
      userId: id,
      path: path,
      time: time
    })
  },
  addLog(path, username, time) {
    let db = firebaseApp.database();
    let log = db.ref('LOG');
    log.push(
      {
        'path': path,
        'username': username,
        'time': time
      }
    );
  },
  async getLog() {
    let data = []

    let db = await firebaseApp.database();
    let ref = db.ref('LOG').orderByChild('time');
    ref.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        data.push(childSnapshot.val());
      });
    });
    return data;
  }
}
