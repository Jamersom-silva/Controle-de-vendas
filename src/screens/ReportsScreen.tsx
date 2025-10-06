// src/screens/ReportsScreen.tsx
import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { StockContext, Product } from "../context/StockContext";

export default function ReportsScreen() {
  const { products } = useContext(StockContext);

  const lowStockProducts = products.filter(p => p.quantity <= 5);
  const totalProducts = products.reduce((sum, p) => sum + p.quantity, 0);

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productQuantity}>{item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório de Estoque</Text>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Total de produtos: {totalProducts}</Text>
        <Text style={styles.summaryText}>
          Produtos com estoque baixo: {lowStockProducts.length}
        </Text>
      </View>

      <Text style={styles.subtitle}>Produtos em estoque</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  summaryContainer: {
    marginBottom: 20,
    backgroundColor: "#f1f5f9",
    padding: 15,
    borderRadius: 10,
  },
  summaryText: { fontSize: 16, fontWeight: "bold", color: "#1e293b", marginBottom: 5 },
  subtitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f8fafc",
    borderRadius: 5,
    marginBottom: 5,
  },
  productName: { fontSize: 16, color: "#0f172a" },
  productQuantity: { fontSize: 16, fontWeight: "bold", color: "#1e40af" },
});
