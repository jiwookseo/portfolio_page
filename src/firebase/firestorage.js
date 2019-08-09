import "./firebase"; // default App import
import firebase from "firebase/app";
import "firebase/storage";

const firestorage = firebase.storage(); // default App 의 storage 객체

export default firestorage;
