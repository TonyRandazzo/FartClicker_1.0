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
  Modal,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import RNFS from 'react-native-fs';

const { width, height } = Dimensions.get('window');
const diagonal = Math.sqrt(width ** 2 + height ** 2) / (width / height);

const isSmallScreen = diagonal >= 5 && diagonal < 6;
const isMediumScreen = diagonal >= 6 && diagonal <= 7;
const isLargeScreen = diagonal > 7;

const getSize = (small, medium, large) => {
  if (isSmallScreen) return small;
  if (isMediumScreen) return medium;
  if (isLargeScreen) return large;
};



function PauseButton({ setIsPlaying }) {
  const [isPaused, setIsPaused] = useState(false);
  const pauseScaleAnim = useRef(new Animated.Value(1)).current;
  const [cachedImagePaths, setCachedImagePaths] = useState({});

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

  const images = [
    'https://fartclicker.s3.eu-north-1.amazonaws.com/Home/raccoglitore+monete+ink+e+impostaz+finale.png',
    'https://fartclicker.s3.eu-north-1.amazonaws.com/Home/GreenButton.png',
  ];




  return (
    <>
      <View style={styles.topContainer}>
        <Image
          source={{ uri: 'https://fartclicker.s3.eu-north-1.amazonaws.com/Home/raccoglitore+monete+ink+e+impostaz+finale.png' }}
          style={styles.topImage}
          resizeMode="cover"
        />
      </View>
      <TouchableOpacity style={styles.button} activeOpacity={1}
        onPressIn={() => {
          bounceAnimation(pauseScaleAnim);
          setIsPaused(true);
        }}>
        <Animated.Image
          source={{ uri:  'https://fartclicker.s3.eu-north-1.amazonaws.com/Home/GreenButton.png' }}
          style={[styles.buttonImage, { transform: [{ scale: pauseScaleAnim }] }]}
          resizeMode="contain"
        />
      </TouchableOpacity>
      {isPaused && (
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsPaused(false)}
            >
              <Text style={styles.modalButtonText}>Resume</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setIsPaused(false);
                setIsPlaying(true);
                console.log('Exit action triggered');
              }}
            >
              <Text style={styles.modalButtonText}>Exit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  pauseButton: {
    padding: 15,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    marginTop: 20,
  },
  pauseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    zIndex: 50,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    gap: 15,
  },
  modalButton: {
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
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
    zIndex: 11,
  },
  topImage: {
    position: 'absolute',
    resizeMode: 'cover',
    width: width,
    height: '100%',

  },
});

export default PauseButton
