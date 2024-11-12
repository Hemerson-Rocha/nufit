import React from 'react';
import { Image, View } from 'react-native';
import { styles } from '../style/banner';

export default function Banner() {
  return (
    <View style={styles.container}>
      <Image source={require('../../../../assets/banner-home.png')} style={styles.banner} />
    </View>
  );
}


