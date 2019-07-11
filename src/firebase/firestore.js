import { firebase } from './firebase';
import Firebase from 'firebase/app';

const firestore = Firebase.firestore();
const POSTS = 'posts';
const PORTFOLIOS = 'portfolios';

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
			created_at: firebase.firestore.FieldValue.serverTimestamp()
		})
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
	loginWithGoogle() {
		let provider = new firebase.auth.GoogleAuthProvider()
		return firebase.auth().signInWithPopup(provider).then(function(result) {
			let accessToken = result.credential.accessToken
			let user = result.user
			return result
		}).catch(function(error) {
			console.error('[Google Login Error]', error)
		})
	}
}
