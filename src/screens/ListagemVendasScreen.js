import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { initDB, getVendas } from '../database';  // Importando a função para obter as vendas

const ListagemVendasScreen = () => {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        initDB();
        const vendasList = await getVendas();
        setVendas(vendasList);
      } catch (error) {
        console.error('Erro ao obter vendas:', error);
        Alert.alert('Erro', 'Não foi possível obter a lista de vendas.');
      }
    };

    fetchVendas();
  }, []);

  const renderVenda = ({ item }) => (
    <View style={styles.vendaContainer}>
      <Text style={styles.vendaText}>Produto: {item.produto}</Text>
      <Text style={styles.vendaText}>Quantidade: {item.quantidade}</Text>
      <Text style={styles.vendaText}>Preço: R${item.preco}</Text>
      <Text style={styles.vendaText}>Data: {new Date(item.date).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listagem de Vendas</Text>
      <FlatList
        data={vendas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderVenda}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  vendaContainer: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  vendaText: {
    fontSize: 16,
  },
});

export default ListagemVendasScreen;
