import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import styles from '../estilos/CarritosScreenStyles';  // Importa los estilos desde un archivo externo
import * as Constantes from '../utils/constantes';

const CarritoScreen = ({ navigation, route }) => {
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Estado para controlar el estado de refrescar

  const ip = Constantes.IP;

  // Función para obtener los detalles del carrito desde la API
  const fetchCarrito = async () => {
    try {
      const response = await fetch(`${ip}/PrettyUsine/Api/services/public/pedido.php?action=readDetail`);
      const data = await response.json();
      if (data.status) {
        setCarrito(data.dataset);
        if (data.dataset.length === 0) {
          Alert.alert('Carrito vacío', 'No hay productos en el carrito.');
        }
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener los datos del carrito');
    } finally {
      setLoading(false);
      setRefreshing(false); // Finaliza el estado de refrescar
    }
  };

  // Función para calcular el total del carrito
  const calcularTotalCarrito = () => {
    return carrito.reduce((total, producto) => {
      return total + producto.precio_producto * producto.cantidad_producto;
    }, 0);
  };

  // Función para realizar la compra de todos los productos del carrito
  const handleBuyAll = async () => {
    try {
      const formData = new FormData();
      // Envía la acción para finalizar todos los pedidos
      formData.append('action', 'finishOrderAll');
      
      const response = await fetch(`${ip}/PrettyUsine/Api/services/public/pedido.php?action=finishOrder`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status) {
        Alert.alert(
          'Compra realizada',
          'Gracias por comprar con nosotros',
          [
            { text: 'OK', onPress: () => navigation.navigate('DashboardScreen') }
          ]
        );
        // Actualizar el estado del carrito después de finalizar la compra
        setCarrito([]);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al finalizar la compra');
    }
  };

  // Función para manejar el evento de refrescar
  const onRefresh = useCallback(() => {
    setRefreshing(true); // Establece el estado de refrescar a verdadero
    fetchCarrito(); // Vuelve a cargar los datos del carrito desde la API
  }, []);

  // Efecto para cargar los detalles del carrito al cargar la pantalla o al recibir nuevos parámetros
  useEffect(() => {
    fetchCarrito();

    // Verifica si hay parámetros recibidos al cargar la pantalla
    if (route.params) {
      const { idProducto, cantidadProducto } = route.params;
      // Llama a la función para agregar el producto al carrito (si es necesario)
      // addProductToCarrito(idProducto, cantidadProducto);
    }
  }, [route.params]);

  // Renderizar cada elemento del carrito
  const renderOfertaItem = ({ item }) => (
    <TouchableOpacity
      style={styles.ofertaCard}
      onPress={() => navigation.navigate('Detalles_Producto', { idProducto: item.id_producto })}
    >
      <View style={styles.ofertaDetails}>
        <Text style={styles.ofertaTitle}>{item.nombre_producto}</Text>
        <Text style={styles.ofertaPrice}>Precio Unitario: ${item.precio_producto}</Text>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantity}>Cantidad: {item.cantidad_producto}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Pantalla de carga mientras se obtienen los datos del carrito
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Renderiza la pantalla principal del carrito
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito</Text>
      <FlatList
        data={carrito}
        renderItem={renderOfertaItem}
        keyExtractor={(item, index) => item?.id_producto?.toString() ?? index.toString()} // Asegura que item.id_producto esté definido antes de llamar a toString()
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0000ff']} // Colores de la animación de refrescar en Android
            tintColor="#0000ff" // Color de la animación de refrescar en iOS
          />
        }
      />
      {carrito.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${calcularTotalCarrito().toFixed(2)}</Text>
          <TouchableOpacity style={styles.boton} onPress={handleBuyAll}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Comprar Todo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CarritoScreen;
