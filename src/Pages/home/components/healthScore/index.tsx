import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { styles } from '../style/healthScore';

export default function HealthScore({ score }: { score: number }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Score de Saúde:</Text>
      <ProgressBar progress={score} color="lightgreen" style={styles.progressBar} />
    </View>
  );
}
