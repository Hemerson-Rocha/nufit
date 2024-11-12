import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserId = async (): Promise<string | null> => {
  try {
    const id = await AsyncStorage.getItem('id');
    if (id !== null) {
      console.log('id do usuário recuperado:', id);
      return id;
    }
    return null;
  } catch (error) {
    console.error('Erro ao recuperar o id do usuário:', error);
    return null;
  }
};