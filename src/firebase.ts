// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAF5G1x4cmKxOANLYgDzTv6l0S0uyVpjtg',
  authDomain: 'proyecto-final-fdb87.firebaseapp.com',
  projectId: 'proyecto-final-fdb87',
  storageBucket: 'proyecto-final-fdb87.appspot.com',
  messagingSenderId: '289794045281',
  appId: '1:289794045281:web:7bdf9dcb3a438f943d4120',
  measurementId: 'G-7T8JQ348R3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, analytics };
