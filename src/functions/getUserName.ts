import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserName = async (): Promise<string | null> => {
  try {
    const userName = await AsyncStorage.getItem('userName');
    if (userName !== null) {
      console.log('Nome do usuário recuperado:', userName);
      return userName;
    }
    return null;
  } catch (error) {
    console.error('Erro ao recuperar o nome do usuário:', error);
    return null;
  }
};