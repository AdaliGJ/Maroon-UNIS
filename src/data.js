import firebase from 'firebase';
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyC2r-CGk07oPbn_bowxVSlxTyVAvw-0pGA",
    authDomain: "maroon-fc3ba.firebaseapp.com",
    projectId: "maroon-fc3ba",
    storageBucket: "maroon-fc3ba.appspot.com",
    messagingSenderId: "921416844711",
    appId: "1:921416844711:web:24aa16b48a7d2ebb21a282",
    measurementId: "G-059VDBL3KK"
  };
 
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const data = firebase.auth();
  const storage = firebase.storage();
  const db = firebaseApp.firestore();


  export {storage, db, data as default};
  