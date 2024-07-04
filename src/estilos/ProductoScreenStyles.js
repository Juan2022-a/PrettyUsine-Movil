import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#F8F9FB',
      paddingVertical: 60, // Reducido el espacio vertical
      paddingHorizontal: 15,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginBottom: 50,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 8,
    },
    searchIcon: {
      marginRight: 15,
    },
    searchInput: {
      flex: 1,
      height: 40,
      fontSize: 18,
      color: '#333',
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    card: {
      width: '48%',
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 20,
      marginBottom: 25,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10,
    },
    cardImage: {
      width: 120,
      height: 120,
      borderRadius: 20,
      marginBottom: 15,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 8,
      color: '#333',
    },
    cardDescription: {
      fontSize: 16,
      color: '#555',
      textAlign: 'center',
      marginBottom: 15,
    },
    button: {
      backgroundColor: '#283AE2',
      borderRadius: 15,
      paddingVertical: 10,
      paddingHorizontal: 25,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 8,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  export default styles;  