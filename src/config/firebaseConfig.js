import firebase from "firebase"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA0EYcS2kd77BZ-oj9WlItwk-mdUIYIba8",
  authDomain: "ordernotes-4e659.firebaseapp.com",
  projectId: "ordernotes-4e659",
  storageBucket: "ordernotes-4e659.appspot.com",
  messagingSenderId: "338551827130",
  appId: "1:338551827130:web:15bdfaebf8231799a97083"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase