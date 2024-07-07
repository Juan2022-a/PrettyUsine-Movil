import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../estilos/HistorialScreenStyles'; // Importa los estilos desde un archivo externo
import * as Constantes from '../utils/constantes';

const HistorialScreen = ({ navigation }) => {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Estado para controlar el estado de refrescar

  const ip = Constantes.IP;

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


 
    // Función para manejar el evento de refrescar
    const onRefresh = useCallback(() => {
      setRefreshing(true); // Establece el estado de refrescar a verdadero
      fetchCarrito(); // Vuelve a cargar los datos del carrito desde la API
    }, []);
  

  


  return (
    <View style={styles.container}>
      {/* Título de la pantalla */}
      <Text style={styles.title}>Historial</Text>
      
    
    </View>
  );
};

export default HistorialScreen;
