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


const Home = () => {
  const rewardsScaleAnim = useRef(new Animated.Value(1)).current;
  const itemsScaleAnim = useRef(new Animated.Value(1)).current;
  const newsScaleAnim = useRef(new Animated.Value(1)).current;
  const playScaleAnim = useRef(new Animated.Value(1)).current;
  const passiveScaleAnim = useRef(new Animated.Value(1)).current;
  const impulsoOpacity = useRef(new Animated.Value(1)).current;
  const opacityValues = useRef(
    Array(6).fill(null).map(() => new Animated.Value(0)) // 6 è il numero di onde che vuoi creare
  ).current;

  useEffect(() => {
    const animations = opacityValues.map((animatedValue, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1, // visibile
            duration: 500,
            delay: index * 300, // ritardo per creare l'effetto ola
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0, // invisibile
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      )
    );
    // Avvia tutte le animazioni
    Animated.stagger(300, animations).start();
  }, []);

  useEffect(() => {
    // Animation loop for impulso opacity
    Animated.loop(
      Animated.sequence([
        Animated.timing(impulsoOpacity, {
          toValue: 0.5, // Decrease opacity
          duration: 3000, // Duration in ms
          useNativeDriver: true,
        }),
        Animated.timing(impulsoOpacity, {
          toValue: 1, // Increase opacity
          duration: 3000, // Duration in ms
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

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
    <ImageBackground
      source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fsfondo%20blu.png?alt=media&token=3ef35cc6-d6d3-4b90-9309-a175a769614e' }}
      style={styles.page1}
      resizeMode="cover"
    >
          <View style={styles.tema}>
      <ImageBackground
        source={{uri: "https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fsilouette%20scoreggia%20da%20mettere%20su%20sfondo%2C%20dietro%20il%20livello%20dell'impulso%20di%20luce.png?alt=media&token=64de07b5-438d-42ed-b80c-a9c2cce4b7ac"}} // Sostituisci con il percorso della tua immagine
        style={styles.checkerboard}
        resizeMode="repeat"
      />
    </View>
      <View style={styles.mainContainer}>
      <Animated.Image
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fimpulso%20di%20luce.png?alt=media&token=029852f4-eb5b-424d-8958-9cc2e43b7b86',
          }}
          style={[styles.impulso, { opacity: impulsoOpacity }]}
        />
        <View style={styles.buttonsRowTop}>
          <View style={styles.buttonsRowTopLeft}>
            <ImageBackground 
            style = {styles.buttonsRowTopLeftBackground}
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fbalaustrino%20home.png?alt=media&token=fa4b4297-4fe3-4055-bffd-0bf901266915'}}
            />
          <TouchableOpacity style={styles.rewardsButton} activeOpacity={1} onPressIn={() => bounceAnimation(rewardsScaleAnim)} >
            <Animated.Image
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Frewards%20icon.png?alt=media&token=c91aaa7c-2ad9-4461-9b6f-abbfe784aaf7' }}
              style={[styles.buttonImageMenu, { transform: [{ scale: rewardsScaleAnim }] }]}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemsButton} activeOpacity={1} onPressIn={() => bounceAnimation(itemsScaleAnim)} >
            <Animated.Image
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fitems%20icon%20V.2%202.png?alt=media&token=3e7ebce0-7fc1-45e6-ba3f-a89d0eb332f0' }}
              style={[styles.buttonImageMenu, { transform: [{ scale: itemsScaleAnim }] }]}
            />
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsRowTopRight}>
        <ImageBackground 
            style = {styles.buttonsRowTopRightBackground}
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fbalaustrino%20home.png?alt=media&token=fa4b4297-4fe3-4055-bffd-0bf901266915'}}
            />
        <TouchableOpacity style={styles.itemsButton} activeOpacity={1} onPressIn={() => bounceAnimation(passiveScaleAnim)} >
            <Animated.Image
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fpassives%20icon.png?alt=media&token=cd878bca-2667-4165-a7e0-b1796948e073' }}
              style={[styles.buttonImageMenu, { transform: [{ scale: passiveScaleAnim }] }]}
            />
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.newsButton} activeOpacity={1} onPressIn={() => bounceAnimation(newsScaleAnim)} >
            <Animated.Image
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fnewspaper.png?alt=media&token=b12866ee-2794-4d62-9d4f-a59673182398' }}
              style={[styles.buttonImageMenu, { transform: [{ scale: newsScaleAnim }] }]}
            />
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
        </View>
        </View>

        <View style={styles.characterContainer}>
        <Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FFartman.png?alt=media&token=0b63be39-b735-4a90-90f4-219e149767c0' }}
          style={styles.characterImage}
          resizeMode="contain"
        />
        <Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fpiattaforma%20skin%20home.png?alt=media&token=cab9591d-8762-4a8f-901b-3eed084b15d7' }}
          style={styles.ombra}
          resizeMode="contain"
        />
      </View>
        <TouchableOpacity style={styles.playButton} activeOpacity={1} onPressIn={() => bounceAnimation(playScaleAnim)} >
          <Animated.Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Ftasto%20arancione%20semi%20ellittico.png?alt=media&token=f8d37105-4194-447e-8889-3513aedc6a1e' }}
            style={[styles.playButtonImage, { transform: [{ scale: playScaleAnim }] }]}
          />
          <Text style={styles.playButtonText} activeOpacity={1} onPressIn={bounceAnimation} >Play</Text>
        </TouchableOpacity>
      </View>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tema: {
    opacity: 0.15,
    position: 'absolute',
    width: width,
    height: height,
    justifyContent: 'center',
  },
  checkerboard: {
    position: 'absolute',
    flex: 1,
    width: width,
    height: height,
  },
  characterContainer: {
    flex: 1, // Occupa tutto lo spazio disponibil
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra orizzontalmente
    position: 'relative',
    marginTop: height * 0.2
  },
  characterImage: {
    zIndex: 1,
    width: 350, // Puoi regolare dinamicamente se necessario
    height: 350,
  },
  ombra: {
    position: 'absolute', // Sovrappone l'immagine sotto
    width: 550,
    height: 600,
  },
  impulso: {
    position: 'absolute',
    width: width,
    height: height,
  },
  page: {
    width: width,
    height: height,
  },
  page1: {
      width: width,
    height: height,
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
    elevation: 6,
  },
  titleImage: {
    width: '300%',
    height: '20%',
    resizeMode: 'cover',
  },
  buttonsRowTopLeftBackground: {
    position: 'absolute',
    resizeMode: 'contain',
    width: '130%', 
    height: '95%', 
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    right: 0,
  },
  buttonsRowTopRightBackground: {
    position: 'absolute',
    resizeMode: 'contain',
    width: '130%', 
    height: '95%', 
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    left: 0,
    transform: [{ scaleX: -1 }],
  },
  buttonsRowTopLeft: {
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: '90%',
  },
  buttonsRowTopRight: {
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: '90%',
  },
  buttonsRowTop: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start', 
    width: '100%',
    top: getSize(0, 0, 50), 
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
    fontFamily: 'Tricky Jimmy',
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
  playButton: {
    top: 0,
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
    fontFamily: 'Chubby Cheeks',
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
export default Home;