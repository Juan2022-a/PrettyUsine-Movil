import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import styles from '../estilos/Terminos&Condiciones';

const TerminosCondicionesScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>¡Bienvenido a Nuestra Comunidad!</Text>
      <Text style={styles.text}>
        Nos complace darte la bienvenida a nuestra aplicación. Antes de sumergirte en la experiencia, es importante que revises nuestros términos y condiciones para garantizar una interacción armoniosa y segura para todos.
      </Text>
      <Text style={styles.subtitle}>1. Uso Adecuado</Text>
      <Text style={styles.text}>
        Al utilizar nuestra aplicación, aceptas utilizarla de manera responsable y respetuosa con los demás usuarios. No se tolerarán comportamientos inapropiados, ofensivos o ilegales.
      </Text>
      <Text style={styles.subtitle}>2. Privacidad y Seguridad</Text>
      <Text style={styles.text}>
        La privacidad y seguridad de nuestros usuarios es nuestra máxima prioridad. Nos comprometemos a proteger tus datos personales y a garantizar un entorno seguro para todas las interacciones.
      </Text>
      <Text style={styles.subtitle}>3. Contenido y Propiedad Intelectual</Text>
      <Text style={styles.text}>
        Todo el contenido proporcionado en nuestra aplicación está sujeto a derechos de propiedad intelectual. No está permitido utilizar, copiar o distribuir dicho contenido sin autorización previa.
      </Text>
      {/* Puedes seguir añadiendo más secciones según sea necesario */}
    </ScrollView>
  );
};


export default TerminosCondicionesScreen;
