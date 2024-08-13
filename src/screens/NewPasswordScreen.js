import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import styles from '../estilos/NewPasswordStyle';
import Button3 from '../componets/Buttons/Button3';
import * as Constantes from '../utils/constantes';

const NewPasswordScreen = ({ route, navigation }) => {
  const [newPassword, setNewPassword] = useState(''); // Estado para la nueva contraseña
  const [confirmPassword, setConfirmPassword] = useState(''); // Estado para confirmar la nueva contraseña
  const [showNewPassword, setShowNewPassword] = useState(false); // Estado para mostrar/ocultar la nueva contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar la confirmación de la contraseña
  const { id_cliente, email } = route.params; // Obtiene el id_cliente y el email de los parámetros de la ruta

  // Función para manejar el cambio de contraseña
  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) { // Verifica que ningún campo esté vacío
      Alert.alert('Error', 'Por favor, complete todos los campos');
      return;
    }

    if (newPassword !== confirmPassword) { // Verifica que las contraseñas coincidan
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (newPassword.length < 6) { // Verifica que la nueva contraseña tenga al menos 6 caracteres
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      // Hace una solicitud para cambiar la contraseña
      const response = await fetch(`${Constantes.IP}/prettyusine/api/services/public/cliente.php?action=cambiarClaveConPin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id_cliente=${id_cliente}&nuevaClave=${newPassword}`, // Envía el id_cliente y la nueva contraseña en el cuerpo de la solicitud
      });

      const data = await response.json();

      if (data.status === 1) { // Verifica si la solicitud fue exitosa
        Alert.alert('Éxito', 'Contraseña cambiada exitosamente', [
          { text: 'OK', onPress: () => navigation.navigate('Login') } // Navega a la pantalla de login después de mostrar el mensaje de éxito
        ]);
      } else {
        Alert.alert('Error', data.error || 'Ocurrió un error al cambiar la contraseña');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error en la conexión');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambiar contraseña</Text>
      <Image source={require('../img/recucontra.png')} style={styles.logo} />
      <View style={styles.passwordContainer}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Nueva contraseña"
          onChangeText={text => setNewPassword(text)} // Actualiza el estado de newPassword cuando cambia el texto
          value={newPassword}
          secureTextEntry={!showNewPassword} // Asegura que la contraseña esté oculta si showNewPassword es falso
        />
        <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.eyeIcon}>
          <Ionicons name={showNewPassword ? "eye" : "eye-off"} size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Confirmar nueva contraseña"
          onChangeText={text => setConfirmPassword(text)} // Actualiza el estado de confirmPassword cuando cambia el texto
          value={confirmPassword}
          secureTextEntry={!showConfirmPassword} // Asegura que la contraseña esté oculta si showConfirmPassword es falso
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
          <Ionicons name={showConfirmPassword ? "eye" : "eye-off"} size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <Button3 style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Cambiar Contraseña</Text>
      </Button3>
    </View>
  );
};

export default NewPasswordScreen;
