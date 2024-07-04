import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator, RefreshControl, TextInput, ScrollView } from 'react-native'; // Asegúrate de importar ScrollView de 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import styles from '../estilos/DetallesProductosScreen'; // Importa los estilos desde un archivo externo
import * as Constantes from '../utils/constantes';

const DetallesProductoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { idProducto } = route.params;
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [cantidadProducto, setCantidadProducto] = useState(''); // Inicializar con una cadena vacía para que el campo esté vacío inicialmente

  const ip = Constantes.IP;

  // Función para obtener los detalles del producto desde la API
  const fetchProducto = async () => {
    try {
      const formData = new FormData();
      formData.append('idProducto', idProducto);
      const response = await fetch(`${ip}/fontechpriv/api/services/public/producto.php?action=readOne`, {
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

  // Función para refrescar la pantalla
  const refreshScreen = () => {
    setRefreshing(true);
    fetchProducto();
  };

  useEffect(() => {
    fetchProducto();
  }, []);

  // Función para agregar el producto al carrito
  const agregarAlCarrito = async () => {
    const cantidadNumerica = parseInt(cantidadProducto, 10);
    if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
      Alert.alert('Error', 'Por favor, ingresa una cantidad válida');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('idProducto', idProducto);
      formData.append('cantidadProducto', cantidadProducto);

      const response = await fetch(`${ip}/fontechpriv/api/services/public/pedido.php?action=createDetail`, {
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
      Alert.alert('Error', 'Ocurrió un error al agregar el producto al carrito ojo');
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
    <ScrollView contentContainerStyle={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshScreen} />
        }
      ></ScrollView>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Image source={{ uri: `${ip}/fontechpriv/api/images/productos/${producto.imagen}` }} style={styles.image} />

      <Text style={styles.title}>{producto.nombre_producto}</Text>
      <Text style={styles.description}>{producto.descripcion}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Marca:</Text>
          <Text style={styles.detailsValue}>{producto.marca}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Almacenamiento Interno:</Text>
          <Text style={styles.detailsValue}>{producto.capacidad_memoria_interna_celular}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Ram:</Text>
          <Text style={styles.detailsValue}>{producto.ram_celular}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Tamaño de la pantalla:</Text>
          <Text style={styles.detailsValue}>{producto.pantalla_tamaño}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Cámara trasera:</Text>
          <Text style={styles.detailsValue}>{producto.camara_trasera_celular}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Cámara Frontal:</Text>
          <Text style={styles.detailsValue}>{producto.camara_frontal_celular}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Procesador:</Text>
          <Text style={styles.detailsValue}>{producto.procesador_celular}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsLabel}>Sistema operativo:</Text>
          <Text style={styles.detailsValue}>{producto.sistema_operativo_celular}</Text>
        </View>
      </View>

      <View style={styles.pricingInfoContainer}>
        <View style={styles.pricingInfoRow}>
          <Text style={styles.pricingInfoLabel}>Precio unitario (US$):</Text>
          <Text style={styles.pricingInfoValue}>{producto.precio}</Text>
        </View>
        <View style={styles.pricingInfoRow}>
          <Text style={styles.pricingInfoLabel}>Existencias:</Text>
          <Text style={styles.pricingInfoValue}>{producto.existencias}</Text>
        </View>
        <View style={styles.pricingInfoRow}>
          <Text style={styles.pricingInfoLabel}>Descuento:</Text>
          <Text style={styles.pricingInfoValue}>{producto.valor_oferta}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Cantidad</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            keyboardType="numeric"
            onChangeText={setCantidadProducto}
            value={cantidadProducto.toString()}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={agregarAlCarrito}>
        <Text style={styles.addButtonText}>Añadir al carrito</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DetallesProductoScreen;
