import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DebouncedSearchInput from '../screens/DebouncedSearchInput';
import CustomAlert from '../estilos/CustomAlert'; // Importa el componente de alerta personalizada
import styles from '../estilos/RegisterScreenStyles'; // Ajusta la ruta según tu estructura de archivos
import * as Constantes from '../utils/constantes';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dui, setDui] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState({
    latitude: 13.69294,  // Latitud de San Salvador, El Salvador
    longitude: -89.21819, // Longitud de San Salvador, El Salvador
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const navigation = useNavigation();
  const ip = Constantes.IP;

  const handleRegister = async () => {
    // Validación de los campos
    if (
      !name.trim() ||
      !email.trim() ||
      !dui.trim() ||
      !telefono.trim() ||
      !password.trim() ||
      !confirmarClave.trim() ||
      !address.trim()
    ) {
      setAlertMessage('Debes llenar todos los campos');
      setAlertVisible(true);
      return;
    }
  
    // Validación del formato del nombre (solo letras)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      setAlertMessage('El nombre solo puede contener letras');
      setAlertVisible(true);
      return;
    }
  
    // Validación del formato del teléfono (####-####)
    const phoneRegex = /^\d{4}-\d{4}$/;
    if (!phoneRegex.test(telefono)) {
      setAlertMessage('El teléfono debe tener el formato ####-####');
      setAlertVisible(true);
      return;
    }
  
    // Validación del formato del DUI (12345678-9)
    const duiRegex = /^\d{8}-\d{1}$/;
    if (!duiRegex.test(dui)) {
      setAlertMessage('El DUI debe tener el formato 12345678-9' + ' (Verficar que lleve - )');
      setAlertVisible(true);
      return;
    }
  
    // Validación de la contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*()_+{}[\]|\\:;,.<>?`~]).{8,20}$/;
    if (!passwordRegex.test(password)) {
      setAlertMessage('La contraseña debe tener entre 8 y 20 caracteres, contener al menos una letra mayúscula, dos números y un carácter especial');
      setAlertVisible(true);
      return;
    }
  
    if (password !== confirmarClave) {
      setAlertMessage('Las contraseñas no coinciden');
      setAlertVisible(true);
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('nombreCliente', name);
      formData.append('correoCliente', email);
      formData.append('direccionCliente', address);
      formData.append('duiCliente', dui);
      formData.append('telefonoCliente', telefono);
      formData.append('claveCliente', password);
      formData.append('confirmarClave', confirmarClave);
  
      const response = await fetch(`${ip}/prettyusine/api/services/public/cliente.php?action=signUpMovil`, {
        method: 'POST',
        body: formData,
      });
  
      const responseText = await response.text(); // Cambia a text() para obtener HTML
      if (response.ok) {
        setAlertMessage('Usuario creado correctamente');
        setAlertVisible(true);
        navigation.navigate('Login');
      } else {
        setAlertMessage(`Error: ${responseText}`);
        setAlertVisible(true);
      }
    } catch (error) {
      setAlertMessage('Ocurrió un error al intentar crear el usuario');
      setAlertVisible(true);
    }
  };  

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la ubicación');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const handleLoginRedirect = () => {
    navigation.navigate('Login');
  };

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({
      ...location,
      latitude,
      longitude,
    });

    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`);
      if (response.data && response.data.display_name) {
        const formattedAddress = response.data.display_name;
        setAddress(formattedAddress);
      } else {
        setAddress('Dirección no disponible');
      }
    } catch (error) {
      console.error('Error al obtener la dirección:', error);
      setAddress('Error al obtener la dirección');
    }
  };

  const handleSearchAddress = async (text) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(text)}&format=json&addressdetails=1`);
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setLocation({
          ...location,
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        });
      }
    } catch (error) {
      console.error('Error al buscar la dirección:', error);
    }
  };

  const handleClearAddress = () => {
    setAddress('');
    setLocation({
      latitude: 13.69294,  // Latitud de San Salvador, El Salvador
      longitude: -89.21819, // Longitud de San Salvador, El Salvador
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const handleAddressChange = (text) => {
    setAddress(text);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={require('../img/iconopretty.png')} style={styles.logo} />
        <Text style={styles.title}>Registro</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        onChangeText={text => setName(text)}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Dui"
        onChangeText={text => setDui(text)}
        value={dui}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefono"
        onChangeText={text => setTelefono(text)}
        value={telefono}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Contraseña"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
          <Icon name={passwordVisible ? "eye" : "eye-off"} size={24} color="grey" />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirmar contraseña"
          onChangeText={text => setConfirmarClave(text)}
          value={confirmarClave}
          secureTextEntry={!confirmPasswordVisible}
        />
        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} style={styles.eyeIcon}>
          <Icon name={confirmPasswordVisible ? "eye" : "eye-off"} size={24} color="grey" />
        </TouchableOpacity>
      </View>
      <View style={styles.addressContainer}>
        <DebouncedSearchInput
          onSearch={handleSearchAddress}
          value={address}
          onChangeText={handleAddressChange}
        />
        <TouchableOpacity style={styles.clearButton} onPress={handleClearAddress}>
          <Text style={styles.clearButtonText}>Limpiar</Text>
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.map}
        region={location}
        onPress={handleMapPress}
      >
        <Marker coordinate={location} />
      </MapView>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLoginRedirect}>
        <Text style={styles.loginRedirectText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
      <CustomAlert
        isVisible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </ScrollView>
  );
};

export default RegisterScreen;