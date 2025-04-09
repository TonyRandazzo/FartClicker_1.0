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
  NativeModules,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import RNFS from 'react-native-fs';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SUPABASE_URL = 'https://mtwsyxmhjhahirdeisnz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10d3N5eG1oamhhaGlyZGVpc256Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNDYxMDgsImV4cCI6MjA1ODkyMjEwOH0.-5qoeUa4iXkXMsN3vRW4df3WyKOETavF6lqnRHNN8Pk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const { RNRestart } = NativeModules;

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
  const [money, setMoney] = useState(0); // Stato per il valore "money"

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

  useEffect(() => {
    const fetchMoneyFromSupabase = async () => {
      try {
        const username = await AsyncStorage.getItem('loggedInUser');
  
        if (!username) {
          console.warn('Nessun username trovato in AsyncStorage');
          return;
        }
  
        const { data, error } = await supabase
          .from('main') 
          .select('money')
          .eq('user', username)
          .single();
  
        if (error) {
          console.error('Errore nella query Supabase:', error.message);
          return;
        }
  
        if (data?.money !== undefined) {
          setMoney(data.money);
        } else {
          console.warn('Nessun valore money trovato per questo utente');
        }
  
      } catch (err) {
        console.error('Errore nel recupero dei money:', err);
      }
    };
  
    fetchMoneyFromSupabase();
  }, []);

  const images = {
    topImage: require('../assets/images/raccoglitore_monete_ink_e_impostaz_finale.png'),
    greenButton: require('../assets/images/GreenButton.png'),
    coinIcon: require('../assets/images/COIN_MARVIK.png'), // Aggiungi l'immagine per la moneta
  };

  return (
    <>
      <View style={styles.topContainer}>
        {images.topImage && (
          <Image
            source={images.topImage}
            style={styles.topImage}
            resizeMode="cover"
            onError={() => console.warn('[HUD IMAGE ERROR] Failed to load topImage')}
          />
        )}
      </View>

      <View style={styles.moneyContainer}>
        <Image
          source={images.coinIcon}
          style={styles.coinImage}
          resizeMode="contain"
        />
        <Text style={styles.moneyText}>{money}</Text>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        activeOpacity={1}
        onPressIn={() => {
          bounceAnimation(pauseScaleAnim);  
          setIsPaused(true);
        }}
      >
        {images.greenButton && (
          <Animated.Image
            source={images.greenButton}
            style={[styles.buttonImage, { transform: [{ scale: pauseScaleAnim }] }]}
            resizeMode="contain"
            onError={() => console.warn('[HUD IMAGE ERROR] Failed to load greenButton')}
          />
        )}
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
                setIsPlaying(false);
                RNRestart.Restart();
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
  moneyContainer: {
    position: 'absolute',
    top: 15,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  
  coinImage: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  
  moneyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  
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
