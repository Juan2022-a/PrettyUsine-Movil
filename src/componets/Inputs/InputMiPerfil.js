import React, { forwardRef } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../../estilos/MiPerfilScreenStyles'; // Asegúrate de que esta ruta sea correcta

const InputMiPerfil = forwardRef(({ label, value, onChangeText, editable }, ref) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      ref={ref}
      style={styles.input}
      onChangeText={onChangeText}
      value={value}
      editable={editable}
    />
  </View>
));

export default InputMiPerfil;
