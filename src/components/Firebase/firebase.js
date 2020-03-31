import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDeMCdmmVoE9TVlAnOpfl9ATsbiCtBb8Sg",
  authDomain: "todo-react-app-4aa4d.firebaseapp.com",
  databaseURL: "https://todo-react-app-4aa4d.firebaseio.com",
  projectId: "todo-react-app-4aa4d",
  storageBucket: "todo-react-app-4aa4d.appspot.com",
  messagingSenderId: "407508102811",
  appId: "1:407508102811:web:7bcd6aa7ba22aabfe3603e"
}


firebase.initializeApp(config);
export const db = firebase.firestore();
export const dbRef = db.collection('todos');

export default firebase;
