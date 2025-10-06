// src/screens/HomeScreen.tsx
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { StockContext, Product } from "../context/StockContext";
import { UserContext } from "../context/UserContext";
import { MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }: any) {
  const { products } = useContext(StockContext);
  const { user, logout } = useContext(UserContext);

  // Estatísticas rápidas
  const totalProducts = products.length;
  const lowStock = products.filter((p) => p.quantity < 5).length;
  const mostSold = [...products].sort((a, b) => b.quantity - a.quantity).slice(0, 3);

  // Produtos recentes (últimos 5 adicionados ou movimentados)
  const recentProducts = products.slice(-5).reverse();

  const handleLogout = () => {
    logout();
    navigation.replace("Login");
  };

  // Componente do Header + resumo + ações + mais vendidos
  const ListHeader = () => (
    <>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appName}>Estoque App</Text>
        <TouchableOpacity
          onPress={() => {
            if (user) handleLogout();
            else navigation.navigate("Login");
          }}
        >
          <MaterialIcons name="account-circle" size={36} color="#1e3a8a" />
        </TouchableOpacity>
      </View>

      {/* Resumo do estoque */}
      <View style={styles.summaryContainer}>
        <View style={[styles.summaryCard, { backgroundColor: "#2563eb" }]}>
          <Text style={styles.summaryValue}>{totalProducts}</Text>
          <Text style={styles.summaryLabel}>Total de produtos</Text>
        </View>
        <View
          style={[
            styles.summaryCard,
            { backgroundColor: lowStock > 0 ? "#dc2626" : "#10b981" },
          ]}
        >
          <Text style={styles.summaryValue}>{lowStock}</Text>
          <Text style={styles.summaryLabel}>Estoque baixo</Text>
        </View>
      </View>

      {/* Produtos mais vendidos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Produtos mais vendidos</Text>
        {mostSold.map((p) => (
          <View key={p.id} style={styles.productCard}>
            <Text style={styles.productName}>{p.name}</Text>
            <Text style={styles.productQty}>{p.quantity} unidades</Text>
          </View>
        ))}
      </View>

      {/* Ações rápidas */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Products")}
        >
          <MaterialIcons name="add-box" size={28} color="#fff" />
          <Text style={styles.actionText}>Adicionar Produto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Entry")}
        >
          <MaterialIcons name="arrow-upward" size={28} color="#fff" />
          <Text style={styles.actionText}>Registrar Entrada</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Exit")}
        >
          <MaterialIcons name="arrow-downward" size={28} color="#fff" />
          <Text style={styles.actionText}>Registrar Saída</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>
        Produtos recentes
      </Text>
    </>
  );

  return (
    <FlatList
      data={recentProducts}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={ListHeader}
      renderItem={({ item }) => (
        <View style={styles.productCard}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productQty}>{item.quantity} unidades</Text>
        </View>
      )}
      contentContainerStyle={{ padding: 20, paddingBottom: 30 }}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  appName: { fontSize: 26, fontWeight: "bold", color: "#1e3a8a" },
  summaryContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  summaryCard: { flex: 1, marginHorizontal: 5, borderRadius: 10, padding: 20, alignItems: "center" },
  summaryValue: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  summaryLabel: { fontSize: 14, color: "#fff", marginTop: 5, textAlign: "center" },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#1e3a8a" },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  productName: { fontSize: 16, fontWeight: "bold" },
  productQty: { fontSize: 16, color: "#6b7280" },
  actionsContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#2563eb",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: { color: "#fff", marginTop: 5, fontWeight: "bold" },
});
