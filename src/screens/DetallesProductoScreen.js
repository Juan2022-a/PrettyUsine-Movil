import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator, RefreshControl, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import styles from '../estilos/DetallesProductosScreen';
import * as Constantes from '../utils/constantes';

const DetallesProductoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { idProducto } = route.params;
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [cantidadProducto, setCantidadProducto] = useState('');

  const ip = Constantes.IP;

  const fetchProducto = async () => {
    try {
      const formData = new FormData();
      formData.append('idProducto', idProducto);
      const response = await fetch(`${ip}/prettyusine/api/services/public/producto.php?action=readOne`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.status) {
        setProducto(data.dataset);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener los detalles del producto');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const refreshScreen = () => {
    setRefreshing(true);
    fetchProducto();
  };

  useEffect(() => {
    fetchProducto();
  }, []);

  const agregarAlCarrito = async () => {
    const cantidadNumerica = parseInt(cantidadProducto, 10);
    
    if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
      Alert.alert('Error', 'Por favor, ingresa una cantidad válida');
      return;
    }

    if (cantidadNumerica > 5) {
      Alert.alert('Error', 'La cantidad máxima permitida es 5');
      return;
    }

    if (cantidadNumerica > producto.existencias_producto) {
      Alert.alert('Error', `No hay suficiente stock. Solo hay ${producto.existencias_producto} en existencia`);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('idProducto', idProducto);
      formData.append('cantidadProducto', cantidadProducto);

      const response = await fetch(`${ip}/prettyusine/api/services/public/pedido.php?action=createDetail`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status) {
        Alert.alert('Éxito', 'Producto añadido al carrito');
        navigation.navigate('Carrito', { idProducto, cantidadProducto: cantidadNumerica });
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al agregar el producto al carrito');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!producto) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se encontraron detalles del producto</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshScreen} />}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Image
        source={{ uri: `${ip}/prettyusine/api/images/productos/${producto.imagen_producto}` }}
        style={styles.productImage}
      />

      <Text style={styles.title}>{producto.nombre_producto}</Text>
      <Text style={styles.subtitle}>Precio: ${producto.precio_producto}</Text>
      <Text style={styles.subtitle}>Existencias: {producto.existencias_producto}</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cantidad</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese cantidad"
          keyboardType="numeric"
          onChangeText={setCantidadProducto}
          value={cantidadProducto}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={agregarAlCarrito}>
        <Text style={styles.addButtonText}>Añadir al carrito</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DetallesProductoScreen;
