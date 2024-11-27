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
const User = () => {
  return (
    <View style={styles.container}>
              <View style={styles.topContainer}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fraccoglitore%20monete%20ink%20e%20impostaz%20finale.png?alt=media&token=2cdf5e80-e928-4589-b75f-c590b180fa50' }}
            style={styles.topImage}
            resizeMode="cover"
          />
        </View>
        <TouchableOpacity style={styles.button} activeOpacity={1} onPress={() => alert('Halloween!')}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2FGreenButton.png?alt=media&token=859bade4-78bf-47ec-b3fd-88d486c37e97' }}
            style={styles.buttonImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 5,
    elevation: 5,
    flex: 1, // Rende il contenitore a schermo intero
    alignItems: 'center', // Centra l'immagine orizzontalmente
    justifyContent: 'flex-start',
    top: -10,
  },
  topContainer: {
    position: 'absolute',
    width: width,
    height: 190,
    elevation: 1,
    top: 0,

  },
  topImage: {
    position: 'absolute',
    resizeMode: 'cover',
    width: width,
    height: '100%',

  },

  button: {
    zIndex: 50,
    left: 350,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
  user: {
    width: 100, // Larghezza dell'immagine
    height: 100, // Altezza dell'immagine
    resizeMode: 'contain', // Assicura che l'immagine mantenga il rapporto originale
  },
  button: {
    position: 'absolute', 
    width: 95, 
    height: 95, 
    borderRadius: 360, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  buttonImage: {
    borderRadius: 360, 
    width: '100%',
    height: '100%',
    resizeMode: 'cover', 
  },
});

export default User;
