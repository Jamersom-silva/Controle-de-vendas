import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDwzjpYAPQZG9H4JG4HlGjvHFWA2kvrKJM",
  authDomain: "controlede-vendas.firebaseapp.com",
  projectId: "controlede-vendas",
  storageBucket: "controlede-vendas.firebasestorage.app",
  messagingSenderId: "982120009840",
  appId: "1:982120009840:web:c76fddc7c0fc816dcc24b5",
  measurementId: "G-9W80D9N33R"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore com a opção useFetchStreams: false
const db = getFirestore(app, { useFetchStreams: false });

// Função para buscar vendas do Firestore
const fetchVendas = async () => {
  try {
    const vendasCol = collection(db, 'vendas');
    const vendasSnapshot = await getDocs(vendasCol);
    const vendasList = vendasSnapshot.docs.map(doc => doc.data());
    return vendasList;
  } catch (error) {
    console.error('Erro ao buscar vendas:', error);
    throw error;
  }
};

// Função para inserir uma nova venda no Firestore
const insertVenda = async (venda) => {
  try {
    const vendasCol = collection(db, 'vendas');
    await addDoc(vendasCol, venda);
    console.log('Venda inserida com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir venda:', error);
    throw error;
  }
};

// Função para buscar estoque do Firestore
const fetchEstoque = async () => {
  try {
    const estoqueCol = collection(db, 'estoque');
    const estoqueSnapshot = await getDocs(estoqueCol);
    const estoqueList = estoqueSnapshot.docs.map(doc => doc.data());
    return estoqueList;
  } catch (error) {
    console.error('Erro ao buscar estoque:', error);
    throw error;
  }
};

export { fetchVendas, insertVenda, fetchEstoque };
