import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import styles from '../estilos/RecuperacionScreenStyles';

const PasswordRecoveryScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleRecovery = () => {

    console.log('Se enviará un correo electrónico de recuperación a:', email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar contraseña</Text>
      <Image source={require('../img/recuperarconra.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleRecovery}>
        <Text style={styles.buttonText}>Enviar correo de recuperación</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Volver al inicio de sesión</Text>
      </TouchableOpacity>
    </View>
  );
};



export default PasswordRecoveryScreen;
