import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import styles from '../estilos/DebouncedSearchInputStyles'; // Importa los estilos desde un archivo externo

const DebouncedSearchInput = ({ onSearch, value, onChangeText }) => {
  // Define un estado local para el texto ingresado en el input
  const [text, setText] = useState(value);

  // useEffect para manejar el debouncing del input
  useEffect(() => {
    // Establece un timeout de 500ms antes de llamar a la función onSearch
    const debounceTimeout = setTimeout(() => {
      onSearch(text);
    }, 500);

    // Limpia el timeout si el texto cambia antes de que se complete el tiempo
    return () => clearTimeout(debounceTimeout);
  }, [text, onSearch]);

  // useEffect para actualizar el estado local cuando el valor de `value` cambia desde el componente padre
  useEffect(() => {
    setText(value);
  }, [value]);

  // Función que maneja el cambio de texto en el input
  const handleChangeText = (newText) => {
    setText(newText); // Actualiza el estado local con el nuevo texto
    onChangeText(newText); // Pasa el texto actualizado al componente padre
  };

  return (
    // TextInput con los estilos aplicados y propiedades para manejar cambios de texto y su valor actual
    <TextInput
      style={styles.addressInput}
      placeholder="Dirección" // Placeholder del input
      onChangeText={handleChangeText} // Maneja el evento de cambio de texto
      value={text} // Valor actual del input
    />
  );
};

export default DebouncedSearchInput;
