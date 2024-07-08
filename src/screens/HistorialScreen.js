import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, RefreshControl } from 'react-native';
import styles from '../estilos/HistorialScreenStyles';  // Importa los estilos desde un archivo externo
import * as Constantes from '../utils/constantes';

const HistorialScreen = () => {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Estado para controlar el estado de refrescar

  const ip = Constantes.IP; // Constante para la dirección IP del servidor

  // Función para obtener el historial de compras desde la API
  const fetchHistorial = async () => {
    try {
      const response = await fetch(`${ip}/PrettyUsine/Api/services/public/pedido.php?action=readHistorials`);
      const data = await response.json();

      if (data.status) {
        setHistorial(data.dataset);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error fetching historial:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Función para manejar el evento de refrescar
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchHistorial();
  }, []);

  // Efecto para cargar el historial de compras al cargar la pantalla
  useEffect(() => {
    fetchHistorial();
  }, []);

  // Renderizar cada elemento del historial de compras
  const renderPedidoItem = ({ item }) => (
    <View style={styles.pedidoCard}>
      <Image
        source={{ uri: `${ip}/PrettyUsine/images/productos/${item.imagen_producto}` }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.nombre_producto}</Text>
        <Text style={styles.productInfo}>Precio: ${item.precio_producto}</Text>
        <Text style={styles.productInfo}>Cantidad: {item.cantidad_producto}</Text>
        <Text style={styles.productInfo}>Fecha: {item.fecha_registro}</Text>
      </View>
    </View>
  );

  // Pantalla de carga mientras se obtienen los datos del historial de compras
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Renderiza la pantalla principal del historial de compras
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Compras</Text>
      <FlatList
        data={historial}
        renderItem={renderPedidoItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0000ff']}
            tintColor="#0000ff"
          />
        }
      />
    </View>
  );
};

export default HistorialScreen;
