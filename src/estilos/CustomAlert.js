// CustomAlert.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const CustomAlert = ({ isVisible, message, onClose }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} animationIn="zoomIn" animationOut="zoomOut">
      <View style={styles.alertContainer}>
        <Image source={require('../img/alertaerrorohno.png')} style={styles.alertImage} />
        <Text style={styles.alertMessage}>{message}</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  alertImage: {
    width: 200,
    height: 80,
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#3046BC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CustomAlert;
