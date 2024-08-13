// LogOut.js
import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LogOut = ({ onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <View style={styles.content}>
        <Ionicons name="log-out-outline" size={30} color="#000" /> 
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0)', // Fondo completamente transparente
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: 'transparent', // Sin sombra
    elevation: 0, // Sin elevación
    margin: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default LogOut;
