import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { insertCliente, initDB } from '../database';

const CadastroClienteScreen = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    initDB();
  }, []);

  const handleCadastro = () => {
    insertCliente(nome, email);
    console.log('Cliente cadastrado com sucesso!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
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

export default CadastroClienteScreen;
