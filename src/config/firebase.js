import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCx-0MjesyVyk-0jkJiqv70xMqvt-0tggE',
  authDomain: 'react-event-app-ab08f.firebaseapp.com',
  databaseURL: 'https://react-event-app-ab08f.firebaseio.com',
  projectId: 'react-event-app-ab08f',
  storageBucket: 'react-event-app-ab08f.appspot.com',
  messagingSenderId: '626025086519',
  appId: '1:626025086519:web:32652ca237aed4e69149b2'
};
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
