import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../estilos/ProductoScreenStyles'; // Asegúrate de que la ruta es correcta
import Button2 from '../Buttons/Button2'; // Asegúrate de que la ruta es correcta

const Cards1 = ({ item, onPress }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <Button2
        title="Ver más"
        onPress={onPress}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </View>
  );
};

export default Cards1;
