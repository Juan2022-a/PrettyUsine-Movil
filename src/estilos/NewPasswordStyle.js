import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DFDDC4', // Color de fondo integrado del segundo estilo
    paddingHorizontal: 20,
    paddingTop: 20, // Ajustar el espacio en la parte superior
  },
  title: {
    fontSize: 35, // Tamaño de fuente del segundo estilo
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logo: {
    width: 200,  // Tamaño de la imagen integrado del segundo estilo
    height: 200,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    width: '100%',
  },
  textInput: {
    flex: 1,
    width: '80%', // Ancho del input ajustado del segundo estilo
    backgroundColor: '#f0f0f0', // Color de fondo del input integrado
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: '#554320', // Color del botón integrado
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10, // Espacio inferior añadido para separar los elementos
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', // Color del texto del botón integrado
    fontSize: 18, // Tamaño del texto del botón integrado
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
