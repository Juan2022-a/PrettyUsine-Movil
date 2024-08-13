import React, { useState } from 'react';
import { View, Text,Image, TextInput, Alert } from 'react-native';
import styles from '../estilos/PinVerificationStyles';
import Button3 from '../componets/Buttons/Button3';
import * as Constantes from '../utils/constantes';

const PinVerificationScreen = ({ route, navigation }) => {
  // Estado para almacenar el PIN ingresado por el usuario
  const [pin, setPin] = useState('');
  // Extraer el email de los parámetros de la ruta
  const { email } = route.params;

  // Función para manejar la verificación del PIN
  const handleVerifyPin = async () => {
    try {
      // Verificar que el PIN no esté vacío
      if (!pin.trim()) {
        Alert.alert('Error', 'Por favor, ingresa el PIN.');
        return;
      }

      // Realizar una solicitud POST al servidor para verificar el PIN
      const response = await fetch(`${Constantes.IP}/prettyusine/api/services/public/cliente.php?action=verificarPin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `correo=${email}&pin=${pin}`,
      });

      const data = await response.json();

      if (data.status === 1) {
        // Si el PIN es válido, mostrar una alerta de éxito y navegar a la pantalla de nueva contraseña
        Alert.alert('Éxito', 'PIN verificado correctamente', [
          { text: 'OK', onPress: () => navigation.navigate('NewPassword', { id_cliente: data.id_cliente, email: email }) }
        ]);
      } else {
        // Si el PIN no es válido, mostrar una alerta
        Alert.alert('Error', data.error || 'PIN inválido o expirado');
      }
    } catch (error) {
      // Mostrar una alerta en caso de error de conexión
      Alert.alert('Error', 'Ocurrió un error en la conexión');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificar PIN</Text>
      <Image source={require('../img/recucontra.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Ingrese el PIN"
        onChangeText={text => setPin(text)}
        value={pin}
        keyboardType="numeric"
      />
      <Button3 style={styles.button} onPress={handleVerifyPin}>
        <Text style={styles.buttonText}>Verificar PIN</Text>
      </Button3>
    </View>
  );
};

export default PinVerificationScreen;
