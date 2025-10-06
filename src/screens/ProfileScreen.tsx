// src/screens/ProfileScreen.tsx
import React, { useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Button from "../components/Button";
import { UserContext } from "../context/UserContext";

export default function ProfileScreen() {
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    Alert.alert("Confirmação", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => logout(),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email || "Não identificado"}</Text>

        <Button
          title="Alterar Senha"
          onPress={() => Alert.alert("Funcionalidade", "Tela de alteração de senha")}
          color="#2563eb"
          style={{ marginTop: 20 }}
        />

        <Button
          title="Logout"
          onPress={handleLogout}
          color="#ef4444"
          style={{ marginTop: 10 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#111827",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
});
