import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const Button3 = ({ onPress, children, style }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={[styles.button, style]} 
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007bff', // Color de fondo del botón
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    maxWidth: 300,
  },
  buttonText: {
    color: '#fff', // Color del texto
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Button3;
