import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  TextInput,
  Image,
  ImageBackground,
  Text,
  ScrollView,
  StatusBar,
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Mission from './components/Mission';
import Skin from './components/Skin';
import Shop from './components/Shop';
import Home from './components/Home';
import MapScreen from './components/MapScreen';
import Immersive from 'react-native-immersive';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

const SUPABASE_URL = 'https://mtwsyxmhjhahirdeisnz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10d3N5eG1oamhhaGlyZGVpc256Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNDYxMDgsImV4cCI6MjA1ODkyMjEwOH0.-5qoeUa4iXkXMsN3vRW4df3WyKOETavF6lqnRHNN8Pk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const { width, height } = Dimensions.get('window');

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
const sbarraCombattimento = require('./assets/images/sbarra_combattimento.png');

const localImages = [
  require('./assets/images/Sfondo.png'),
  require('./assets/images/Scoreggia.png'),
  require('./assets/images/PersonaggiTitolo.png'),
  require('./assets/images/barra.png'),
  require('./assets/images/barra1.png'),
];

const imageUrls = [
  require('./assets/images/toilettatura.png'),
  require('./assets/images/personaggi_icona_menu.png'),
  require('./assets/images/home_simbolo.png'),
  require('./assets/images/rotolo_missione.png'),
  require('./assets/images/map_icon.png'),
];

