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
  StatusBar,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Mission from './components/Mission';
import Skin from './components/Skin';
import Shop from './components/Shop';
import Home from './components/Home';
import MapScreen from './components/MapScreen';
import Immersive from 'react-native-immersive';
const { width, height } = Dimensions.get('window');




const pages = [<Shop />, <Skin />, <Home />, <Mission />, <MapScreen />];

const localImages = [
  require('./assets/images/Sfondo.png'),
  require('./assets/images/Scoreggia.png'),
  require('./assets/images/PersonaggiTitolo.png'),
  require('./assets/images/barra.png'),
  require('./assets/images/barra1.png'),
];


const imageUrls = [
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Navigation%20Bar%20Icons%2Ftoilettatura.png?alt=media&token=ba9f3b7e-01ef-4c35-9874-c5f2f1061ecd',
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Navigation%20Bar%20Icons%2Fpersonaggi%20icona%20men%C3%B9.png?alt=media&token=b45e969a-7a86-4b71-a0f4-399a001587f6',
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Navigation%20Bar%20Icons%2Fhome%20simbolo.png?alt=media&token=25ccbe53-120e-4ca1-be13-45f2deee520b',
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Navigation%20Bar%20Icons%2Frotolo%20missione.png?alt=media&token=1badebd8-2727-4840-a03f-2e7aa3c1105a',
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fmap%20icon.png?alt=media&token=99bc80b2-1369-4a8f-bfb0-53a3e56717a6',
];

const preloadImages = async () => {
  // Pre-caricamento immagini locali
  const localPromises = localImages.map((image) =>
    Image.prefetch(Image.resolveAssetSource(image).uri)
  );


  await Promise.all([...localPromises]);
};

const ItemComponent = React.memo(({ item }) => {
  return (
    <View style={styles.pageContainer}>
      {item}
    </View>
  );
});

