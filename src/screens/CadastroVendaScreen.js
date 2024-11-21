import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { addDoc, collection, getFirestore } from 'firebase/firestore';  // Certifique-se de importar corretamente
import { db } from '../database';  // Caminho correto para a instância db

const CadastroVendaScreen = () => {
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');

  const handleCadastro = async () => {
    if (!produto || !quantidade || !preco) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const venda = {
      produto,
      quantidade,
      preco,
      data: new Date().toISOString()  // Adiciona a data atual como string ISO
    };

    try {
      console.log('Tentando adicionar documento:', venda);
      await addDoc(collection(getFirestore(), 'vendas'), venda);  // Utilizando `getFirestore()` diretamente
      Alert.alert('Sucesso', 'Venda cadastrada com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar venda:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar a venda.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Venda</Text>
      <TextInput
        style={styles.input}
        placeholder="Produto"
        value={produto}
        onChangeText={setProduto}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
      />
      <Button title="Cadastrar" onPress={handleCadastro} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default CadastroVendaScreen;
