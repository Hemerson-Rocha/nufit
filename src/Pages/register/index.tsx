import { styles } from './style';

import React from 'react';
import { View, Image, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormInterface } from '../../Interfaces/registerForm';
import { api } from '../../lib/axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { log } from 'console';

const regex = /^(?=.*[a-z])(?=.*[A-Z]).+$/;

const schema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  email: z.string().email('Insira um email válido').nonempty('Email é obrigatório'),
  password: z
      .string()
      .min(6, { message: "A senha deve ter mais de 6 caracters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "A senha deve ter mais de 6 caracters" }),
  })
  .refine((fields) => regex.test(fields.password), {
    path: ["password"],
    message:
      "A senha deve ter pelo menos 6 caracteres e conter uma letra maiúscula e uma letra minúscula",
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas precisam ser iguais",
  });

  type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
  };

export function Register() {
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormInterface>({
    resolver: zodResolver(schema),
  });

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleRegister = async (data: RegisterFormInterface) => {

    console.log(data.name)
    try {
      const user = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      await api.post("cadastro", user);
      navigation.navigate('Login')
      console.error("cadastrado");
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
    } 
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/folha-de-fundo-do-app.png')} style={styles.image} />

      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Digite seu Nome"
              style={styles.input}
              theme={{
                colors: { primary: 'green', text: 'black', background: 'white' },
              }}
              outlineColor="green"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="default"
              error={!!errors.name}
            />
          )}
        />
        {errors.name && <Text style={{ color: 'red' }}>{errors.name.message?.toString() || ''}</Text>}

        <Text style={styles.label}>Gmail</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Digite seu Gmail"
              style={styles.input}
              theme={{
                colors: { primary: 'green', text: 'black', background: 'white' },
              }}
              outlineColor="green"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              error={!!errors.email}
            />
          )}
        />
        {errors.email && <Text style={{ color: 'red' }}>{errors.email.message?.toString() || ''}</Text>}

        <Text style={styles.label}>Senha</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Digite sua Senha"
              secureTextEntry
              style={styles.input}
              theme={{
                colors: { primary: 'green', text: 'black', background: 'white' },
              }}
              outlineColor="green"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.password}
            />
          )}
        />
        {errors.password && <Text style={{ color: 'red' }}>{errors.password.message?.toString() || ''}</Text>}

        <Text style={styles.label}>Confirmar senha</Text>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Digite sua Senha"
              secureTextEntry
              style={styles.input}
              theme={{
                colors: { primary: 'green', text: 'black', background: 'white' },
              }}
              outlineColor="green"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.confirmPassword}
            />
          )}
        />
        {errors.confirmPassword && <Text style={{ color: 'red' }}>{errors.confirmPassword.message?.toString() || ''}</Text>}

        <Button
          mode="contained"
          onPress={handleSubmit(handleRegister)}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Cadastrar
        </Button>
      </ScrollView>
    </View>
  );
}