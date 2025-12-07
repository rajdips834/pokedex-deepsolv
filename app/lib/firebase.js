// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCymRLZ_HDtNxxmDApca2Ne0YsvHB6Ag2g",
  authDomain: "deepsolv-7b27c.firebaseapp.com",
  projectId: "deepsolv-7b27c",
  storageBucket: "deepsolv-7b27c.firebasestorage.app",
  messagingSenderId: "548769424168",
  appId: "1:548769424168:web:ae7fd84091d7d906c6661d",
  measurementId: "G-3L1ZDGRES3",
};

// Initialize firebase
const app = initializeApp(firebaseConfig);

// Export auth + providers
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
