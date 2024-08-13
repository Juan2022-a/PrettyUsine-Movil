import React from 'react';
import { TextInputMask } from 'react-native-masked-text';
import { StyleSheet } from 'react-native';

const PhoneInput = ({ value, onChangeText }) => (
  <TextInputMask
    style={styles.input}
    type={'custom'}
    options={{
      mask: '9999-9999'
    }}
    placeholder="Teléfono"
    onChangeText={onChangeText}
    value={value}
    keyboardType="phone-pad"
  />
);

const styles = StyleSheet.create({
  input: {
    width: '75%',
    backgroundColor: '#f0f0f0',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
});

export default PhoneInput;
