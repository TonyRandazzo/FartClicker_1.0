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
import HUD from './HUD'
// Ottieni la larghezza e l'altezza del dispositivo
const { width, height } = Dimensions.get('window');
// Calcola la diagonale dello schermo (in pollici)
const diagonal = Math.sqrt(width ** 2 + height ** 2) / (width / height);

// Definisci i range per piccoli, medi e grandi schermi
const isSmallScreen = diagonal >= 5 && diagonal < 6;
const isMediumScreen = diagonal > 6 && diagonal < 7;
const isLargeScreen = diagonal > 7.5;

const getSize = (small, medium, large) => {
  if (isSmallScreen) return small;
  if (isMediumScreen) return medium;
  if (isLargeScreen) return large;
};

const MapScreen = ({ toggleMapScreen }) => {
  const data = Array.from({ length: 100 }, (_, index) => index + 1);
  const mapScaleAnim = useRef(new Animated.Value(1)).current;

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

  // Funzione per determinare la posizione left in base al numero
  const getLeftPosition = (item) => {
    const itemTextLength = item.toString().length; // Calcola la lunghezza del numero (2 o 3 cifre)

    if (itemTextLength === 2) {
      return getSize(0, 0, '10%'); // Imposta left a 10% per numeri a 2 cifre
    } else if (itemTextLength === 3) {
      return getSize(0, 0, '7%'); // Imposta left a 5% per numeri a 3 cifre
    }
    return getSize(0, 0, '13%'); // Default per altri casi, se necessario
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fsfondo%20shop.png?alt=media&token=384318d8-0527-411d-a67c-0344b23fdedf',
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <HUD/>
      <View style={styles.containerContent}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
          style={styles.scrollView}
        >
          {data.map((item) => (
            <View key={item.toString()} style={[styles.itemContainer, styles.itemWrapper]}>
              <View style={styles.dashedLineContainer}>
                {Array.from({ length: 35 }).map((_, index) => (
                  <View key={index} style={styles.dashedSegment} />
                ))}
              </View>

              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Ftasto%20arancione%20tondo.png?alt=media&token=a5c750b9-54f0-46ac-8c84-b947c93c9ea8',
                }}
                style={styles.itemImage}
              />

              <Text
                style={[styles.itemText, { left: getLeftPosition(item) }]}
              >
                {item}
              </Text>

              {/* Aggiungi due bottoni con immagini nere */}
              <View style={styles.ricompensaContainer}>
                <View style={styles.ricompensa}>
                  <Image
                    source={{
                      uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2FCOIN%20MARVIK.png?alt=media&token=67f52d59-d944-4120-a58f-185ac7a76b45',
                    }}
                    style={styles.ricompensaImage}
                  />
                  <Text style={styles.ricompensaText}> 40 </Text>
                </View>
                <View style={styles.ricompensa}>
                  <Image
                    source={{
                      uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2FCOIN%20MARVIK.png?alt=media&token=67f52d59-d944-4120-a58f-185ac7a76b45',
                    }}
                    style={styles.ricompensaImage}
                  />
                  <Text style={styles.ricompensaText}> 20 </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  ricompensaContainer: {
    position: 'absolute',
    flexDirection: 'row', // Posiziona le ricompense orizzontalmente
    justifyContent: 'flex-end', // Allinea le ricompense a sinistra
    alignItems: 'flex-end', // Centra verticalmente
    marginLeft: 160, // Spazio tra il testo e le ricompense
  },

  ricompensa: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 50, // Distanza tra le ricompense
  },

  ricompensaImage: {
    width: getSize(0, 0, 50), // Imposta la larghezza dell'immagine
    height: getSize(0, 0, 50), // Imposta l'altezza dell'immagine
    tintColor: 'black', // Applica il filtro nero all'immagine
    marginBottom: 5, // Distanza tra l'immagine e il testo
    shadowColor: 'rgba(255, 255, 255, 1)',
    shadowOpacity: 1,
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 10,
    elevation: 4,
  },

  ricompensaText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'LuckiestGuy-8jyD', // Usa il font che preferisci
  },

  page: {
    width: width,
    height: height,
  },
  page1: {
    width: width,
    height: height,
  },
  fixedMapButton: {
    position: 'absolute',
    zIndex: 10,
    right: getSize(0, 0, 20),
    top: getSize(0, 0, 530),
  },

  indicatorContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  indicator: {
    width: 55,
    height: 60,
    marginHorizontal: 10,
  },
  buttonContainer: {
    paddingRight: 0,
    borderRightWidth: 4,
    borderRightColor: '#fff',
  },
  mainContainer: {
    width: '100%',
    height: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  titleImage: {
    width: '300%',
    height: '20%',
    resizeMode: 'cover',
  },
  buttonsRowTop: {
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: getSize(0, 0, 50),
    width: '100%',
  },
  rewardsButton: {
    alignItems: 'flex-start',
    borderRadius: 30,
    height: '80%',
    shadowColor: 'rgba(255, 255, 255, 1)',
    shadowOpacity: 1,
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 10,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'LuckiestGuy-8jyD',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  buttonImageMenu: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  newsButton: {
    zIndex: 1,
    alignSelf: 'flex-end',
    borderRadius: 30,
    bottom: getSize(0, 0, 10),
    borderRadius: 30,
    height: '80%',
    shadowColor: 'rgba(255, 255, 255, 1)',
    shadowOpacity: 1,
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 10,
    elevation: 4,
  },
  characterContainer: {
    position: 'absolute',
    top: getSize('20%', '20%', '32%'),
    left: getSize('10%', '10%', '14%'),
  },
  characterImage: {
    zIndex: 1,
    width: 250, // Cambia la dimensione in base alla larghezza dello schermo
    height: 250,
  },
  playButton: {
    top: getSize(0, 0, '20%'),
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    height: '15%',
  },
  playButtonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  playButtonText: {
    position: 'absolute',
    color: '#fff',
    fontSize: 50, // Font size più piccolo per schermi più piccoli
    fontFamily: 'LuckiestGuy-8jyD',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonsRowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: getSize(0, 0, 20),
    width: '100%',
  },
  itemsButton: {
    zIndex: 1,
    alignItems: 'flex-start',
    borderRadius: 30,
    height: '80%',
    shadowColor: 'rgba(255, 255, 255, 1)',
    shadowOpacity: 1,
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 10,
    elevation: 4,
  },
  mapButton: {
    zIndex: 1,
    alignItems: 'flex-end',
    borderRadius: 30,
    height: '80%',
    shadowColor: 'rgba(255, 255, 255, 1)',
    shadowOpacity: 1,
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 10,
    elevation: 4,
  },
  itemContainer: {
    left: getSize(0, 0, '8%'),
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'relative',
  },
  background: {
    width: width,
    height: height,
  },
  itemImage: {
    width: '30%',
    height: '15%',
  },
  itemText: {
    position: 'absolute',
    color: 'white',
    fontSize: 30, // Font size più piccolo per schermi più piccoli
    paddingBottom: '2%',
    fontWeight: 'bold',
  },
  scrollView: {
    transform: [{ scaleY: -1 }],
  },
  scrollViewContent: {
    flexDirection: 'column',
    paddingBottom: 0,
  },
  itemWrapper: {
    transform: [{ scaleY: -1 }],
    bottom: 100,
    marginBottom: -450,
  },
  dashedSegment: {
    width: 4,
    height: 8,
    backgroundColor: 'gray',
    marginBottom: 4,
  },
  dashedLineContainer: {
    position: 'absolute',
    left: getSize(0, 0, '15%'),
    transform: [{ translateX: -2 }],
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
export default MapScreen
