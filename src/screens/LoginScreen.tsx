// src/screens/LoginScreen.tsx
import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { UserContext } from "../context/UserContext";

export default function LoginScreen({ navigation }: any) {
  const { login, register } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha email e senha");
      return;
    }
    const success = await login(email, password);
    if (success) {
      navigation.replace("Home");
    } else {
      Alert.alert("Erro", "Email ou senha inválidos");
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha email e senha");
      return;
    }
    const success = await register(email, password);
    if (success) {
      navigation.replace("Home");
    } else {
      Alert.alert("Erro", "Não foi possível registrar o usuário");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle de Estoque</Text>
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Registrar" onPress={handleRegister} />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#1e3a8a",
  },
  backText: {
    marginTop: 20,
    color: "#2563eb",
    textAlign: "center",
    fontWeight: "bold",
  },
});