const App = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(2);
  const [activeIndex, setActiveIndex] = useState(2);

  const scrollX = useRef(new Animated.Value(0)).current;
  const scaleValues = useRef(imageUrls.map(() => new Animated.Value(0.8))).current;
  const translateYValues = useRef(imageUrls.map(() => new Animated.Value(0))).current;
  const fadeOutOpacity = useRef(new Animated.Value(1)).current;
  const fadeInOpacity = useRef(new Animated.Value(0)).current;
  const progressValue = useRef(new Animated.Value(0)).current; // Valore per la barra di caricamento
  const [isVisible, setIsVisible] = useState(true); // Stato per visibilità dell'immagine a schermo intero
  const checkerboardOpacity = useRef(new Animated.Value(0)).current;
  const checkerboardScale = useRef(new Animated.Value(1)).current; // Scala iniziale a 1
  const [isReady, setIsReady] = useState(false);
  const [fadeScreenVisible, setFadeScreenVisible] = useState(false); // Stato per la schermata di fade
  const goToPage = (index) => {
    // Mostra la schermata di dissolvenza bianca prima di fare lo scroll
    setFadeScreenVisible(true);
    flatListRef.current?.scrollToIndex({ index, animated: false });

    // Animazione di dissolvenza bianca
    Animated.timing(fadeInOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index, animated: true });
        setCurrentIndex(index);

        // Dopo che la schermata di dissolvenza è apparsa, la facciamo scomparire
        Animated.timing(fadeInOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setFadeScreenVisible(false);
        });
      }, 500); // Mantieni la schermata bianca per 300ms prima di fare lo scroll
    });
  };
  useEffect(() => {
    // Pre-carica tutte le immagini prima di mostrare l'app
    const loadAssets = async () => {
      await preloadImages();
      setIsReady(true); // Una volta pre-caricate, mostra l'app
    };
    loadAssets();
  }, []);


  useEffect(() => {
    // Configura l'animazione per la scala
    const scaleAnimation = Animated.timing(checkerboardScale, {
      toValue: 1.1, // Diventa il doppio della dimensione originale
      duration: 4000,
      useNativeDriver: true,
    });

    // Configura l'animazione per l'opacità
    const fadeAnimation = Animated.sequence([
      Animated.timing(checkerboardOpacity, {
        toValue: 0.8, // Diventa visibile
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(checkerboardOpacity, {
        toValue: 0, // Diventa invisibile
        duration: 2000,
        useNativeDriver: true,
      }),
    ]);

    // Combina scala e opacità
    const combinedAnimation = Animated.parallel([scaleAnimation, fadeAnimation]);

    // Loop continuo
    Animated.loop(combinedAnimation).start();
  }, []);


  useEffect(() => {
    // Avvia l'animazione della barra di caricamento
    const animation = Animated.timing(progressValue, {
      toValue: 100, // Fine dell'animazione (100%)
      duration: 30000, // 20 secondi per completare
      useNativeDriver: false, // Deve essere false per larghezza (non supporta il layout)
    });

    animation.start(() => {
      // Una volta completata l'animazione, nascondi l'immagine
      Animated.timing(fadeOutOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setIsVisible(false);
        goToPage(2);
      });
    });

    return () => animation.stop(); // Ferma l'animazione in caso di smontaggio del componente
  }, []);


  const progressInterpolation = progressValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });







  const onViewRef = useRef(({ viewableItems, changed }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;

      setCurrentIndex(newIndex);
      setActiveIndex(newIndex);

      setTimeout(() => {
        console.log('--- Scroll Debug Info ---');
        console.log('Viewable Items:', viewableItems.map(item => ({ index: item.index, key: item.key })));
        console.log('Changed:', changed.map(item => ({ index: item.index, key: item.key, isViewable: item.isViewable })));
        console.log('New Index:', newIndex);
        console.log('Current Index:', newIndex);
        console.log('Active Index:', newIndex);
        console.log('------------------------');
      }, 0);

      animateIcons(newIndex);
    }
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const animateIcons = (selectedIndex) => {
    const animations = imageUrls.map((_, index) => {
      const isSelected = index === selectedIndex;

      return Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleValues[index], {
            toValue: isSelected ? 1.3 : 0.9,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(translateYValues[index], {
            toValue: isSelected ? -20 : 0,
            duration: 300,
            friction: 3.5,
            useNativeDriver: true,
          }),
        ]),
      ]);
    });

    Animated.parallel(animations).start();
  };

  useEffect(() => {
    console.log('State Updated - Current Index:', currentIndex, 'Active Index:', activeIndex);
  }, [currentIndex, activeIndex]);

  useEffect(() => {
    Immersive.on();

    return () => {
      Immersive.off();
    };
  }, []);


  const getInterpolatedScale = (index) => {
    return scrollX.interpolate({
      inputRange: [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
      ],
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });
  };

  const getInterpolatedTranslateY = (index) => {
    return scrollX.interpolate({
      inputRange: [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
      ],
      outputRange: [0, -20, 0],
      extrapolate: 'clamp',
    });
  };

  const getItemLayout = (data, index) => ({
    length: width,
    offset: width * index,
    index,
  });

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: 2, animated: false });
    }
  }, []);
  const [selectedText, setSelectedText] = useState('');

  const textOptions = [
    'ogni anno Robert partecipa alla "gara internazionale degli incontinenti" e fa sempre ultimo.',
    "Anticamente in Cina si narrava di un leggendario Drago in grado di scorreggiare fuochi d'artificio. Purtroppo nel tempo questa leggenda è stata dimenticata...",
    "Fartman ha fatto il giro del mondo per tre volte di fila volando con l'uso delle sue scoregge."
  ];

  useEffect(() => {
    const randomText = textOptions[Math.floor(Math.random() * textOptions.length)];
    setSelectedText(randomText);
  }, []);

  if (isVisible) {
    return (
      <Animated.View
        style={[
          styles.fullScreenButtonContainer,
          { opacity: fadeOutOpacity },
        ]}
      >
        <Animated.View style={[styles.whiteBG, { opacity: fadeOutOpacity }]}>

        </Animated.View>
        <Image
          source={require('./assets/images/Sfondo.png')}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />
        <SafeAreaView style={styles.tema}>
          <Animated.Image
            source={require('./assets/images/Scoreggia.png')}
            style={[
              styles.checkerboard,
              {
                opacity: checkerboardOpacity,
                transform: [{ scale: checkerboardScale }],
              },
            ]}
            resizeMode="repeat"
          />
        </SafeAreaView>
        <Image
          source={require('./assets/images/PersonaggiTitolo.png')}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />
        <Text style={styles.gameText}>
          {selectedText}
        </Text>
        <View style={styles.progressBarContainer}>
          <Image
            source={require('./assets/images/barra.png')}
            style={styles.progressBarBackground}
            resizeMode="stretch"
          />

          <Animated.View
            style={[
              styles.progressFill,
              { width: progressInterpolation },
            ]}
          >
            <Image
              source={require('./assets/images/barra1.png')}
              style={styles.progressFillImage}
              resizeMode="stretch"
            />
          </Animated.View>
        </View>
      </Animated.View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" hidden={true} />
      {currentIndex === 2}
      <Animated.FlatList
        data={pages}
        renderItem={({ item, index }) => (
          <SafeAreaView style={styles.pageContainer}>
            {item}
          </SafeAreaView>
        )}
        horizontal
        pagingEnabled
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        keyExtractor={(item, index) => `page_${index}`}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onViewableItemsChanged={onViewRef}
        viewabilityConfig={viewConfigRef.current}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        scrollEnabled={false}
      />
      <SafeAreaView style={styles.bottomContainer}>
        <Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fbalaustra%20inferiore.png?alt=media&token=5222eb2e-a57a-487e-99d1-6eb0a3f59644' }}
          style={styles.bottomImage}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.indicatorContainer}>
        {imageUrls.map((url, index) => {
          const scale = scaleValues[index];
          const translateY = translateYValues[index];
          return (
            <TouchableOpacity key={index} onPress={() => goToPage(index)} activeOpacity={1}>
              <Animated.View
                style={{
                  transform: [
                    { scale: scale },
                    { translateY: translateY },
                  ],
                }}
              >
                <Image
                  source={{ uri: url }}
                  style={styles.indicator}
                  resizeMode="contain"
                />
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </SafeAreaView>
      {fadeScreenVisible && (
        <Animated.View
          style={[
            styles.fadeScreen,
            { opacity: fadeInOpacity },
          ]}
        />
      )}
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },

  titolo: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'flex-start',
    top: 0,
  },

  gameText: {
    width: '80%',
    top: 200,
    fontSize: 18,
    fontFamily: 'LuckiestGuy-8jyD',
    color: 'white',
    textAlign: 'justify',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  fadeScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    width: width,
    height: height,
    zIndex: 10,
  },
  whiteBG: {
    backgroundColor: 'white',
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tema: {
    position: 'absolute',
    width: width,
    height: height,
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
  },
  checkerboard: {
    position: 'absolute',
    flex: 1,
    width: width,
    height: height,
  },
  fullScreenButtonContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 10,
  },
  fullScreenImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  progressBarContainer: {
    width: '100%',
    bottom: 0,
    height: 25,
    position: 'absolute',
  },
  progressBarBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  progressFill: {
    height: '100%',
    position: 'absolute',
  },
  progressFillImage: {
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
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    resizeMode: 'cover',
    zIndex: 5,
    height: height * 0.14, // 15% dell'altezza dello schermo
  },
  
  bottomImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  rectangle: {
    width: '400vh',
    height: '350vh',
    backgroundColor: '#ffb57a',
    borderWidth: 15,
    borderColor: '#f9923e',
    position: 'relative',
    top: '50%',
    transform: [{ translateY: -500 }],
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  imageWrapper: {
    backgroundColor: '#ffd3ae',
    width: '30%',
    aspectRatio: 1,
    marginBottom: 50,
    alignItems: 'center',
  },
  indicatorContainer: {
    elevation: 5,
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  indicator: {
    width: 60,
    height: 60,
    marginHorizontal: 11,
  },
  buttonContainer: {
    paddingRight: 0,
    borderRightWidth: 4,
    borderRightColor: '#fff',
  },
  newImage: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  rotatedText: {
    fontSize: 40,
    color: 'white',
    transform: [{ rotate: '-3.3deg' }],
    marginVertical: 10,
    position: 'absolute',
    fontFamily: 'Chubby Cheeks',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  LimitedOffer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  Timer: {
    width: 50,
    height: 50,
    position: 'absolute',
    left: 0,
    bottom: 90,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 500,
  },
  shopButtonText: {
    top: '38%',
    width: '100%',
    position: 'absolute',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Chubby Cheeks',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  topRightText: {
    position: 'absolute',
    top: -15,
    right: -15,
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Chubby Cheeks',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    textShadowColor: 'orange',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    padding: 5,
    borderRadius: 5,
  },
  zigzagImage: {
    position: 'absolute',
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  animatedBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
  imageButtonContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    alignItems: 'center',
  },

});

export default App;


