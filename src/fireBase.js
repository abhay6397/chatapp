// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:'AIzaSyCICUJDyQGlHcVT6dR5ujKrLtAQiIr1Gkc',
  authDomain: 'chat-application-3c9de.firebaseapp.com',
  projectId:'chat-application-3c9de',
  storageBucket:'chat-application-3c9de.appspot.com',
  messagingSenderId:'20293724323',
  appId: '1:202937243231:web:5e3ed392052c5ab1ef2dea'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);