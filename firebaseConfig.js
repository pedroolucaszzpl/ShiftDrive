// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Importa a autenticação
import { getFirestore } from "firebase/firestore"; // Importa o Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrLuSGe-Bbvucn5-CRTG2zQ8OLKvM7n18",
  authDomain: "shiftdrive-99e8b.firebaseapp.com",
  projectId: "shiftdrive-99e8b",
  storageBucket: "shiftdrive-99e8b.appspot.com",
  messagingSenderId: "90265901868",
  appId: "1:90265901868:web:25c7f7928e0d58c222aa89",
  measurementId: "G-WEG7DP4S4B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app); // Inicializa a autenticação
const db = getFirestore(app); // Inicializa o Firestore

// Exporta as instâncias de auth e db para uso em outros arquivos
export { auth, db };
