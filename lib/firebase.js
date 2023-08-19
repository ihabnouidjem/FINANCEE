import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD7qJcdvtRGPaRcw-_p3YJelRQbJHMegPk",
  authDomain: "financee-378710.firebaseapp.com",
  projectId: "financee-378710",
  storageBucket: "financee-378710.appspot.com",
  messagingSenderId: "16636051549",
  appId: "1:16636051549:web:5369a669da46b36d9e0db4",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
