import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../estilos/OfertasScreenStyles'; // Importa los estilos desde un archivo externo

// Importa la imagen de "Promo" desde el directorio de imágenes
import PromoImage from '../img/ofertapura.jpg'; // Ajusta la ruta según donde hayas guardado la imagen

const OfertasScreen = ({ navigation }) => {
  // Arreglo de ofertas con objetos de ejemplo
  const ofertas = [
    {
      id: '1',
      title: 'Zapatillas Deportivas Nike',
      description: 'Zapatillas ideales para correr, disponibles en varios colores.',
      image: 'https://i.pinimg.com/736x/2a/cf/5f/2acf5f8b73e26f38bc018e0bafb70875.jpg',
      price: 49.95,
      discount: 30,
    },
    {
      id: '2',
      title: 'Sandalias Verano Adidas',
      description: 'Sandalias cómodas y resistentes para el verano.',
      image: 'https://i.pinimg.com/564x/dc/16/1b/dc161b4d8cb4a0df94f6c15b613aaf3d.jpg',
      price: 29.99,
      discount: 20,
    },
  ];

  // Función para renderizar cada elemento de oferta
  const renderOfertaItem = ({ item }) => (
    <TouchableOpacity
      style={styles.ofertaCard}
      onPress={() => navigation.navigate('DetallesProducto', { producto: item })}
    >
      <Image source={{ uri: item.image }} style={styles.ofertaImage} />
      <View style={styles.ofertaDetails}>
        <Text style={styles.ofertaTitle}>{item.title}</Text>
        <View style={styles.ofertaPriceContainer}>
          <Text style={styles.ofertaPrice}>${item.price.toFixed(2)}</Text>
          {item.discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{item.discount}%</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Imagen de "Promo" */}
      <Image source={PromoImage} style={styles.promoImage} />

      {/* Lista plana de ofertas */}
      <FlatList
        data={ofertas}
        renderItem={renderOfertaItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default OfertasScreen;
