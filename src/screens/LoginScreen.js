import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Icon } from 'react-native-elements'; // Importa Icon de react-native-elements
import styles from '../estilos/LoginScreenStyles';
import * as Constantes from '../utils/constantes';

const LoginScreen = ({ navigation }) => {
  const ip = Constantes.IP;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append('correo', email);
      formData.append('clave', password);
      
      const url = `${ip}/prettyusine/api/services/public/cliente.php?action=logIn`;
      console.log('URL solicitada:', url); // Para verificar la URL

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text(); // Obtén la respuesta como texto

      try {
        const data = JSON.parse(responseText); // Intenta parsear la respuesta como JSON
        if (data.status) {
          navigation.navigate('DashboardTabs');
        } else {
          showLoginErrorAlert(); // Mostrar alerta personalizada en caso de error
        }
      } catch (jsonError) {
        console.error('Error al parsear JSON:', jsonError);
        console.error('Respuesta recibida:', responseText);
        Alert.alert('Error', 'Ocurrió un error al procesar la respuesta del servidor');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
    }
  };

  const handleRegisterRedirect = () => {
    navigation.navigate('Register');
  };

  const handleForgotPasswordRedirect = () => {
    navigation.navigate('PasswordRecovery');
  };

  const handleLogout = async () => {
    try {
      const url = `${ip}/prettyusine/api/services/public/cliente.php?action=logOut`;
      console.log('URL solicitada:', url); // Para verificar la URL

      const response = await fetch(url, {
        method: 'GET'
      });

      const responseText = await response.text(); // Obtén la respuesta como texto

      try {
        const data = JSON.parse(responseText); // Intenta parsear la respuesta como JSON
        if (data.status) {
          Alert.alert("Sesión finalizada");
          // Aquí podrías agregar cualquier otra lógica necesaria al cerrar sesión, como limpiar el estado de usuario, etc.
        } else {
          Alert.alert('Error', data.error);
        }
      } catch (jsonError) {
        console.error('Error al parsear JSON:', jsonError);
        console.error('Respuesta recibida:', responseText);
        Alert.alert('Error', 'Ocurrió un error al procesar la respuesta del servidor');
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al cerrar sesión');
    }
  };

  const showLoginErrorAlert = () => {
    Alert.alert(
      'Error de inicio de sesión',
      'Usuario o contraseña incorrectos',
      [
        {
          text: 'OK',
          style: 'default',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      {
        cancelable: true,
        onDismiss: () => console.log('Alert dismissed'),
      }
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../img/iconopretty.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Inicio de sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegisterRedirect}>
        <Text style={styles.registerLink}>¿No tienes cuenta? Crea una</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPasswordRedirect}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="lock-closed" type="ionicon" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;