const App = () => {
  const [Paused, setPaused] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedCharacterId, setSelectedCharacterId] = useState(1);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(2);
  const [activeIndex, setActiveIndex] = useState(2);
  const block1Animation = useRef(new Animated.Value(0)).current;
  const block2Animation = useRef(new Animated.Value(0)).current;
  const block3Animation = useRef(new Animated.Value(0)).current;
  const [transitionVisible, setTransitionVisible] = useState(false);
  const [storagePermissionsGranted, setStoragePermissionsGranted] = useState(false);
  const pages = [<Shop isPlaying={isPlaying} setIsPlaying={setIsPlaying} />,
  <Skin isPlaying={isPlaying} setIsPlaying={setIsPlaying} setSelectedCharacterId={setSelectedCharacterId} />,
  <Home isPlaying={isPlaying} setIsPlaying={setIsPlaying} Paused={Paused} setPaused={setPaused}selectedCharacterId={selectedCharacterId} />,
  <Mission isPlaying={isPlaying} setIsPlaying={setIsPlaying} />,
  <MapScreen isPlaying={isPlaying} setIsPlaying={setIsPlaying} />];

  const scrollX = useRef(new Animated.Value(0)).current;
  const scaleValues = useRef(imageUrls.map(() => new Animated.Value(0.8))).current;
  const translateYValues = useRef(imageUrls.map(() => new Animated.Value(0))).current;
  const fadeOutOpacity = useRef(new Animated.Value(1)).current;
  const fadeInOpacity = useRef(new Animated.Value(0)).current;
  const progressValue = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = useState(true);
  const checkerboardOpacity = useRef(new Animated.Value(0)).current;
  const checkerboardScale = useRef(new Animated.Value(1)).current;
  const [isReady, setIsReady] = useState(false);
  const [fadeScreenVisible, setFadeScreenVisible] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [username, setUsername] = useState('');
  const [registrationCompleted, setRegistrationCompleted] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('loggedInUser');

        if (storedUser) {
          // Set the username from storage
          setUsername(storedUser);

          // Update registration state
          setRegistrationCompleted(true);
          setShowRegistration(false);

          // Fetch user data from Supabase
          const { data, error } = await supabase
            .from('main') //tabella
            .select('*')
            .eq('user', storedUser)
            .single();

          if (error) {
            console.error('Errore durante il fetch da Supabase:', error);
            return;
          }

          console.log('Dati utente recuperati:', data);

          // Move these logs to a separate useEffect to see the updated values
        } else {
          setShowRegistration(true);
        }
      } catch (error) {
        console.error('Errore nel recupero utente o fetch Supabase:', error);
      }
    };

    checkLoggedInUser();
  }, []);

  useEffect(() => {
    console.log("REGISTRATION COMPLETED:", registrationCompleted);
    console.log("SHOW REGISTRATION:", showRegistration);
  }, [registrationCompleted, showRegistration]);

  const RegistrationForm = React.memo(({ onRegistrationComplete }) => {
    const [username, setUsername] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const inputRef = useRef(null);

    const handleSubmit = useCallback(async () => {
      if (isSubmitting) return; // Evita più clic
      setIsSubmitting(true);
      Keyboard.dismiss();

      if (!username.trim()) {
        Alert.alert('Errore', 'Inserisci un username valido');
        setIsSubmitting(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('main')
          .insert([{ user: username.trim() }])
          .select();

        if (error) throw error;

        await AsyncStorage.setItem('loggedInUser', username.trim());
        onRegistrationComplete();
      } catch (error) {
        console.error("Errore durante la registrazione:", error);
        Alert.alert('Errore', 'Si è verificato un errore durante la registrazione');
        setIsSubmitting(false);
      }
    }, [username, onRegistrationComplete, isSubmitting]);

    return (
      <View style={styles.registrationContainer}>
        <ImageBackground
          source={require('./assets/images/sfondo_blu.png')}
          style={styles.registrationBackground}
          resizeMode="cover"
        >
          <View style={styles.registrationContent}>
            <Image
              source={require('./assets/images/rettangolo_arancione_basso.png')}
              style={styles.orangeBackground}
              resizeMode="stretch"
            />

            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.formContainer}
              keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
            >
              <Text style={styles.registrationText}>Scegli il tuo username:</Text>

              <TextInput
                ref={inputRef}
                style={styles.registrationInput}
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
                placeholderTextColor="#aaa"
                maxLength={20}
                autoCapitalize="none"
                autoCorrect={false}
                onSubmitEditing={handleSubmit}
                returnKeyType="done"
                blurOnSubmit={false}
              />

              {!isSubmitting && (
                <TouchableOpacity
                  style={styles.registrationButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.registrationButtonText}>INIZIA</Text>
                </TouchableOpacity>
              )}
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    );
  });



  const goToPage = (index) => {
    setFadeScreenVisible(true);
    setTransitionVisible(true);

    const upAnimation = Animated.parallel([
      Animated.timing(block1Animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(block2Animation, {
        toValue: 1,
        duration: 200,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.timing(block3Animation, {
        toValue: 1,
        duration: 200,
        delay: 150,
        useNativeDriver: true,
      })
    ]);

    const downAnimation = Animated.parallel([
      Animated.timing(block1Animation, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(block2Animation, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(block3Animation, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      })
    ]);

    Animated.sequence([
      upAnimation,
      Animated.delay(200),
      downAnimation
    ]).start(() => {
      setTransitionVisible(false);
      flatListRef.current?.scrollToIndex({ index, animated: false });
      setCurrentIndex(index);
    });

    Animated.timing(fadeInOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index, animated: true });
        setCurrentIndex(index);

        Animated.timing(fadeInOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setFadeScreenVisible(false);
        });
      }, 300);
    });
  };

  const preloadImages = async () => {
    const localPromises = localImages.map((image) =>
      Image.prefetch(Image.resolveAssetSource(image).uri)
    );

    await Promise.all([...localPromises]);
  };

  useEffect(() => {
    const loadAssets = async () => {
      await preloadImages();
      setIsReady(true);
    };
    loadAssets();
  }, []);

  useEffect(() => {
    const scaleAnimation = Animated.timing(checkerboardScale, {
      toValue: 1.1,
      duration: 4000,
      useNativeDriver: true,
    });

    const fadeAnimation = Animated.sequence([
      Animated.timing(checkerboardOpacity, {
        toValue: 0.8,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(checkerboardOpacity, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]);

    const combinedAnimation = Animated.parallel([scaleAnimation, fadeAnimation]);
    Animated.loop(combinedAnimation).start();
  }, []);

  useEffect(() => {
    const animation = Animated.timing(progressValue, {
      toValue: 100,
      duration: 5000,
      useNativeDriver: false,
    });

    animation.start(() => {
      Animated.timing(fadeOutOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setIsVisible(false);
        // Mostra la schermata di registrazione invece di andare direttamente alla home
        setShowRegistration(true);
      });
    });

    return () => animation.stop();
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" hidden={true} />

      {/* Schermata di caricamento */}
      {isVisible && (
        <Animated.View
          style={[
            styles.fullScreenButtonContainer,
            { opacity: fadeOutOpacity, position: 'absolute', width: '100%', height: '100%', zIndex: 10 }
          ]}
        >
          <Animated.View style={[styles.whiteBG, { opacity: fadeOutOpacity }]} />
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
          <Text style={styles.gameText}>{selectedText}</Text>
          <View style={styles.progressBarContainer}>
            <Image
              source={require('./assets/images/barra.png')}
              style={styles.progressBarBackground}
              resizeMode="stretch"
            />
            <Animated.View
              style={[styles.progressFill, { width: progressInterpolation }]}
            >
              <Image
                source={require('./assets/images/barra1.png')}
                style={styles.progressFillImage}
                resizeMode="stretch"
              />
            </Animated.View>
          </View>
        </Animated.View>
      )}
      {/* App principale */}
      {registrationCompleted ? (
        <>
          {!isPlaying && (
            <ImageBackground
              source={sbarraCombattimento}
              style={styles.bottomBackground}
              accessible={true}
              accessibilityLabel="Sbarra di combattimento"
              onError={() => console.error('[Image Error] Failed to load CombatBar image')}
            >
              {/* <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Button 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Button 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Button 3</Text>
          </TouchableOpacity>
        </View> */}
            </ImageBackground>
          )}

          <Animated.FlatList
            data={pages}
            renderItem={({ item }) => <SafeAreaView style={styles.pageContainer}>{item}</SafeAreaView>}
            horizontal
            pagingEnabled
            ref={flatListRef}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            initialScrollIndex={2}
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
            keyboardShouldPersistTaps="handled"
          />
          {isPlaying && (
            <>
              <SafeAreaView style={styles.bottomContainer}>
                <Image
                  source={require('./assets/images/balaustra_inferiore.png')}
                  style={styles.bottomImage}
                />
              </SafeAreaView>
              <SafeAreaView style={styles.indicatorContainer}>
                {imageUrls.map((url, index) => (
                  <TouchableOpacity key={index} onPress={() => goToPage(index)} activeOpacity={1}>
                    <Animated.View
                      style={{ transform: [{ scale: scaleValues[index] }, { translateY: translateYValues[index] }] }}
                    >
                      <Image
                        source={url}
                        style={styles.indicator}
                        resizeMode="contain"
                      />
                    </Animated.View>
                  </TouchableOpacity>
                ))}
              </SafeAreaView>
            </>
          )}
        </>
      ) : (
        showRegistration && (
          <RegistrationForm
            onRegistrationComplete={() => {
              setRegistrationCompleted(true);
              setShowRegistration(false);
              goToPage(2);
            }}
          />
        )
      )}
      {fadeScreenVisible && (
        <Animated.View style={[styles.fadeScreen, { opacity: fadeInOpacity }]} />
      )}
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  bottomBackground: {
    elevation: 99,
    zIndex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  pageContainer: {
    width: width,
    height: height,
  },
  registrationContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 20,
  },
  registrationBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registrationContent: {
    width: '80%',
    alignItems: 'center',
    position: 'relative', // Per posizionamento assoluto dello sfondo
  },
  orangeBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%', // O un valore specifico se vuoi controllare l'altezza
    top: 0,
    left: 0,
    zIndex: 0, // Manda dietro al contenuto
  },
  registrationImage: {
    width: 200,
    height: 100,
    marginBottom: 30,
  },
  registrationText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'LuckiestGuy-8jyD', // Sostituisci con il tuo font
  },
  registrationInput: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 30,
    color: 'black',
  },
  registrationButton: {
    backgroundColor: '#FFD700', // Colore oro
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 5,
  },
  registrationButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'LuckiestGuy-8jyD', // Sostituisci con il tuo font
  },
  animatedBlock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
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
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 10,
    borderColor: '#87CEFA',
    borderWidth: 5,
    padding: 20,
    width: '75%',
    top: 200,
    fontSize: 18,
    fontFamily: 'LuckiestGuy-8jyD',
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  cascade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: height,
    zIndex: 10,
  },
  fadeScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'DodgerBlue',
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
    elevation: 5,
    zIndex: 11,
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
    width: 55,
    height: 55,
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


