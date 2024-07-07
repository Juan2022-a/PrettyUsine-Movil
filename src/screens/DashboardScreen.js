import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from '../estilos/DashboardScreenStyles';

const DashboardScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    navigation.navigate('Login');
  };


  const categories = [
    { title: 'Categorías', icon: 'grid-outline' },
    { title: 'Perfil', icon: 'person-outline' },
    { title: 'Historial', icon: 'time-outline' }
  ];

  const images = [
    'https://images.unsplash.com/photo-1713423826277-46c52a8438d5?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1710678563445-62c347a244d0?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1686050415724-bc5fae4cbe7c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1709364529811-ab0ba31f32e9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      // Deshabilita los gestos de retroceso en dispositivos Android
      // Solo afecta a este componente específico
      gestureEnabled={false}
      gestureDirection="horizontal"
    >

      <Image
        source={{ uri: images[currentImageIndex] }}
        style={styles.banner}
      />

      <Text style={styles.title}>Pretty Usine</Text>

      <View style={styles.grid}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => {
              if (category.title === 'Categorías') {
                navigation.navigate('Categorias');
              } else if (category.title === 'Perfil') {
                navigation.navigate('Perfil');
              } else if (category.title === 'Historial') {
                navigation.navigate('Historial');
              }
            }}
          >
            <Ionicons name={category.icon} size={40} color="#000" />
            <Text style={styles.cardTitle}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="lock-closed" size={24} color="black" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DashboardScreen;
