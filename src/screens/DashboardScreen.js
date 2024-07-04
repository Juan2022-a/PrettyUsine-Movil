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
    { title: 'Ofertas', icon: 'gift-outline' },
    { title: 'Historial', icon: 'time-outline' }
  ];

  const images = [
    'https://images.pexels.com/photos/5989894/pexels-photo-5989894.jpeg',
    'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/20348034/pexels-photo-20348034/free-photo-of-telefono-inteligente-tecnologia-negro-samsung.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/12563780/pexels-photo-12563780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
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

      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.grid}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => {
              if (category.title === 'Categorías') {
                navigation.navigate('Categorias');
              } else if (category.title === 'Ofertas') {
                navigation.navigate('Ofertas');
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
