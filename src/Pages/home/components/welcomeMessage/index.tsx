import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import { styles } from '../style/welcomeMessage';

export default function WelcomeMessage() {
  return (
    <View style={styles.container}>
      <Image source={require('../../../../assets/logo.png')} style={styles.logo} />
      <View style={styles.welcomePill}>
        <Text style={styles.welcomeText}>Bem-vindo(a)!</Text>
      </View>
      <Avatar.Image size={50} source={require('../../../../assets/user.png')} style={styles.avatar} />
    </View>
  );
}
