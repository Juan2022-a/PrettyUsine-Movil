import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../../estilos/CarritoScreenStyles'; // Asegúrate de la ruta correcta
import * as Constantes from '../../utils/constantes';

const ip = Constantes.IP; // Define la URL base aquí, asegúrate de reemplazar 'your-server-ip' con la IP correcta

const CardCarrito = ({ item, onIncrease, onDecrease, onDelete }) => {
  const imageUrl = `${ip}/Expo_Comodo/api/images/productos/${item.imagen}`;

  return (
    <TouchableOpacity style={styles.ofertaCard}>
      <Image source={{ uri: imageUrl }} style={styles.ofertaImage} />

      <View style={styles.ofertaDetails}>
        <Text style={styles.ofertaTitle}>{item.nombre_producto}</Text>
        <Text style={styles.ofertaPrice}>Precio Unitario: ${item.precio_unitario}</Text>
        {item.valor_oferta && (
          <Text style={styles.ofertaPrice}>Oferta: %{item.valor_oferta}</Text>
        )}
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={() => onDecrease(item)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.cantidad}</Text>
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={() => onIncrease(item)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={() => onDelete(item.id_detalle_reserva)}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardCarrito;
