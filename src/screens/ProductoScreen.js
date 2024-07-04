import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import styles from '../estilos/ProductoScreenStyles';
import * as Constantes from '../utils/constantes';

const ProductoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { idCategoria } = route.params;
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const ip = Constantes.IP;

  const fetchProducts = async () => {
    try {
      const formdData = new FormData();
      console.log('valor de id categoria', idCategoria);
      formdData.append('idCategoria', idCategoria);
      const response = await fetch(`${ip}/fontechpriv/api/services/public/producto.php?action=readProductosCategoria`, {
        method: 'POST',
        body: formdData,
      });
      const data = await response.json();
      if (data.status) {
        setProducts(data.dataset);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener los productos');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  const filteredProducts = products.filter((product) =>
    product.nombre_producto.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleVerMas = (product) => {
    navigation.navigate('DetallesProducto', { idProducto: product.id_producto });
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
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#000" style={styles.searchIcon} />
        <TextInput
          placeholder="Busca tus productos..."
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <View style={styles.grid}>
        {filteredProducts.map((product, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={() => handleVerMas(product)}>
            <Image source={{ uri: `${ip}/fontechpriv/api/images/productos/${product.imagen}` }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{product.nombre_producto}</Text>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Ver más</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default ProductoScreen;
