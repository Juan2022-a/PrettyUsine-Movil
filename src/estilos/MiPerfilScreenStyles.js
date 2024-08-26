import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#DFDDC4',
      paddingHorizontal: 20,
      paddingTop: 40,
      paddingBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 30,
      color: '#333',
    },
    mapContainer: {
      width: '100%',  // Ajusta el ancho al 100% para ocupar todo el contenedor
      height: 300,    // Ajusta la altura según tus preferencias
      marginTop: 20,  // Añade un margen superior si es necesario
      marginBottom: 20, // Puedes ajustar el margen inferior según tu diseño
      alignItems: 'center', // Centra horizontalmente el mapa
    },
    map: {
      width: '100%',   // Ajusta el ancho del mapa al 100% del contenedor
      height: '100%',  // Ajusta la altura del mapa al 100% del contenedor
    },
    profileImageContainer: {
      position: 'relative',
      marginBottom: 30,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    inputContainer: {
      width: '100%',
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      color: '#666',
      marginBottom: 5,
    },
    input: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#e0e0e0',
      borderRadius: 8,
      padding: 10,
      fontSize: 16,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    button: {
      backgroundColor: '#554320',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10, // Espacio inferior añadido para separar los elementos
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    updateButton: {
      backgroundColor: '#009929', // Color verde para botón "Actualizar"
    },
    deleteButton: {
      backgroundColor: '#ca0b0b', // Color rojo para botón "Cancelar"
    },
    updateButtonText: {
      color: '#fff',
    },
    deleteButtonText: {
      color: '#fff',
    },
  });

  export default styles;  