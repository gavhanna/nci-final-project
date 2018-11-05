import firebase from "firebase/app";
import "firebase/storage";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBVfoVqwIFz5R-P9BUerA8AImvwJCc7BDA",
  authDomain: "recipebook-617e4.firebaseapp.com",
  databaseURL: "https://recipebook-617e4.firebaseio.com",
  projectId: "recipebook-617e4",
  storageBucket: "recipebook-617e4.appspot.com",
  messagingSenderId: "387214212038"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export {
  storage, firebase as default
}