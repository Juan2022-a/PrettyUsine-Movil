import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "react-native-elements"; // Importa Icon de react-native-elements
import styles from "../estilos/DashboardScreenStyles";
import * as Constantes from "../utils/constantes";

const DashboardScreen = ({ navigation }) => {
  const ip = Constantes.IP;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = async () => {
    try {
      const url = `${ip}/prettyusine/api/services/public/cliente.php?action=logOut`;
      console.log("URL solicitada:", url); // Para verificar la URL

      const response = await fetch(url, {
        method: "GET",
      });

      const responseText = await response.text(); // Obtén la respuesta como texto

      try {
        const data = JSON.parse(responseText); // Intenta parsear la respuesta como JSON
        if (data.status) {
          Alert.alert("Sesión finalizada", "Te has cerrado sesión con éxito", [
            { text: "OK", onPress: () => navigation.navigate("Login") }, // Redirige al LoginScreen después de confirmar la alerta
          ]);
        } else {
          Alert.alert("Error", data.error);
        }
      } catch (jsonError) {
        console.error("Error al parsear JSON:", jsonError);
        console.error("Respuesta recibida:", responseText);
        Alert.alert(
          "Error",
          "Ocurrió un error al procesar la respuesta del servidor"
        );
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al cerrar sesión");
    }
  };

  const categories = [
    {
      title: "Categorías",
      icon: "albums",
      color: "#FFF",
      route: "Categorias",
    },
    { title: "Perfil", icon: "person", color: "#FFF", route: "Perfil" },
    { title: "Historial de compras", icon: "mail", color: "#FFF", route: "Historial" },
  ];

  const images = [
    "https://images.unsplash.com/photo-1713423826277-46c52a8438d5?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1710678563445-62c347a244d0?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1686050415724-bc5fae4cbe7c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1709364529811-ab0ba31f32e9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      gestureEnabled={false}
      gestureDirection="horizontal"
    >
      <Text style={styles.title}>Pretty Usine</Text>

      <Image
        source={{ uri: images[currentImageIndex] }}
        style={styles.banner}
      />

      <View style={styles.grid}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: category.color }]}
            onPress={() => navigation.navigate(category.route)}
          >
            <Ionicons name={category.icon} size={40} color="#000" />
            <Text style={styles.cardTitle}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DashboardScreen;
