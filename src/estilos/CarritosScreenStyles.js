import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#DFDDC4',
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    flex: 1,
    paddingBottom: 16,
  },
  ofertaCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  ofertaDetails: {
    marginBottom: 12,
  },
  ofertaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  ofertaPrice: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  quantityContainer: {
 flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  quantityButton: {
    backgroundColor: '#007BFF',
    padding:5,
    borderRadius: 5,
    marginHorizontal: 1,
    margin:5,
    width:50 ,
},quantityControl:
{
  flexDirection:'row',

},
  quantityButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 8,
  },
  removeButton: {
    width:60,
  
    color: '#FF4C4C',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
  summaryContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default styles;
