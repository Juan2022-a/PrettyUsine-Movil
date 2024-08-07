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
    width: 200,  // Ajusta el ancho de la imagen
    height: 200, // Ajusta la altura de la imagen
    resizeMode: 'contain', // O 'cover' dependiendo de cómo quieres que se ajuste la imagen
    marginBottom: 40,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
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
  registerLink: {
    marginTop: 10,
    color: '#000',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  forgotPasswordText: {
    color: '#000',
    fontSize: 16,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
