import React, { useRef, useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Image,
  ImageBackground,
  Text,
  ScrollView,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import RNFS from 'react-native-fs';


// Ottieni la larghezza e l'altezza del dispositivo
const { width, height } = Dimensions.get('window');
// Calcola la diagonale dello schermo (in pollici)
const diagonal = Math.sqrt(width ** 2 + height ** 2) / (width / height);

// Definisci i range per piccoli, medi e grandi schermi
const isSmallScreen = diagonal >= 5 && diagonal < 6;
const isMediumScreen = diagonal >= 6 && diagonal <= 7;
const isLargeScreen = diagonal > 7;

const getSize = (small, medium, large) => {
  if (isSmallScreen) return small;
  if (isMediumScreen) return medium;
  if (isLargeScreen) return large;
};




function PauseButton() {
    const pauseScaleAnim = useRef(new Animated.Value(1)).current;
const bounceAnimation = (scaleAnim) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };
  return (
    <>
    <View style={styles.topContainer}>
    <Image
      source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fraccoglitore%20monete%20ink%20e%20impostaz%20finale.png?alt=media&token=2cdf5e80-e928-4589-b75f-c590b180fa50' }}
      style={styles.topImage}
      resizeMode="cover"
    />
  </View>
    <TouchableOpacity style={styles.button} activeOpacity={1} onPressIn={() => bounceAnimation(pauseScaleAnim)}>
    <Animated.Image
      source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2FGreenButton.png?alt=media&token=859bade4-78bf-47ec-b3fd-88d486c37e97' }}
      style={[styles.buttonImage, { transform: [{ scale: pauseScaleAnim }] }]}
      resizeMode="contain"
    />
  </TouchableOpacity>
    </>

  )
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        zIndex: 50,
        right: 5,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonImage: {
        width: '100%',
        height: '100%',
      },
      topContainer: {
        position: 'absolute',
        width: width,
        height: 190,
        elevation: 10,
        top: 0,
        zIndex: 10,
      },
      topImage: {
        position: 'absolute',
        resizeMode: 'cover',
        width: width,
        height: '100%',
    
      },
});

export default PauseButton
