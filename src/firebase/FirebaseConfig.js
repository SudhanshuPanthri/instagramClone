import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDMlOqxD1jwblYZWMzqZrW4Ia7Sd6hC4M0',
  authDomain: 'instagram-clone-68663.firebaseapp.com',
  projectId: 'instagram-clone-68663',
  storageBucket: 'instagram-clone-68663.appspot.com',
  messagingSenderId: '832521963972',
  appId: '1:832521963972:web:365d98339f11b27d323c91',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase, firestore};
