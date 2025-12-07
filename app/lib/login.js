// lib/login.js
import { auth, googleProvider, githubProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

export const loginWithGoogle = async () => {
  return await signInWithPopup(auth, googleProvider);
};

export const loginWithGithub = async () => {
  return await signInWithPopup(auth, githubProvider);
};
