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

      <TouchableOpacity
        style={styles.fixedMapButton}
        activeOpacity={1}
        onPressIn={() => bounceAnimation(mapScaleAnim)}
        onPress={toggleMapScreen}
      >
        <Animated.Image
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fmap%20icon.png?alt=media&token=99bc80b2-1369-4a8f-bfb0-53a3e56717a6',
          }}
          style={[styles.buttonImageMenu, { transform: [{ scale: mapScaleAnim }] }]}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const Home = () => {
  const [showMapScreen, setShowMapScreen] = useState(false);
  const rewardsScaleAnim = useRef(new Animated.Value(1)).current;
  const itemsScaleAnim = useRef(new Animated.Value(1)).current;
  const newsScaleAnim = useRef(new Animated.Value(1)).current;
  const playScaleAnim = useRef(new Animated.Value(1)).current;
  const mapScaleAnim = useRef(new Animated.Value(1)).current;

  const toggleMapScreen = () => {
    setShowMapScreen((prev) => !prev);
  };


  if (showMapScreen) {
    return <MapScreen toggleMapScreen={toggleMapScreen} />;
  }

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
      source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fsfondo%20shop.png?alt=media&token=384318d8-0527-411d-a67c-0344b23fdedf' }}
      style={styles.page1}
      resizeMode="cover"
    >
      <View style={styles.mainContainer}>
        <Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Ftitolo.png?alt=media&token=2b91b8c6-7da2-4d47-993e-bf3b08eb8fdf' }}
          style={styles.titleImage}
          resizeMode="contain"
        />

        <View style={styles.buttonsRowTop}>
          <TouchableOpacity style={styles.rewardsButton} activeOpacity={1} onPressIn={() => bounceAnimation(rewardsScaleAnim)} >
            <Animated.Image
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Frewards%20icon.png?alt=media&token=c91aaa7c-2ad9-4461-9b6f-abbfe784aaf7' }}
              style={[styles.buttonImageMenu, { transform: [{ scale: rewardsScaleAnim }] }]}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.newsButton} activeOpacity={1} onPressIn={() => bounceAnimation(newsScaleAnim)} >
            <Animated.Image
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fnewspaper.png?alt=media&token=b12866ee-2794-4d62-9d4f-a59673182398' }}
              style={[styles.buttonImageMenu, { transform: [{ scale: newsScaleAnim }] }]}
            />
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.playButton} activeOpacity={1} onPressIn={() => bounceAnimation(playScaleAnim)} >
          <Animated.Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Ftasto%20arancione%20semi%20ellittico.png?alt=media&token=f8d37105-4194-447e-8889-3513aedc6a1e' }}
            style={[styles.playButtonImage, { transform: [{ scale: playScaleAnim }] }]}
          />
          <Text style={styles.playButtonText} activeOpacity={1} onPressIn={bounceAnimation} >Play</Text>
        </TouchableOpacity>

        <View style={styles.buttonsRowBottom}>
          <TouchableOpacity style={styles.itemsButton} activeOpacity={1} onPressIn={() => bounceAnimation(itemsScaleAnim)} >
            <Animated.Image
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fitems%20icon%20V.2%202.png?alt=media&token=3e7ebce0-7fc1-45e6-ba3f-a89d0eb332f0' }}
              style={[styles.buttonImageMenu, { transform: [{ scale: itemsScaleAnim }] }]}
            />
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapButton} activeOpacity={1} onPressIn={() => bounceAnimation(mapScaleAnim)} onPress={toggleMapScreen}>
            <Animated.Image
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fmap%20icon.png?alt=media&token=99bc80b2-1369-4a8f-bfb0-53a3e56717a6' }}
              style={[styles.buttonImageMenu, { transform: [{ scale: mapScaleAnim }] }]}
            />
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontFamily: 'Tricky Jimmy', // Usa il font che preferisci
  },
  topContainer: {
    position: 'relative',
    width: '100%',
    height: 60, // Adjust height as needed
  },
  topImage: {
    width: '100%',
    height: '100%', // Full height of the top container
  },
  ombra: {
    right: 120, // Imposta valori diversi per schermi piccoli
    top: -385,
    width: 500, // Schermi più piccoli hanno dimensioni diverse
    height: 500,
  },
  button: {
    position: 'absolute',
    right: 16, // Adjust padding to position the button
    top: '50%', // Center vertically within the image
    transform: [{ translateY: -25 }], // Adjust to center based on button size
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    width: '100%',
    height: '100%',
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
  characterContainer: {
    position: 'absolute',
    top: getSize('8%', '0%', '32%'),
    left: getSize('4%', '4%', '14%'),
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