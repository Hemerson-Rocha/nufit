import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Revenues: undefined;
  Register: undefined;
  Planning: undefined;
  Diet: undefined;
  IA: undefined; 
};

export default function BottomNav() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeScreen, setActiveScreen] = useState('');

  const handleNavigation = (screen: string) => {
    if (screen === 'receitas') {
      navigation.navigate('Revenues');
    } else if (screen === 'planejamento') {
      navigation.navigate('Planning');
    } else if (screen === 'dietas') {
      navigation.navigate('Diet');
    } else if (screen === 'ia') {
      navigation.navigate('IA');
    }

    setActiveScreen(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.curva} />
      <TouchableOpacity
        onPress={() => handleNavigation('receitas')}
        style={[styles.iconContainer, styles.receitasIcon]}
      >
        <View
          style={[
            styles.iconBackground,
            styles.inactiveBackground
          ]}
        >
          <Image source={require('../../assets/icon-receitas.png')} style={styles.icon} />
        </View>
        <Text style={styles.iconText}>receitas</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        onPress={() => handleNavigation('planejamento')}
        style={[styles.iconContainer, styles.planejamentoIcon]}
      >
        <View
          style={[
            styles.iconBackground,
            styles.inactiveBackground
          ]}
        >
          <Image source={require('../../assets/icon-planejamento.png')} style={styles.icon} />
        </View>
        <Text style={styles.iconText}>planejamento</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={() => handleNavigation('dietas')}
        style={[styles.iconContainer, styles.dietasIcon]}
      >
        <View
          style={[
            styles.iconBackground,
            styles.inactiveBackground
          ]}
        >
          <Image source={require('../../assets/icon-dieta.png')} style={styles.icon} />
        </View>
        <Text style={styles.iconText}>Minhas receitas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleNavigation('ia')}
        style={[styles.iconContainer, styles.iaIcon]}
      >
        <View
          style={[
            styles.iconBackground,
            styles.inactiveBackground
          ]}
        >
          <Image source={require('../../assets/icon_ia.png')} style={styles.icon} />
        </View>
        <Text style={styles.iconText}>IA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  curva: {
    width: '100%',
    height: 160,
    backgroundColor: '#2E8B57',
    borderTopLeftRadius: 300,
    borderTopRightRadius: 300,
  },
  iconContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  receitasIcon: {
    left: '14%',
    bottom: 30,
  },
  // planejamentoIcon: {
  //   left: '30%',
  //   bottom: 50,
  // },
  dietasIcon: {
    right: '10%',
    bottom: 30,
  },
  iaIcon: { 
    right: '42%',
    bottom: 50,
  },
  iconBackground: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  activeBackground: {
    backgroundColor: '#00FF00',
  },
  inactiveBackground: {
    backgroundColor: '#006400',
  },
  icon: {
    width: 40,
    height: 40,
  },
  iconText: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 4,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});