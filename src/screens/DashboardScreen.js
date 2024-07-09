import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from '../estilos/DashboardScreenStyles';

const DashboardScreen = ({ navigation }) => {
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
    { title: 'Categorías', icon: 'albums', color: '#FF6347', route: 'Categorias' },
    { title: 'Perfil', icon: 'person', color: '#87CEEB', route: 'Perfil' },
    { title: 'Historial', icon: 'time', color: '#2169E2', route: 'Historial' }
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
      gestureEnabled={false}
      gestureDirection="horizontal"
    >
      <Text style={styles.title}>Pretty Usine</Text>

      <Image
        source={{ uri: images[currentImageIndex] }}
        style={styles.banner}
      />

    
      <View style={styles.grid}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: category.color }]}
            onPress={() => navigation.navigate(category.route)}
          >
            <Ionicons name={category.icon} size={40} color="#fff" />
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
