import firebase from 'firebase';
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyD-kC2l6DkVLf-yNWdGLAw4TKwdfDBp_Y8",
  authDomain: "maroonunis.firebaseapp.com",
  databaseURL: "https://maroonunis-default-rtdb.firebaseio.com",
  projectId: "maroonunis",
  storageBucket: "maroonunis.appspot.com",
  messagingSenderId: "671107995250",
  appId: "1:671107995250:web:23174aca0dc5e17e25d4eb"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const data = firebase.auth();
  const storage = firebase.storage();
  const db = firebaseApp.firestore();
  const database = firebase.database();
  firebase.firestore().settings({ experimentalForceLongPolling: true });


  export {storage, db, database, data as default};
  