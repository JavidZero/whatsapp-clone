import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyArT5xeUbB3D7lvC6Im90bKQ8ONQ2EZOzQ",
  authDomain: "whatsapp-clone-1-bf622.firebaseapp.com",
  projectId: "whatsapp-clone-1-bf622",
  storageBucket: "whatsapp-clone-1-bf622.appspot.com",
  messagingSenderId: "1009480286118",
  appId: "1:1009480286118:web:d95ad7d013b42ab016d967"
};


const firebaseApp = !firebase.apps.length ? 
    firebase.initializeApp(firebaseConfig)
    : firebase.app();

const db = firebaseApp.firestore();

const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth , provider };