import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Easing, Image } from 'react-native';
import Icon from '../img/iconopretty.png'; // Ruta de la imagen de splash screen
import styles from '../estilos/SplashScreenStyles';

export default function SplashScreen() {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 2.4, // Escala de zoom del 100% al 200%
      duration: 500, // Duración de la animación en milisegundos
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [scaleValue]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, { transform: [{ scale: scaleValue }] }]}>
        <Image source={Icon} style={styles.image} />
      </Animated.View>
    </View>
  );
}
