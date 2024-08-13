import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DFDDC4',
    paddingHorizontal: 20,
    paddingTop: 20, // Ajustar el espacio en la parte superior
  },
  logo: {
    top: 10, // Ajustar el espacio en la parte superior
    width: 200,  // Ajusta el ancho de la imagen
    height: 150, // Ajusta la altura de la imagen
    resizeMode: 'contain', // O 'cover' dependiendo de cómo quieres que se ajuste la imagen
    marginBottom: 40,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    backgroundColor: '#f0f0f0',
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#554320',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10, // Espacio inferior añadido para separar los elementos
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 10,
    color: '#000',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default styles;
