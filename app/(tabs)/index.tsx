import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { View, Text } from 'react-native';
import { useEffect } from 'react';




export default function HomeScreen() {

  const option = {
    mediaType: 'photo',
    maxWidth: 2000,
    maxHeight: 2000,
    quality: 0.7,
  };
  
  return (
    <View>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>

   
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
