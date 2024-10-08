import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import styles from '../estilos/CategoriaScreenStyles';
import * as Constantes from '../utils/constantes';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const ip = Constantes.IP;

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${ip}/prettyusine/api/services/public/categoria.php?action=readAll`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.status) {
        setCategories(data.dataset);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener las categorías');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchCategories();
  };

  const filteredCategories = categories.filter((category) =>
    category.nombre_categoria.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleVerMas = (category) => {
    navigation.navigate('Producto', { idCategoria: category.id_categoria });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={['#FF6347']} // Colores de la animación de recarga
          tintColor="#FF6347" // Color del borde del control de recarga
        />
      }
    >
      <Text style={styles.title}>Categorías</Text>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar categorías..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      <View style={styles.grid}>
        {filteredCategories.map((category, index) => {
          const imageUrl = `${ip}/prettyusine/api/images/categorias/${category.imagen_categoria}`;
          console.log(imageUrl, 'valor url');  // Verifica la URL de la imagen

          return (
            <TouchableOpacity key={index} style={styles.card} onPress={() => handleVerMas(category)}>
              {category.imagen_categoria ? (
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.cardImage}
                  onError={() => Alert.alert('Error', 'No se pudo cargar la imagen')}
                />
              ) : (
                <Text style={styles.cardTitle}>Imagen no disponible</Text>
              )}
              <Text style={styles.cardTitle}>{category.nombre_categoria}</Text>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Ver más</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;
