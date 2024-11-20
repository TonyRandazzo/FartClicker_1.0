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
        <TouchableOpacity style={styles.button} onPress={() => console.log('Button Pressed')}>
        <Image
          style={styles.buttonImage}
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2FWhatsApp%20Image%202024-11-18%20at%2017.23.56.jpeg?alt=media&token=a42e4d8d-900e-4444-9dbf-62b379b55a21',
          }}
        />
      </TouchableOpacity>
      <Image
        style={styles.user}
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fcerchio%20contentente%20personaggio%20in%20home%20casupola.png?alt=media&token=b656a8cc-6cb4-4d16-8495-c26505e70cc4',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    flex: 1, // Rende il contenitore a schermo intero
    alignItems: 'center', // Centra l'immagine orizzontalmente
    justifyContent: 'flex-start',
    top: 20,
  },
  user: {
    width: 100, // Larghezza dell'immagine
    height: 100, // Altezza dell'immagine
    resizeMode: 'contain', // Assicura che l'immagine mantenga il rapporto originale
  },
  button: {
    position: 'absolute', // Sovrappone il bottone sopra l'immagine
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
