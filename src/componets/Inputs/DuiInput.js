import React from 'react';
import { TextInputMask } from 'react-native-masked-text';
import { StyleSheet } from 'react-native';

const DuiInput = ({ value, onChangeText }) => (
  <TextInputMask
    style={styles.input}
    type={'custom'}
    options={{
      mask: '99999999-9'
    }}
    placeholder="DUI"
    onChangeText={onChangeText}
    value={value}
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

export default DuiInput;
