import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    listContainer: {
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
    promoImage: {
      width: '100%', 
      height: 250, 
      resizeMode: 'cover',
      marginBottom: 20,
    },
    ofertaCard: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 10,
      marginBottom: 10,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
    },
    ofertaImage: {
      width: 100,
      height: 100,
      borderRadius: 10,
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