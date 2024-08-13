// CardOferta.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../estilos/OfertasScreenStyles'; // Asegúrate de que la ruta sea correcta
import * as Constantes from '../../utils/constantes';

const ip = Constantes.IP;

const CardOferta = ({ oferta, onPress }) => (
  <TouchableOpacity
    style={styles.ofertaCard}
    onPress={onPress}
  >
    <Image source={{ uri: `${ip}/Expo_Comodo/api/images/productos/${oferta.imagen}` }} style={styles.ofertaImage} />
    <View style={styles.ofertaDetails}>
      <Text style={styles.ofertaTitle}>{oferta.nombre_producto}</Text>
      <Text style={styles.ofertaDescription}>{oferta.nombre_genero}</Text>
      <View style={styles.ofertaPriceContainer}>
        <Text style={styles.ofertaPrice}>${oferta.precio}</Text>
        <Text style={styles.discountText}>-{oferta.valor}%</Text>
        {oferta.descuento > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{oferta.descuento}%</Text>
          </View>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

export default CardOferta;
