import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import { styles } from '../../Pages/home/components/style/botton-nav';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Revenues: undefined;
  Register: undefined;
  Planning: undefined;
};

export default function BottomNav() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ImageBackground
      source={require('../../../../assets/nav-background.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Revenues')} >
            <Image source={require('../../../../assets/icon-receitas.png')} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.label}>Receitas</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Planning')}>
            <Image source={require('../../../../assets/icon-planejamento.png')} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.label}>Planejamento</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Diet')}>
            <Image source={require('../../../../assets/icon-dieta.png')} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.label}>Dietas</Text>
        </View>
      </View>
    </ImageBackground>
  );
}
