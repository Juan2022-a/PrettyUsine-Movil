import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    logo: {
      width: 250,
      height: 235,
      marginBottom: 20,
    },
    input: {
      width: '80%',
      backgroundColor: '#f0f0f0',
      height: 50,
      borderRadius: 10,
      paddingHorizontal: 15,
      marginBottom: 15,
    },
    button: {
      backgroundColor: '#3046BC',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      marginBottom: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    link: {
      color: '#007bff',
      fontSize: 16,
    },
  });

  export default styles;