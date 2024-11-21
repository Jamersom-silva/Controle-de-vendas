import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { fetchVendasPorData } from '../database';

const RelatoriosDetalhadosScreen = () => {
  const [vendas, setVendas] = useState([]);
  const [periodo, setPeriodo] = useState('mensal'); // 'mensal' ou 'anual'

  useEffect(() => {
    const inicio = periodo === 'mensal' ? '2023-01-01' : '2023-01-01';
    const fim = periodo === 'mensal' ? '2023-01-31' : '2023-12-31';
    fetchVendasPorData(inicio, fim, setVendas);
  }, [periodo]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Produto: {item.produto}</Text>
      <Text>Quantidade: {item.quantidade}</Text>
      <Text>Preço: {item.preco}</Text>
      <Text>Data: {item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatórios Detalhados de Vendas</Text>
      <Button title="Relatório Mensal" onPress={() => setPeriodo('mensal')} />
      <Button title="Relatório Anual" onPress={() => setPeriodo('anual')} />
      <FlatList
        data={vendas}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
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
    marginVertical: 8,
    backgroundColor: '#f9c2ff',
  },
});

export default RelatoriosDetalhadosScreen;
