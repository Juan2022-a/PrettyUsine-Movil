import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#f0f4f7',
      paddingVertical: 70,
    },
    profileContainer: {
      alignItems: 'center',
      marginBottom: 20,
      paddingVertical: 30,
      backgroundColor: '#ffffff',
      borderRadius: 20,
      marginHorizontal: 20,
      elevation: 5,
    },
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginBottom: 10,
    },
    profileName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    profileSubtitle: {
      fontSize: 14,
      color: '#777',
    },
    menuContainer: {
      marginHorizontal: 20,
      backgroundColor: '#ffffff',
      borderRadius: 20,
      paddingVertical: 10,
      elevation: 5,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    menuItemText: {
      fontSize: 16,
      marginLeft: 15,
    },
    socialContainer: {
      marginTop: 30,
      backgroundColor: '#eef1f5',
      paddingVertical: 15,
      alignItems: 'center',
      borderRadius: 20,
      marginHorizontal: 20,
      elevation: 5,
    },
    socialTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 10,
    },
    socialIcons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '60%',
    },
  });

  export default styles;  