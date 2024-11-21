import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDwzjpYAPQZG9H4HlGjvHFWA2kvrKJM",
  authDomain: "controlede-vendas.firebaseapp.com",
  projectId: "controlede-vendas",
  storageBucket: "controlede-vendas.appspot.com",
  messagingSenderId: "SUA_MESSAGING_SENDER_ID",
  appId: "1:982120009840:web:1234567890abcdef",
  measurementId: "G-9W80D9N33R"
};

// Inicialize o app Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Inicialize o Auth apenas se ainda não estiver inicializado
let auth;
try {
  auth = getAuth(app);
} catch (error) {
  if (error.code === 'auth/already-initialized') {
    console.log('Auth já inicializado.');
  } else {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
  }
}

// Inicialize o Firestore
const db = getFirestore(app);

export { app, auth, db };
