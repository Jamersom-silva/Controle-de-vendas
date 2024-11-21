import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Controle de Vendas!</Text>
      <Text style={styles.greeting}>O que você gostaria de fazer hoje?</Text>
      
      <Button
        title="Cadastrar Venda"
        onPress={() => navigation.navigate('CadastroVenda')}
      />
      <Button
        title="Listagem de Vendas"
        onPress={() => navigation.navigate('ListagemVendas')}
      />
      <Button
        title="Cadastrar Cliente"
        onPress={() => navigation.navigate('CadastroCliente')}
      />
      <Button
        title="Relatórios"
        onPress={() => navigation.navigate('Relatorios')}
      />
      <Button
        title="Controle de Estoque"
        onPress={() => navigation.navigate('ControleEstoque')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 18,
    marginBottom: 24,
  },
  button: {
    marginBottom: 12,
  },
});

export default HomeScreen;
