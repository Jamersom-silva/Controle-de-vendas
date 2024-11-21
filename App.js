import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import CadastroVendaScreen from './src/screens/CadastroVendaScreen';
import ListagemVendasScreen from './src/screens/ListagemVendasScreen';
import CadastroClienteScreen from './src/screens/CadastroClienteScreen';
import RelatoriosScreen from './src/screens/RelatoriosScreen';
import ControleEstoqueScreen from './src/screens/ControleEstoqueScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CadastroVenda" component={CadastroVendaScreen} />
        <Stack.Screen name="ListagemVendas" component={ListagemVendasScreen} />
        <Stack.Screen name="CadastroCliente" component={CadastroClienteScreen} />
        <Stack.Screen name="Relatorios" component={RelatoriosScreen} />
        <Stack.Screen name="ControleEstoque" component={ControleEstoqueScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
