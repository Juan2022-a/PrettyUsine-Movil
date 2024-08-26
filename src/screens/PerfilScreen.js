import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; // Importa Ionicons desde Expo
import { FontAwesome } from '@expo/vector-icons'; // Importa FontAwesome desde Expo
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation desde react-navigation
import styles from '../estilos/PerfilScreenStyles'; // Importa estilos desde un archivo externo
import HistorialScreen from './HistorialScreen';
import * as Constantes from '../utils/constantes';


const PerfilScreen = () => {
  const ip = Constantes.IP;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [time, setTime] = useState(new Date());
  const [userName, setUserName] = useState(''); // Estado para el nombre del cliente
  const navigation = useNavigation(); // Obtiene la navegación actual desde react-navigation
    
  useEffect(() => {
    // Obtener el nombre del cliente al cargar la pantalla
    const fetchUserName = async () => {
      try {
        const response = await fetch(`${ip}/prettyusine/api/services/public/cliente.php?action=readProfile`);
        const data = await response.json();
        
        if (data.status) {
          setUserName(data.dataset.nombre_cliente);
        } else {
          Alert.alert('Error', data.error);
        }
      } catch (error) {
        Alert.alert('Error', 'Ocurrió un error al obtener el perfil');
      }
    };

    fetchUserName();


    const timeIntervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
+      clearInterval(timeIntervalId);
    };
  }, []);

  // Función para abrir enlace de Facebook
  const abrirFacebook = () => {
    Linking.openURL('https://www.youtube.com');
  };

    // Función para navegar a la pantalla 'MiPerfil'
    const handleHistorialPress = () => {
      navigation.navigate('Historial');
    };

  // Función para navegar a la pantalla 'MiPerfil'
  const handleMiPerfilPress = () => {
    navigation.navigate('MiPerfil');
  };

  // Función para navegar a la pantalla 'TerminosyCondiciones'
  const handleTerminosCondicionesPress = () => {
    navigation.navigate('TerminosyCondiciones'); // Asegúrate de que el nombre coincida con la ruta de navegación
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' }}
          style={styles.profileImage}
        />
      <Text style={styles.welcomeText}>{userName}</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={handleMiPerfilPress}>
          <MenuItem title="Mi perfil" icon="person-outline" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHistorialPress}>
        <MenuItem title="Historial" icon="settings-outline" />
        </TouchableOpacity>
      </View>

      <View style={styles.socialContainer}>
        <Text style={styles.socialTitle}>Nuestras redes sociales</Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity onPress={abrirFacebook}>
            <FontAwesome name="facebook" size={30} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="instagram" size={30} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="whatsapp" size={30} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const MenuItem = ({ title, icon }) => (
  <View style={styles.menuItem}>
    <Ionicons name={icon} size={24} color="#000" />
    <Text style={styles.menuItemText}>{title}</Text>
  </View>
);



export default PerfilScreen;
