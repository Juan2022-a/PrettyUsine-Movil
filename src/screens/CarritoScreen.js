import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, RefreshControl, TextInput } from 'react-native';
import styles from '../estilos/CarritosScreenStyles'; // Importa los estilos desde un archivo externo
import * as Constantes from '../utils/constantes';

const CarritoScreen = ({ navigation, route }) => {
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [direccion, setDireccion] = useState('');

  const ip = Constantes.IP;

  // Función para obtener los detalles del carrito desde la API
  const fetchCarrito = async () => {
    try {
      setRefreshing(true);
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
      setRefreshing(false);
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
            { text: 'OK', onPress: () => navigation.navigate('Dashboard') }
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
    setRefreshing(true);
    fetchCarrito();
  }, []);

  // Efecto para cargar los detalles del carrito al cargar la pantalla o al recibir nuevos parámetros
  useEffect(() => {
    fetchCarrito();
    setRefreshing(true);
    if (route.params) {
      const { idProducto, cantidadProducto } = route.params;
    }
  }, [route.params]);

  // Función asincrónica para eliminar un elemento del carrito por su ID.
  const removeItem = async (id) => {
    try {
      const FORM = new FormData();
      FORM.append('idDetalle', id);  // Verifica que el nombre del campo sea correcto
      const DATA = await fetch(`${ip}/PrettyUsine/Api/services/public/pedido.php?action=deleteDetail`, {
        method: 'POST',
        body: FORM,
      }).then(res => res.json());
      if (DATA.status) {
        Alert.alert('Éxito', DATA.message);
        setLoading(true);
        setCarrito([]);
        fetchCarrito();
      } else {
        Alert.alert('Error', DATA.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al eliminar el elemento');
    }
  };

  // Función asincrónica para actualizar la cantidad de un elemento del carrito por su ID.
  const updateItemQuantity = async (id, quantity) => {
    try {
      const FORM = new FormData();
      FORM.append('idDetalle', id);  // Verifica que el nombre del campo sea correcto
      FORM.append('cantidadProducto', quantity);  // Verifica que el nombre del campo sea correcto
      const DATA = await fetch(`${ip}/PrettyUsine/Api/services/public/pedido.php?action=updateDetail`, {
        method: 'POST',
        body: FORM,
      }).then(res => res.json());
      if (DATA.status) {
        console.log(DATA.message);
        setLoading(true);
        fetchCarrito();
      } else {
        console.log(DATA.error)
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al actualizar la cantidad');
    }
  };

  // Renderizar cada elemento del carrito
  const renderOfertaItem = ({ item }) => (
    <View style={styles.ofertaCard}>
      <TouchableOpacity onPress={() => navigation.navigate('Detalles_Producto', { idProducto: item.id_producto })}>
        <View style={styles.ofertaDetails}>
          <Text style={styles.ofertaTitle}>{item.nombre_producto}</Text>
          <Text style={styles.ofertaPrice}>Precio Unitario: ${item.precio_producto}</Text>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantity}>Cantidad: {item.cantidad_producto}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.quantityControl}>
        <TouchableOpacity onPress={() => updateItemQuantity(item.id_detalle, item.cantidad_producto - 1)}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateItemQuantity(item.id_detalle, item.cantidad_producto + 1)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeItem(item.id_detalle)}>
          <Text style={styles.removeButton}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Carrito</Text>
      </View>
      <FlatList
        data={carrito}
        renderItem={renderOfertaItem}
        keyExtractor={(item, index) => item?.id_detalle?.toString() ?? index.toString()}  // Cambiado a id_detalle
        ListEmptyComponent={<Text style={styles.emptyText}>El carrito está vacío</Text>}
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
      <View style={styles.summaryContainer}>
        
        <Text style={styles.totalText}>TOTAL: ${calcularTotalCarrito().toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleBuyAll}>
          <Text style={styles.checkoutButtonText}>FINALIZAR COMPRA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CarritoScreen;
