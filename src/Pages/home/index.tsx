import React, { useState } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import WelcomeMessage from './components/welcomeMessage';
import HealthScore from './components/healthScore';
import Banner from './components/banner';
import WaterScore from './components/waterScore';
import BottomNav from '../../components/bottonNav';
import { styles } from './components/style/home';

export default function Home() {
  const [healthScore, setHealthScore] = useState(0.7);
  const [waterScore, setWaterScore] = useState(0.4);

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/background_home.png')} 
        style={styles.backgroundImage} 
      />
      <WelcomeMessage />
      <HealthScore score={healthScore} />
      <Banner />
      <WaterScore score={waterScore} />
      <BottomNav /> 
    </View>
  );
}


