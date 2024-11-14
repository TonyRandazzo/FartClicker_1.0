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

// Calcola la diagonale dello schermo in pollici
const diagonal = Math.sqrt(width ** 2 + height ** 2) / (width / height);

// Definisci una funzione che ritorna il valore di stili condizionali in base alla dimensione dello schermo
const isSmallScreen = diagonal >= 5 && diagonal <= 7;
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

  return (
    <ImageBackground
      source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fsfondo%20shop.png?alt=media&token=384318d8-0527-411d-a67c-0344b23fdedf' }}
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
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Ftasto%20arancione%20tondo.png?alt=media&token=a5c750b9-54f0-46ac-8c84-b947c93c9ea8' }}
                style={styles.itemImage}
              />
              <Text style={styles.itemText}>{item}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.fixedMapButton} activeOpacity={1} onPressIn={() => bounceAnimation(mapScaleAnim)} onPress={toggleMapScreen}>
        <Animated.Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fmap%20icon.png?alt=media&token=99bc80b2-1369-4a8f-bfb0-53a3e56717a6' }}
          style={[styles.buttonImageMenu, { transform: [{ scale: mapScaleAnim }]}]}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const Home = () => {
    const [showMapScreen, setShowMapScreen] = useState(false);
    const rewardsScaleAnim = useRef(new Animated.Value(1)).current;
    const passiveScaleAnim = useRef(new Animated.Value(1)).current;
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
                style={[styles.buttonImageMenu, { transform: [{ scale: rewardsScaleAnim }]}]}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.passiveButton} activeOpacity={1} onPressIn={() => bounceAnimation(passiveScaleAnim)} >
              <Animated.Image
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fpassives%20icon.png?alt=media&token=cd878bca-2667-4165-a7e0-b1796948e073' }}
                style={[styles.buttonImageMenu, { transform: [{ scale: passiveScaleAnim }]}]}
              />
            </TouchableOpacity>
          </View>
  
          <TouchableOpacity style={styles.newsButton} activeOpacity={1} onPressIn={() => bounceAnimation(newsScaleAnim)} >
            <Animated.Image
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fnewspaper.png?alt=media&token=b12866ee-2794-4d62-9d4f-a59673182398' }}
              style={[styles.buttonImageMenu, { transform: [{ scale: newsScaleAnim }]}]}
            />
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.playButton} activeOpacity={1} onPressIn={() => bounceAnimation(playScaleAnim)} >
            <Animated.Image
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Ftasto%20arancione%20semi%20ellittico.png?alt=media&token=f8d37105-4194-447e-8889-3513aedc6a1e' }}
              style={[styles.playButtonImage, { transform: [{ scale: playScaleAnim }]}]}
            />
            <Text style={styles.playButtonText} activeOpacity={1}onPressIn={bounceAnimation} >Play</Text>
          </TouchableOpacity>
  
          <View style={styles.buttonsRowBottom}>
            <TouchableOpacity style={styles.itemsButton} activeOpacity={1} onPressIn={() => bounceAnimation(itemsScaleAnim)} >
              <Animated.Image
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fitems%20icon%20V.2%202.png?alt=media&token=3e7ebce0-7fc1-45e6-ba3f-a89d0eb332f0' }}
                style={[styles.buttonImageMenu, { transform: [{ scale: itemsScaleAnim }]}]}
              />
              <Text style={styles.buttonText}></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mapButton} activeOpacity={1} onPressIn={() => bounceAnimation(mapScaleAnim)} onPress={toggleMapScreen}>
          <Animated.Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fmap%20icon.png?alt=media&token=99bc80b2-1369-4a8f-bfb0-53a3e56717a6' }}
            style={[styles.buttonImageMenu, { transform: [{ scale: mapScaleAnim }]}]}
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
      right: isSmallScreen ? 100 : 120, // Imposta valori diversi per schermi piccoli
      top: isSmallScreen ? -350 : -385,
      width: isSmallScreen ? 450 : 500, // Schermi più piccoli hanno dimensioni diverse
      height: isSmallScreen ? 450 : 500,
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
      right: 19,
      top: isSmallScreen ? 550 : 603, // Cambia la posizione in base alle dimensioni dello schermo
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
      width: '100%',
    },
    passiveButton: {
      alignItems: 'flex-end',
    },
    rewardsButton: {
      alignItems: 'flex-start',
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
      alignSelf: 'flex-start',
    },
    characterContainer: {
      position: 'absolute',
      top: '35%',
      left: '18%',
    },
    characterImage: {
      zIndex: 1,
      width: isSmallScreen ? 200 : 250, // Cambia la dimensione in base alla larghezza dello schermo
      height: isSmallScreen ? 200 : 250,
    },
    playButton: {
      top: '13%',
      zIndex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: isSmallScreen ? '45%' : '40%',
      height: isSmallScreen ? '12%' : '15%',
    },
    playButtonImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    playButtonText: {
      position: 'absolute',
      color: '#fff',
      fontSize: isSmallScreen ? 40 : 50, // Font size più piccolo per schermi più piccoli
      fontFamily: 'Tricky Jimmy',
      textShadowColor: 'black',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    buttonsRowBottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    itemsButton: {
      zIndex: 1,
      alignItems: 'flex-start',
    },
    mapButton: {
      zIndex: 1,
      alignItems: 'flex-end',
    },
    itemContainer: {
      width: width,
      height: height,
      justifyContent: 'center',
      alignItems: 'center',
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
      fontSize: isSmallScreen ? 25 : 30, // Font size più piccolo per schermi più piccoli
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
      left: '50%', 
      transform: [{ translateX: -2 }], 
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
    },
  });
  export default Home;