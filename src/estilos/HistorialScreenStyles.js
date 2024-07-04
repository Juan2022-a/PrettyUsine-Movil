import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      marginTop: 50, // Ajusta el margen superior para mover todo hacia abajo
    },
    listContainer: {
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 20, // Reduce el margen inferior
      color: '#333', // dark grey color for the title
      textAlign: 'center', // Center the text
      marginTop: 40, // Reduce el margen superior para mover el título más arriba
    },
    ofertaCard: {
      flexDirection: 'row',
      borderRadius: 10,
      marginBottom: 10, // Reduce el margen inferior para menos separación entre tarjetas
      padding: 10,
    },
    ofertaImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginRight: 10,
    },
    ofertaDetails: {
      flex: 1,
      justifyContent: 'center',
    },
    ofertaTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#333',
    },
    ofertaDescription: {
      fontSize: 14,
      color: '#666',
      marginBottom: 10,
    },
    fecha: {
      fontSize: 14,
      color: '#666',
      marginBottom: 10,
    },
    ofertaPriceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ofertaPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    discountBadge: {
      backgroundColor: '#3046BC',
      paddingVertical: 3,
      paddingHorizontal: 8,
      borderRadius: 5,
      marginLeft: 10,
    },
    discountText: {
      fontSize: 12,
      color: '#fff',
    },
  });

  export default styles;  