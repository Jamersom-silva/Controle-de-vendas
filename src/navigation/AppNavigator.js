import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import CadastroVendaScreen from '../screens/CadastroVendaScreen';
import ListagemVendasScreen from '../screens/ListagemVendasScreen';  // Importação adicionada

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CadastroVenda" component={CadastroVendaScreen} />
      <Stack.Screen name="ListagemVendas" component={ListagemVendasScreen} />  // Tela adicionada
    </Stack.Navigator>
  );
};

export default AppNavigator;
