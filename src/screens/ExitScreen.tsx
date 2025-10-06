// src/screens/ExitScreen.tsx
import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { StockContext } from "../context/StockContext";

export default function ExitScreen() {
  const { removeProduct } = useContext(StockContext);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleRemoveProduct = () => {
    if (!name || !quantity) {
      Alert.alert("Erro", "Preencha nome e quantidade");
      return;
    }

    removeProduct(name, Number(quantity));
    setName("");
    setQuantity("");
    Alert.alert("Sucesso", "Saída registrada com sucesso!");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Registrar Saída</Text>

        <View style={styles.card}>
          <Input placeholder="Nome do Produto" value={name} onChangeText={setName} />
          <Input
            placeholder="Quantidade"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
          <Button title="Registrar Saída" onPress={handleRemoveProduct} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
});
