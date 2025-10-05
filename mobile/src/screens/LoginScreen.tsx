import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
export default function LoginScreen({ navigation }: any) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, marginBottom: 12 }}>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{borderWidth:1, padding:8, marginBottom:8}} />
      <TextInput placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry style={{borderWidth:1, padding:8, marginBottom:16}} />
      <Button title="Entrar" onPress={async ()=> {
        const ok = await login(email,password);
        if (ok) navigation.replace('Home');
        else Alert.alert('Erro', 'Credenciais inválidas');
      }} />
      <View style={{height:12}}/>
      <Button title="Registrar" onPress={()=> navigation.navigate('Register')} />
    </View>
  );
}
