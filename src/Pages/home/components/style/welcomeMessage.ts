import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      marginTop: 20,
    },
    welcomePill: {
      backgroundColor: 'green',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 50,
    },
    welcomeText: {
      color: 'white',
      fontSize: 18,
    },
    logo: {
      width: 50,
      height: 50,
    },
    avatar: {
      backgroundColor: 'gray',
    },
  });