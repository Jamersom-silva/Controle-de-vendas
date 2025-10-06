// src/navigation/AppNavigator.tsx
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProductsScreen from "../screens/ProductsScreen";
import ReportsScreen from "../screens/ReportsScreen";
import EntryScreen from "../screens/EntryScreen";
import ExitScreen from "../screens/ExitScreen";
import LoginScreen from "../screens/LoginScreen";
import { UserContext } from "../context/UserContext";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabScreens() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: { backgroundColor: "#fff", borderTopWidth: 0.2 },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap = "home";
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Produtos") iconName = "inventory";
          else if (route.name === "Relatórios") iconName = "bar-chart";
          else if (route.name === "Entrada") iconName = "add-box";
          else if (route.name === "Saída") iconName = "remove-circle";
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Produtos" component={ProductsScreen} />
      <Tab.Screen name="Entrada" component={EntryScreen} />
      <Tab.Screen name="Saída" component={ExitScreen} />
      <Tab.Screen name="Relatórios" component={ReportsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user } = useContext(UserContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // Se não estiver logado, mostra login
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : null}
        <Stack.Screen name="Main" component={TabScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
