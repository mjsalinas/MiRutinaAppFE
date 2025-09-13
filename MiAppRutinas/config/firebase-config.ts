// config/firebase-config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyATjXQO7fjqWTl_FHl70552XT5_quoz0E4",
  authDomain: "aplicacion-55.firebaseapp.com",
  projectId: "aplicacion-55",
  storageBucket: "aplicacion-55.firebasestorage.app",
  messagingSenderId: "804540194560",
  appId: "1:804540194560:web:3b3a56f598eb4c9ad69de5",
  measurementId: "G-465EFMSWB6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
