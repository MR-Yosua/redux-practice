import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {

  apiKey: "AIzaSyCy_2Bktm4uimQAfiz-mT3lz71Jxfk9908",

  authDomain: "redux-practice-151e9.firebaseapp.com",

  databaseURL: "https://redux-practice-151e9-default-rtdb.firebaseio.com",

  projectId: "redux-practice-151e9",

  storageBucket: "redux-practice-151e9.appspot.com",

  messagingSenderId: "498485877507",

  appId: "1:498485877507:web:86ca3742eb9db0c5936736"

};



  const firebaseApp = firebase.initializeApp(firebaseConfig);
  
  const db = firebase.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  export {db,auth,provider,firebaseApp};