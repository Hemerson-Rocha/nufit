import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { styles } from '../style/waterScore';

export default function WaterScore({ score }: { score: number }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Score de Água:</Text>
      <ProgressBar progress={score} color="lightblue" style={styles.progressBar} />
    </View>
  );
}
