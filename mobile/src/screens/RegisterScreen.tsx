import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
export default function RegisterScreen({ navigation }: any) {
  const { register } = useContext(AuthContext);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, marginBottom: 12 }}>Registrar</Text>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} style={{borderWidth:1, padding:8, marginBottom:8}} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{borderWidth:1, padding:8, marginBottom:8}} />
      <TextInput placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry style={{borderWidth:1, padding:8, marginBottom:16}} />
      <Button title="Criar conta" onPress={async ()=> {
        const ok = await register(name,email,password);
        if (ok) navigation.replace('Home');
        else Alert.alert('Erro', 'Não foi possível criar a conta (email pode já existir)');
      }} />
    </View>
  );
}
