import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import { styles } from '../../style/header';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};


export default function Header() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      {/* <Image source={require('../../../../assets/logo.png')} style={styles.logo} /> */}
      {/* <View style={styles.welcomePill}>
        <Text style={styles.welcomeText}>Bem-vindo(a)!</Text>
      </View> */}
      <View style={styles.header}>
        <IconButton
          icon="home"
          size={28}
          onPress={() => navigation.navigate('Home')}
        />
      </View>
      <Avatar.Image size={50} source={require('../../../../assets/user.png')} />
    </View>
  );
}
