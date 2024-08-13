import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import styles from '../estilos/RecuperacionScreenStyles';
import Button3 from '../componets/Buttons/Button3';
import * as Constantes from '../utils/constantes';

const PasswordRecoveryScreen = ({ navigation }) => {
  // Estado para almacenar el email ingresado por el usuario
  const [email, setEmail] = useState('');

  // Función para manejar el proceso de recuperación de contraseña
  const handleRecovery = async () => {
    // Verifica que el campo de email no esté vacío
    if (!email.trim()) {
      Alert.alert('Error', 'Por favor, ingresa tu correo electrónico.');
      return;
    }

    try {
      // Realizar una solicitud POST al servidor para solicitar el PIN de recuperación
      const response = await fetch(`${Constantes.IP}/prettyusine/api/services/public/cliente.php?action=solicitarPinRecuperacion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `correo=${email}`,
      });

      const data = await response.json();

      if (data.status === 1) {
        // Si la solicitud es exitosa, mostrar un mensaje de éxito y navegar a la pantalla de verificación de PIN
        Alert.alert('Éxito', 'Se ha enviado un PIN a tu correo electrónico', [
          { text: 'OK', onPress: () => navigation.navigate('PinVerification', { email }) }
        ]);
      } else {
        // Si hay un error, mostrar un mensaje de error
        Alert.alert('Error', data.error || 'Ocurrió un error al solicitar el PIN');
      }
    } catch (error) {
      // Mostrar un mensaje de error si hay un problema de conexión
      Alert.alert('Error', 'Ocurrió un error en la conexión');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar contraseña</Text>
      {/* Imagen de recuperación de contraseña */}
      <Image source={require('../img/recucontra.png')} style={styles.logo} />
      {/* Campo de entrada para el email */}
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      {/* Botón para enviar la solicitud de recuperación */}
      <Button3 style={styles.button} onPress={handleRecovery}>
        <Text style={styles.buttonText}>Enviar PIN de recuperación</Text>
      </Button3>
      {/* Enlace para volver a la pantalla de inicio de sesión */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Volver al inicio de sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordRecoveryScreen;
