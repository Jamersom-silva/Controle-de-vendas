import { initializeApp, getApp, getApps } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Sua configuração Firebase correta
const firebaseConfig = {
  apiKey: "AIzaSyDwzjpYAPQZG9H4JG4HlGjvHFWA2kvrKJM",
  authDomain: "controlede-vendas.firebaseapp.com",
  projectId: "controlede-vendas",
  storageBucket: "controlede-vendas.firebasestorage.app",
  messagingSenderId: "982120009840",
  appId: "1:982120009840:web:c76fddc7c0fc816dcc24b5",
  measurementId: "G-9W80D9N33R"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Inicializar o Auth do Firebase com AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { app, auth };
