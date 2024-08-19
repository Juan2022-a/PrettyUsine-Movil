import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../estilos/DashboardScreenStyles';
import * as Constantes from '../utils/constantes';

const DashboardScreen = ({ navigation }) => {
  const ip = Constantes.IP;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [time, setTime] = useState(new Date());
  const [userName, setUserName] = useState(''); // Estado para el nombre del cliente

  useEffect(() => {
    // Obtener el nombre del cliente al cargar la pantalla
    const fetchUserName = async () => {
      try {
        const response = await fetch(`${ip}/prettyusine/api/services/public/cliente.php?action=readProfile`);
        const data = await response.json();
        
        if (data.status) {
          setUserName(data.dataset.nombre_cliente);
        } else {
          Alert.alert('Error', data.error);
        }
      } catch (error) {
        Alert.alert('Error', 'Ocurrió un error al obtener el perfil');
      }
    };

    fetchUserName();

    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    const timeIntervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearInterval(timeIntervalId);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const url = `${ip}/prettyusine/api/services/public/cliente.php?action=logOut`;
      console.log("URL solicitada:", url);

      const response = await fetch(url, { method: 'GET' });
      const responseText = await response.text();

      try {
        const data = JSON.parse(responseText);
        if (data.status) {
          Alert.alert('Sesión finalizada', 'Te has cerrado sesión con éxito', [
            { text: 'OK', onPress: () => navigation.navigate('Login') },
          ]);
        } else {
          Alert.alert('Error', data.error);
        }
      } catch (jsonError) {
        console.error('Error al parsear JSON:', jsonError);
        console.error('Respuesta recibida:', responseText);
        Alert.alert('Error', 'Ocurrió un error al procesar la respuesta del servidor');
      }
    } catch (error) {
      console.error(error, 'Error desde Catch');
      Alert.alert('Error', 'Ocurrió un error al cerrar sesión');
    }
  };

  const categories = [
    { title: 'Categorías', icon: 'albums', color: '#FFF', route: 'Categorias' },
    { title: 'Perfil', icon: 'person', color: '#FFF', route: 'Perfil' },
    { title: 'Historial de compras', icon: 'mail', color: '#FFF', route: 'Historial' },
  ];

  const images = [
    'https://images.unsplash.com/photo-1713423826277-46c52a8438d5?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1710678563445-62c347a244d0?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1686050415724-bc5fae4cbe7c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1709364529811-ab0ba31f32e9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container} gestureEnabled={false} gestureDirection="horizontal">
      <Text style={styles.title}>Pretty Usine</Text>

      {/* Mensaje de bienvenida */}
      <Text style={styles.welcomeText}>Bienvenido, {userName}</Text>

      <Image source={{ uri: images[currentImageIndex] }} style={styles.banner} />

      <View style={styles.grid}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: category.color }]}
            onPress={() => navigation.navigate(category.route)}
          >
            <Ionicons name={category.icon} size={40} color="#000" />
            <Text style={styles.cardTitle}>{category.title}</Text>
          </TouchableOpacity>
        ))}

        {/* Agregar reloj con fecha */}
        <View style={styles.clockContainer}>
          <Text style={styles.clockText}>{formatTime(time)}</Text>
          <Text style={styles.dateText}>{formatDate(time)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DashboardScreen;
