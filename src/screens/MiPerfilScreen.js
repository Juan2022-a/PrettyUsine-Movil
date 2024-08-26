import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from '../estilos/MiPerfilScreenStyles'; // Ajusta la ruta según tu estructura de archivos
import CustomAlert from '../estilos/CustomAlert'; // Importa el componente de alerta personalizada
import * as Constantes from '../utils/constantes';

const MiPerfilScreen = ({ navigation }) => {
  const ip = Constantes.IP;

  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({
    latitude: 13.6929,
    longitude: -89.2182,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [editando, setEditando] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const nombreRef = useRef(null);
  const usernameRef = useRef(null);
  const correoRef = useRef(null);
  const direccionRef = useRef(null);
  const telefonoRef = useRef(null);

  // Función para obtener y mostrar el perfil del usuario
  const fetchProfile = async () => {
    try {
      const response = await fetch(`${ip}/prettyusine/api/services/public/cliente.php?action=readProfile`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const textResponse = await response.text();

      if (textResponse.startsWith('<')) {
        console.error('Se recibió HTML en lugar de JSON:', textResponse);
        setAlertMessage('El servidor devolvió una página HTML en lugar de los datos esperados. Revisa la URL o contacta al administrador.');
        setAlertVisible(true);
        return;
      }

      const data = JSON.parse(textResponse);

      if (data.status) {
        setNombre(data.dataset.nombre_cliente);
        setUsername(data.dataset.usuario);
        setCorreo(data.dataset.correo_cliente);
        setDireccion(data.dataset.direccion_cliente);
        setTelefono(data.dataset.telefono_cliente);

        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(data.dataset.direccion_cliente)}`;
        const geoResponse = await fetch(url);

        if (!geoResponse.ok) {
          throw new Error(`HTTP error! status: ${geoResponse.status}`);
        }

        const geoData = await geoResponse.json();

        if (geoData.length > 0) {
          const { lat, lon } = geoData[0];
          const newRegion = {
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setRegion(newRegion);
        } else {
          setRegion({
            latitude: 13.6929,
            longitude: -89.2182,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
          setAlertMessage('No se encontró la ubicación');
          setAlertVisible(true);
        }
      } else {
        setAlertMessage(data.error || 'Error desconocido');
        setAlertVisible(true);
      }
    } catch (error) {
      console.error('Fetch Profile Error:', error);
      setAlertMessage('Ocurrió un error al obtener el perfil');
      setAlertVisible(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Función para manejar la actualización de los datos del perfil
  const handleUpdate = async () => {
    if (!nombre || !username || !correo || !direccion || !telefono) {
      setAlertMessage('Todos los campos deben ser llenados');
      setAlertVisible(true);
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('correo', correo);
      formData.append('username', username);
      formData.append('telefono', telefono);
      formData.append('direccion', direccion);
  
      const url = `${ip}/prettyusine/api/services/public/cliente.php?action=editProfile`;
  
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });
  
      const textResponse = await response.text();
  
      if (textResponse.startsWith('<')) {
        console.error('Se recibió HTML en lugar de JSON:', textResponse);
        setAlertMessage('El servidor devolvió una página HTML en lugar de los datos esperados. Revisa la URL o contacta al administrador.');
        setAlertVisible(true);
        return;
      }
  
      const responseJson = JSON.parse(textResponse);
  
      if (responseJson.status === 1) {
        setAlertMessage('Los datos del perfil han sido actualizados exitosamente');
        setAlertVisible(true);
        setEditando(false);
      } else {
        setAlertMessage(responseJson.error || 'No se pudo actualizar el perfil');
        setAlertVisible(true);
      }
    } catch (error) {
      setAlertMessage('Ocurrió un error al actualizar el perfil');
      setAlertVisible(true);
      console.error('Error al actualizar el perfil:', error);
    }
  };

  const handleCancelEdit = () => {
    fetchProfile();
    setEditando(false);
  };

  // Función para obtener la dirección basada en las coordenadas
  const reverseGeocode = async (lat, lon) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.address) {
        const address = `${data.address.road || ''}, ${data.address.city || ''}, ${data.address.country || ''}`;
        setDireccion(address);
      } else {
        setAlertMessage('No se encontró la dirección para esta ubicación');
        setAlertVisible(true);
      }
    } catch (error) {
      console.error('Reverse Geocode Error:', error);
      setAlertMessage('Ocurrió un error al obtener la dirección');
      setAlertVisible(true);
    }
  };

  // Función para manejar el clic en el mapa para cambiar la ubicación
  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    if (editando) {
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(newRegion);
      reverseGeocode(latitude, longitude);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProfile();
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <Text style={styles.title}>Datos personales</Text>

      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' }}
          style={styles.profileImage}
        />
      </View>

      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        editable={editando}
        placeholder="Nombre"
        ref={nombreRef}
      />

      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        editable={editando}
        placeholder="Usuario"
        ref={usernameRef}
      />

      <TextInput
        style={styles.input}
        value={correo}
        onChangeText={setCorreo}
        editable={editando}
        placeholder="Correo"
        ref={correoRef}
      />

      <TextInput
        style={styles.input}
        value={direccion}
        onChangeText={setDireccion}
        editable={editando}
        placeholder="Dirección"
        ref={direccionRef}
      />

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={region}
          onPress={handleMapPress}
        >
          <Marker coordinate={region} />
        </MapView>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={editando ? handleUpdate : () => setEditando(true)}
      >
        <Text style={styles.buttonText}>{editando ? 'Actualizar' : 'Editar'}</Text>
      </TouchableOpacity>

      {editando && (
        <TouchableOpacity
          style={styles.button}
          onPress={handleCancelEdit}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>

      {alertVisible && (
        <CustomAlert
          isVisible={alertVisible}
          message={alertMessage}
          onClose={() => setAlertVisible(false)}
        />
      )}
    </ScrollView>
  );
};

export default MiPerfilScreen;
