import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
export default function HomeScreen({ navigation }: any) {
  const { user, logout } = useContext(AuthContext);
  return (
    <View style={{ padding:16 }}>
      <Text style={{ fontSize:20 }}>Bem-vindo{user ? `, ${user.name}` : ''}!</Text>
      <View style={{height:12}} />
      <Button title="Produtos" onPress={()=> navigation.navigate('Products')} />
      <View style={{height:8}} />
      <Button title="Vendas" onPress={()=> navigation.navigate('Sales')} />
      <View style={{height:8}} />
      <Button title="Logout" onPress={async ()=> { await logout(); navigation.replace('Login'); }} />
    </View>
  );
}
