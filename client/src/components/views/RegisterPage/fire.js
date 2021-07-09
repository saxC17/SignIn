import firebase from "firebase/app";
import "firebase/auth"; // for authentication

const config = {
  apiKey: "AIzaSyBjeEOE4xoxOSDgFd-RQd3PX3OY-mITp8I",
  authDomain: "signin-8fadc.firebaseapp.com",
  projectId: "signin-8fadc",
  storageBucket: "signin-8fadc.appspot.com",
  messagingSenderId: "369651029000",
  appId: "1:369651029000:web:59fbb91325cb3e10dfadbd",
};
firebase.initializeApp(config);
export default firebase;