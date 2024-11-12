import React, { useState } from 'react';
import { View, Image, StyleSheet, ImageBackground } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { api } from '../../lib/axios'; // Supondo que você tenha uma instância axios configurada para chamadas à API
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

export function Login() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isVerifiedUser = async (email: string, password: string) => {
    try {
      const user = {
        email: email,
        password: password,
      };

      setLoading(true);
      const response = await api.post('/login', user);
      setLoading(false); 

      const data = response.data;

      if (response.status === 200) {
        console.log('Login bem-sucedido:', data);

        await AsyncStorage.setItem('userName', data.client.name);
        await AsyncStorage.setItem('id', data.client.id);

        return true; 
      } else {
        console.error('Erro no login:', data.message);
        return false;
      }
    } catch (error) {
      setLoading(false);
      console.error('Erro ao validar o usuário:', error);
      return false;
    }
  };

  const handleLogin = async () => {
    const success = await isVerifiedUser(email, password);

    if (success) {
      navigation.navigate('Home');
    } else {
      alert('Email ou senha incorretos');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/folha-de-fundo-do-app.png')} style={styles.image} />

      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <View style={styles.form}>
        <Text style={styles.label}>Gmail</Text>
        <TextInput
          mode="outlined"
          label="Digite seu Gmail"
          style={styles.input}
          theme={{
            colors: { primary: 'green', text: 'black', background: 'white' },
          }}
          outlineColor="green"
          keyboardType="email-address"
          contentStyle={styles.pillShape}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          mode="outlined"
          label="Digite sua Senha"
          secureTextEntry
          style={styles.input}
          theme={{
            colors: { primary: 'green', text: 'black', background: 'white' },
          }}
          outlineColor="green"
          contentStyle={styles.pillShape}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          loading={loading} 
          disabled={loading} 
        >
          Entrar
        </Button>

        <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
          Não tem conta?
        </Text>
      </View>
    </View>
  );
}
