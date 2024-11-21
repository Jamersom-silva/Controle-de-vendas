import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { fetchEstoque } from '../services/database'; // Importação correta

const ControleEstoqueScreen = () => {
  const [estoque, setEstoque] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEstoque();
        setEstoque(data);
      } catch (error) {
        console.error('Erro ao buscar estoque:', error);
        Alert.alert('Erro', 'Não foi possível carregar o estoque.');
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle de Estoque</Text>
      <FlatList
        data={estoque}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Produto: {item.produto}</Text>
            <Text>Quantidade: {item.quantidade}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ControleEstoqueScreen;
