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

  // Función para agregar un producto al carrito
  const addProductToCarrito = async (idProducto, cantidadProducto) => {
    try {
      const formData = new FormData();
      formData.append('id_producto', idProducto);
      formData.append('cantidad_producto', cantidadProducto);

      const response = await fetch(`${ip}/PrettyUsine/Api/services/public/pedido.php?action=createDetail`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status) {
        // Si el producto se agregó correctamente, actualizar el estado del carrito
        const productoExistente = carrito.find(item => item.id_producto === idProducto);
        if (productoExistente) {
          const updatedCarrito = carrito.map(item =>
            item.id_producto === idProducto ? { ...item, cantidad_producto: item.cantidad_producto + parseInt(cantidadProducto) } : item
          );
          setCarrito(updatedCarrito);
        } else {
          const nuevoProducto = {
            id_producto: idProducto,
            nombre_producto: data.dataset.nombre_producto,
            precio_producto: parseFloat(data.dataset.precio_producto),
            cantidad_producto: parseInt(cantidadProducto),
          };
          setCarrito([...carrito, nuevoProducto]);
        }
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al agregar el producto al carrito');
    }
  };

  // Función para manejar el cambio de cantidad de un producto en el carrito
  const handleQuantityChange = (item, type) => {
    const updatedCarrito = carrito.map(producto => {
      if (producto.id_producto === item.id_producto) {
        let newCantidad = producto.cantidad_producto;
        if (type === 'increase') {
          newCantidad++;
        } else if (type === 'decrease' && newCantidad > 1) {
          newCantidad--;
        }
        return { ...producto, cantidad_producto: newCantidad };
      }
      return producto;
    });
    setCarrito(updatedCarrito);
  };

  // Función para realizar la compra de un producto del carrito
  const handleBuy = async (item) => {
    try {
      const formData = new FormData();
      formData.append('id_detalle', item.id_detalle);
      
      const response = await fetch(`${ip}/PrettyUsine/Api/services/public/pedido.php?action=finishOrder`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status) {
        Alert.alert(
          'Compra realizada',
          `Has comprado ${item.nombre_producto} (Cantidad: ${item.cantidad_producto}) por $${(item.precio_producto * item.cantidad_producto).toFixed(2)}`,
          [
            { text: 'OK', onPress: () => console.log('Alerta cerrada') }
          ]
        );
        // Actualizar el carrito después de finalizar la compra
        const updatedCarrito = carrito.filter(producto => producto.id_detalle !== item.id_detalle);
        setCarrito(updatedCarrito);
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
      addProductToCarrito(idProducto, cantidadProducto); // Llama a la función para agregar el producto al carrito
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
          <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(item, 'decrease')}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.cantidad_producto}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(item, 'increase')}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boton} onPress={() => handleBuy(item)}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Comprar</Text>
          </TouchableOpacity>
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
    </View>
  );
};

export default CarritoScreen;
