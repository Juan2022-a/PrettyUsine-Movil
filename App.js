import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import PasswordRecoveryScreen from './src/screens/RecuperacionScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import CategoriaScreen from './src/screens/CategoriaScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import MiPerfilScreen from './src/screens/MiPerfilScreen';
import CarritoScreen from './src/screens/CarritoScreen';
import HistorialScreen from './src/screens/HistorialScreen';
import ProductoScreen from './src/screens/ProductoScreen';
import TerminosCondicionesScreen from './src/screens/Terminos&Condiciones'; // Asegúrate de que la ruta sea correcta
import DetallesProductoScreen from './src/screens/DetallesProductoScreen';
import OfertasScreen from './src/screens/OfertasScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardTabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        ),
        tabBarLabel: () => null,
      }}
    />
    <Tab.Screen
      name="Categorias"
      component={CategoriaScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="albums" size={size} color={color} />
        ),
        tabBarLabel: () => null,
      }}
    />
    <Tab.Screen
      name="Carrito"
      component={CarritoScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="cart" size={size} color={color} />
        ),
        tabBarLabel: () => null,
      }}
    />
    <Tab.Screen
      name="Mi Perfil"
      component={PerfilScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" size={size} color={color} />
        ),
        tabBarLabel: () => null,
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);
    return () => clearTimeout(timeout); // Limpia el timeout si el componente se desmonta
  }, []);

  if (isShowSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="PasswordRecovery" component={PasswordRecoveryScreen} />
        <Stack.Screen name="DashboardTabs" component={DashboardTabNavigator} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="MiPerfil" component={MiPerfilScreen} />
        <Stack.Screen name="Producto" component={ProductoScreen} />
        <Stack.Screen name="Carrito" component={CarritoScreen} />
        <Stack.Screen name="Historial" component={HistorialScreen} />
        <Stack.Screen name="Ofertas" component={OfertasScreen} />
        <Stack.Screen name="TerminosyCondiciones" component={TerminosCondicionesScreen} />
        <Stack.Screen name="DetallesProducto" component={DetallesProductoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
