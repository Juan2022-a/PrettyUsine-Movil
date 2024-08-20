import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, ActivityIndicator, ScrollView, RefreshControl, Alert, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { TextInputMask } from 'react-native-masked-text';
import InputMiPerfil from '../componets/Inputs/InputMiPerfil'; // Asegúrate de que esta ruta sea correcta
import styles from '../estilos/MiPerfilScreenStyles'; // Utiliza los estilos existentes, si es necesario
import * as Constantes from '../utils/constantes';

const MiPerfilScreen = () => {
  const ip = Constantes.IP;

  // Estados para los datos del perfil
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

  // Referencias para los TextInput
  const nombreRef = useRef(null);
  const usernameRef = useRef(null);
  const correoRef = useRef(null);
  const direccionRef = useRef(null);
  const telefonoRef = useRef(null);

  // Función para obtener y mostrar el perfil del usuario
  const fetchProfile = async () => {
    try {
      const response = await fetch(`${ip}/prettyusine/api/services/public/cliente.php?action=readProfile`);
      const data = await response.json();

      if (data.status) {
        setNombre(data.dataset.nombre_cliente);
        setUsername(data.dataset.usuario); // Suponiendo que el nombre de usuario está presente en el perfil
        setCorreo(data.dataset.correo_cliente);
        setDireccion(data.dataset.direccion_cliente);
        setTelefono(data.dataset.telefono_cliente);

        // Utiliza Nominatim para obtener las coordenadas reales de la dirección
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(data.dataset.direccion_cliente)}`;
        const geoResponse = await fetch(url);
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
          Alert.alert('Error', 'No se encontró la ubicación');
        }
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error('Fetch Profile Error:', error);
      Alert.alert('Error', 'Ocurrió un error al obtener el perfil');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Función para manejar la actualización de los datos del perfil
  const handleUpdate = async () => {
    if (!nombre || !username || !correo || !direccion || !telefono) {
      Alert.alert('Error', 'Todos los campos deben ser llenados');
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

      const responseJson = await response.json();

      if (responseJson.status === 1) {
        Alert.alert('Perfil actualizado', 'Los datos del perfil han sido actualizados exitosamente');
        setEditando(false); // Desactiva el modo de edición
      } else {
        Alert.alert('Error', responseJson.error || 'No se pudo actualizar el perfil');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al actualizar el perfil');
      console.error('Error al actualizar el perfil:', error);
    }
  };

  // Función para manejar la cancelación y limpiar los campos
  const handleDelete = () => {
    setNombre('');
    setUsername('');
    setCorreo('');
    setDireccion('');
    setTelefono('');

    fetchProfile();
  };

  // Función para obtener la dirección basada en las coordenadas
  const reverseGeocode = async (lat, lon) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.address) {
        const address = `${data.address.road || ''}, ${data.address.city || ''}, ${data.address.country || ''}`;
        setDireccion(address);
      } else {
        Alert.alert('Error', 'No se encontró la dirección para esta ubicación');
      }
    } catch (error) {
      console.error('Reverse Geocode Error:', error);
      Alert.alert('Error', 'Ocurrió un error al obtener la dirección');
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>Datos personales</Text>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' }}
            style={styles.profileImage}
          />
        </View>

        <InputMiPerfil
          label="Nombre"
          value={nombre}
          onChangeText={setNombre}
          editable={editando}
          ref={nombreRef}
        />

        <InputMiPerfil
          label="Usuario"
          value={username}
          onChangeText={setUsername}
          editable={editando}
          ref={usernameRef}
        />

        <InputMiPerfil
          label="Correo"
          value={correo}
          onChangeText={setCorreo}
          editable={editando}
          ref={correoRef}
        />

        <TextInputMask
          type={'custom'}
          options={{
            mask: '9999-9999',
          }}
          value={telefono}
          onChangeText={setTelefono}
          editable={editando}
          style={styles.input}
          placeholder="Teléfono"
          keyboardType="numeric"
          ref={telefonoRef}
        />

        <InputMiPerfil
          label="Dirección"
          value={direccion}
          onChangeText={setDireccion}
          editable={editando}
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
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default MiPerfilScreen;
