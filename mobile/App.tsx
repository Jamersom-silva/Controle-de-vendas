import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/contexts/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import ProductForm from './src/screens/ProductForm';
import SalesScreen from './src/screens/SalesScreen';
const Stack = createNativeStackNavigator();
export default function App(){ return <AuthProvider><NavigationContainer><Stack.Navigator initialRouteName="Login"><Stack.Screen name="Login" component={LoginScreen} /><Stack.Screen name="Register" component={RegisterScreen} /><Stack.Screen name="Home" component={HomeScreen} /><Stack.Screen name="Products" component={ProductsScreen} /><Stack.Screen name="ProductForm" component={ProductForm} /><Stack.Screen name="Sales" component={SalesScreen} /></Stack.Navigator></NavigationContainer></AuthProvider>; }
