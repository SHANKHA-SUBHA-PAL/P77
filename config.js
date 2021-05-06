import firebase from 'firebase'

require('@firebase/firestore')
//add sDK
const firebaseConfig = {
  apiKey: "AIzaSyC5qTsCpGp7po7kdErObRK0fVIzm4lOh_E",
  authDomain: "p-77-barter-system.firebaseapp.com",
  databaseURL:"https://p-77-barter-system-default-rtdb.firebaseio.com/",
  projectId: "p-77-barter-system",
  storageBucket: "p-77-barter-system.appspot.com",
  messagingSenderId: "537256399147",
  appId: "1:537256399147:web:0a5848ea4d603eac2a356e"
};
  // Initialize Firebase
  if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
  }

export default firebase.firestore();