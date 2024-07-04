// SplashScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DFDDC4', // Cambia el color de fondo si es necesario
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100, // Cambia estos valores según el tamaño deseado
    height: 100, // Cambia estos valores según el tamaño deseado
    resizeMode: 'contain', // O 'cover' dependiendo de cómo quieres que se ajuste la imagen
  },
});

export default styles;
