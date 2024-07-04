import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'; // Añade ActivityIndicator aquí
import styles from '../estilos/MiPerfilScreenStyles'; // Importa los estilos desde un archivo externo
import * as Constantes from '../utils/constantes';

const MiPerfilScreen = () => {
  const ip = Constantes.IP;

  // Estados para los datos del perfil
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');  
  const [direccion, setDireccion] = useState('');
  const [loading, setLoading] = useState(true);

  // Referencias para los TextInput
  const nombreRef = useRef(null);
  const correoRef = useRef(null);
  const telefonoRef = useRef(null);
  const direccionRef = useRef(null);

  // Función para obtener y mostrar el perfil del usuario
  const fetchProfile = async () => {
    try {
      const response = await fetch(`${ip}/prettyusine/api/services/public/cliente.php?action=readProfile`);
      const data = await response.json();

      if (data.status) {
        setNombre(data.dataset.nombre_cliente);
        setCorreo(data.dataset.correo_cliente);
        setTelefono(data.dataset.telefono_cliente);        
        setDireccion(data.dataset.direccion_cliente);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener el perfil');
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar la actualización de los datos del perfil
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('correo', correo);
      formData.append('telefono', telefono);
      formData.append('direccion', direccion);

      const url = `${ip}/prettyusine/api/services/public/cliente.php?action=editProfile`;

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status) {
        Alert.alert('Perfil actualizado', 'Los datos del perfil han sido actualizados exitosamente');
      } else {
        Alert.alert('Error', 'No se pudo actualizar el perfil');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al actualizar el perfil');
    }
  };

  // Función para manejar la cancelación y limpiar los campos
  const handleDelete = () => {
    // Limpiar los estados
    setNombre('');
    setCorreo('');
    setTelefono('');
    setDireccion('');

    // Limpiar los TextInput utilizando las referencias
    nombreRef.current.clear();
    correoRef.current.clear();
    telefonoRef.current.clear();
    direccionRef.current.clear();
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
    <View style={styles.container}>
      {/* Título de la sección */}
      <Text style={styles.title}>Datos Personales</Text>

      {/* Contenedor para la imagen de perfil */}
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' }}
          style={styles.profileImage}
        />
      </View>

      {/* Contenedor para el campo Nombre */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          ref={nombreRef} // Referencia para este campo
          style={styles.input}
          onChangeText={setNombre}
          value={nombre}
        />
      </View>

      {/* Contenedor para el campo Correo */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo</Text>
        <TextInput
          ref={correoRef} // Referencia para este campo
          style={styles.input}
          onChangeText={setCorreo}
          value={correo}
        />
      </View>

      {/* Contenedor para el campo Telefono */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Telefono</Text>
        <TextInput
          ref={telefonoRef} // Referencia para este campo
          style={styles.input}
          onChangeText={setTelefono}
          value={telefono}
        />
      </View>
      {/* Contenedor para el campo Dirección */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Dirección</Text>
        <TextInput
          ref={direccionRef} // Referencia para este campo
          style={styles.input}
          onChangeText={setDireccion}
          value={direccion}
        />
      </View>

      {/* Contenedor para los botones de acción */}
      <View style={styles.buttonContainer}>
        {/* Botón de Actualizar */}
        <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={handleUpdate}>
          <Text style={[styles.buttonText, styles.updateButtonText]}>Actualizar</Text>
        </TouchableOpacity>

        {/* Botón de Cancelar */}
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
          <Text style={[styles.buttonText, styles.deleteButtonText]}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MiPerfilScreen;
