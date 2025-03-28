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
import { scale, ScaledSheet } from 'react-native-size-matters';
import RNFS from 'react-native-fs';
import HUD from './HUD';
import User from './User'
import Gameplay from './Gameplay';

const { width, height } = Dimensions.get('window');
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





const Home = ({ isPlaying, setIsPlaying, selectedCharacterId }) => {
  const [activeComponent, setActiveComponent] = useState('Home');
  const rewardsScaleAnim = useRef(new Animated.Value(1)).current;
  const itemsScaleAnim = useRef(new Animated.Value(1)).current;
  const newsScaleAnim = useRef(new Animated.Value(1)).current;
  const playScaleAnim = useRef(new Animated.Value(1)).current;
  const pauseScaleAnim = useRef(new Animated.Value(1)).current;
  const [transitionVisible, setTransitionVisible] = useState(false);
  const passiveScaleAnim = useRef(new Animated.Value(1)).current;
  const [visibleFart, setVisibleFart] = useState(null);
  const impulsoOpacity = useRef(new Animated.Value(1)).current;
  const opacityValues = useRef(
    Array(6).fill(null).map(() => new Animated.Value(0)) // 6 è il numero di onde che vuoi creare
  ).current;
  const checkerboardOpacity = useRef(new Animated.Value(0)).current;
  const checkerboardScale = useRef(new Animated.Value(1)).current; // Scala iniziale a 1
  const handleButtonUserPress = () => {
    setActiveComponent('User'); // Cambia lo stato per mostrare il componente User
  };
  const fartPositions = {
    1: {
      top: 200,
      right: null,
      bottom: null,
      left: 120,
    },
    2: {
      top: 380,
      right: null,
      bottom: null,
      left: null,
    },
    3: {
      top: 90,
      right: null,
      bottom: null,
      left: 15,
      transform: [{ rotate: '35deg' }],
    },
    4: {
      top: 25,
      right: 45,
      bottom: null,
      left: null,
    },
    5: {
      top: null,
      right: null,
      bottom: 30,
      left: 40,
    },
    6: {
      top: 30,
      right: 35,
      bottom: null,
      left: null,
    },
    7: {
      top: null,
      right: 50,
      bottom: 20,
      left: null,
    },
    8: {
      top: 35,
      right: null,
      bottom: null,
      left: 45,
    },
    9: {
      top: null,
      right: 45,
      bottom: 35,
      left: null,
    },
    10: {
      top: 40,
      right: null,
      bottom: null,
      left: 50,
    },
    11: {
      top: null,
      right: 55,
      bottom: 40,
      left: null,
    },
    12: {
      top: 45,
      right: 40,
      bottom: null,
      left: null,
    },
    13: {
      top: null,
      right: null,
      bottom: 45,
      left: 55,
    },
    14: {
      top: 50,
      right: 45,
      bottom: null,
      left: null,
    },
    15: {
      top: null,
      right: 60,
      bottom: 30,
      left: null,
    },
    16: {
      top: 35,
      right: null,
      bottom: null,
      left: 60,
    },
    17: {
      top: null,
      right: 50,
      bottom: 50,
      left: null,
    },
    18: {
      top: 55,
      right: null,
      bottom: null,
      left: 45,
    },
    19: {
      top: null,
      right: 65,
      bottom: 35,
      left: null,
    },
    20: {
      top: 40,
      right: null,
      bottom: null,
      left: 65,
    },
    21: {
      top: null,
      right: 55,
      bottom: 55,
      left: null,
    }
  };

  const fartImages = [
    require('../assets/images/fart1.png'),
    require('../assets/images/fart2.png'),
    require('../assets/images/fart3.png'),
  ];
  const handlePress = () => {
    // Seleziona un'immagine casuale
    const randomFart = fartImages[Math.floor(Math.random() * fartImages.length)];
    setVisibleFart(randomFart);
    console.log("VISIBLE FART: " + visibleFart)

    // Rimuovi l'immagine dopo 500ms
    setTimeout(() => {
      setVisibleFart(null);
    }, 500);
  };
  const handleBackToHome = () => {
    setActiveComponent('Home'); // Cambia lo stato per tornare al componente Home
  };
  const block1Animation = useRef(new Animated.Value(0)).current;
  const block2Animation = useRef(new Animated.Value(0)).current;
  const block3Animation = useRef(new Animated.Value(0)).current;

  const handlePlayPress = () => {
    setIsPlaying(false);
    setActiveComponent('Gameplay');
  };



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




  // Render different components based on activeComponent
  if (activeComponent === 'User') {
    return <User goBack={handleBackToHome} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />;
  }

  if (activeComponent === 'Gameplay') {
    return <Gameplay setIsPlaying={setIsPlaying} selectedCharacterId={selectedCharacterId} />;
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
  const skinItemImages = {
    marvick: require('../assets/images/Characters/Marvick.png'),
    maestroSasuke: require('../assets/images/Characters/Maestro Sasuke.png'),
    bob: require('../assets/images/Characters/BoB.png'),
    cyclop:  require('../assets/images/Characters/Cyclop.png'),
    babyAlien: require('../assets/images/Characters/Baby Alien.png'),
    george: require('../assets/images/Characters/George.png'),
    yokozuna: require('../assets/images/Characters/Yokozuna.png'),
    dracula: require('../assets/images/Characters/Dracula.png'),
    robert: require('../assets/images/Characters/Robert.png'),
    xao: require('../assets/images/Characters/Xao.png'),
    fartMan: require('../assets/images/Characters/Fartman.png'),
    alien: require('../assets/images/Characters/Alien.png'),
    mrFarte: require('../assets/images/Characters/Mr. Farté.png'),
    fangpi: require('../assets/images/Characters/Fangpì.png'),
    amaterasuTsukuyomi: require('../assets/images/Characters/Amaterasu.png'),
    stinkyBlob: require('../assets/images/Characters/Melma puzzona.png'),
    bear: require('../assets/images/Characters/Bear.png'),
    soprano: require('../assets/images/Characters/Soprano.png'),
    mrTakeshi: require('../assets/images/Characters/Mr. Takeshi.png'),
    stein: require('../assets/images/Characters/Stein.png'),
    gorilloz: require('../assets/images/Characters/Stein.png')
  };
  const itemsData = {
    1: {
      name: 'Marvick',
      rarity: 'Common',
      class: 'Homo Fartens',
      description: 'Marvick è un normale cittadino del mondo che come tutti emette delle flatulenze che non mimetizza affatto. Al contrario, le annuncia con orgoglio.',
      specialName: 'MegaFart',
      type: 'Burst',
      speed: 'Medium',
      effect: 'All’attivazione le scoregge fanno 110% del danno. Per 4 secondi appaiono le banane che se consumate provocano scoregge che fanno 250% del danno.',
      skin: skinItemImages.marvick
    },
    2: {
      name: 'Maestro Sasuke',
      rarity: 'Rare',
      class: 'Alien Fartens',
      description: 'Un alieno bizzarro con un gas tossico che tiene lontani gli invasori terrestri.',
      specialName: 'Toxic Cloud',
      type: 'Continuous',
      speed: 'Fast',
      effect: 'Produce un gas tossico che infligge danni costanti ai nemici vicini per 5 secondi.',
      skin: skinItemImages.maestroSasuke
    },
    3: {
      name: 'Bob',
      rarity: 'Epic',
      class: 'Bubble Fartens',
      description: 'Un essere magico che crea bolle di gas che esplodono al minimo tocco.',
      specialName: 'Bubble Bomb',
      type: 'Area',
      speed: 'Slow',
      effect: 'Le bolle esplodono causando danno ad area e stordendo i nemici per 3 secondi.',
      skin: skinItemImages.bob
    },
    4: {
      name: 'Cyclop',
      rarity: 'Common',
      class: 'Windy Fartens',
      description: 'Un esperto nell’arte del vento, capace di usare le sue flatulenze come raffiche offensive.',
      specialName: 'Wind Blast',
      type: 'Directional',
      speed: 'Fast',
      effect: 'Una raffica di vento che spinge i nemici indietro infliggendo danni.',
      skin: skinItemImages.cyclop
    },
    5: {
      name: 'Baby Alien',
      rarity: 'Legendary',
      class: 'Foul Fartens',
      description: 'Il re del fetore, temuto da tutti per il suo odore insostenibile.',
      specialName: 'Stench Wave',
      type: 'Burst',
      speed: 'Slow',
      effect: 'Un’ondata di fetore che causa danni enormi e debilita i nemici.',
      skin: skinItemImages.babyAlien
    },
    6: {
      name: 'George',
      rarity: 'Common',
      class: 'Whirlwind Fartens',
      description: 'Con ogni suo movimento crea vortici di aria nauseante.',
      specialName: 'Cyclone Spin',
      type: 'Area',
      speed: 'Medium',
      effect: 'Crea un ciclone che intrappola e danneggia i nemici vicini.',
      skin: skinItemImages.george
    },
    7: {
      name: 'Yokozuna',
      rarity: 'Rare',
      class: 'Cloud Fartens',
      description: 'Un essere leggero come una nuvola, ma dal gas devastante.',
      specialName: 'Gas Cloud',
      type: 'Continuous',
      speed: 'Slow',
      effect: 'Genera una nube tossica che avvelena i nemici.',
      skin: skinItemImages.yokozuna
    },
    8: {
      name: 'Dracula',
      rarity: 'Epic',
      class: 'Explosive Fartens',
      description: 'Specialista in esplosioni rapide e distruttive.',
      specialName: 'Gas Explosion',
      type: 'Burst',
      speed: 'Fast',
      effect: 'Causa un’esplosione che infligge danni critici a un gruppo di nemici.',
      skin: skinItemImages.dracula
    },
    9: {
      name: 'Robert',
      rarity: 'Legendary',
      class: 'Stealth Fartens',
      description: 'Un ninja silenzioso, il cui gas agisce di sorpresa.',
      specialName: 'Silent Strike',
      type: 'Stealth',
      speed: 'Fast',
      effect: 'Un attacco silenzioso che infligge danni critici senza avvisare i nemici.',
      skin: skinItemImages.robert

    },
    10: {
      name: 'Xao',
      rarity: 'Common',
      class: 'Sliding Fartens',
      description: 'Un maestro dello scivolamento, che usa il gas per guadagnare velocità.',
      specialName: 'Slide Attack',
      type: 'Directional',
      speed: 'Fast',
      effect: 'Scivola attraverso i nemici infliggendo danni lungo il percorso.',
      skin: skinItemImages.xao

    },
    11: {
      name: 'Fart Man',
      rarity: 'Rare',
      class: 'Fire Fartens',
      description: 'Con il suo gas infuocato, non lascia niente al suo passaggio.',
      specialName: 'Flame Burst',
      type: 'Area',
      speed: 'Medium',
      effect: 'Una fiammata che incendia il terreno, causando danni continui.',
      skin: skinItemImages.fartMan

    },
    12: {
      name: 'Alien',
      rarity: 'Epic',
      class: 'Ice Fartens',
      description: 'Un maestro del gelo che congela i nemici con il suo gas ghiacciato.',
      specialName: 'Frost Breath',
      type: 'Continuous',
      speed: 'Slow',
      effect: 'Congela i nemici, rallentandoli e infliggendo danni.',
      skin: skinItemImages.alien

    },
    13: {
      name: 'Mr Fartè',
      rarity: 'Legendary',
      class: 'Storm Fartens',
      description: 'Portatore di tempeste, con un gas che emette scariche elettriche.',
      specialName: 'Thunder Clap',
      type: 'Burst',
      speed: 'Medium',
      effect: 'Un’esplosione elettrica che paralizza i nemici e infligge danni.',
      skin: skinItemImages.mrFarte

    },
    14: {
      name: 'Fangpì',
      rarity: 'Rare',
      class: 'Dark Fartens',
      description: 'Un essere misterioso che attacca dall’ombra.',
      specialName: 'Dark Wave',
      type: 'Stealth',
      speed: 'Fast',
      effect: 'Un’onda oscura che infligge danni critici ai nemici più vicini.',
      skin: skinItemImages.fangpi

    },
    15: {
      name: 'Amaterasu&Tsukuyomi',
      rarity: 'Epic',
      class: 'Electric Fartens',
      description: 'Un esperto di scariche elettriche che usa il gas per amplificarle.',
      specialName: 'Spark Storm',
      type: 'Area',
      speed: 'Fast',
      effect: 'Una tempesta elettrica che colpisce tutti i nemici nell’area.',
      skin: skinItemImages.amaterasuTsukuyomi

    },
    16: {
      name: 'StinkyBlob',
      rarity: 'Legendary',
      class: 'Cyclone Fartens',
      description: 'Maestro delle tempeste, il cui gas crea tornado devastanti.',
      specialName: 'Tornado Blast',
      type: 'Directional',
      speed: 'Slow',
      effect: 'Un tornado che spazza via i nemici e infligge danni enormi.',
      skin: skinItemImages.stinkyBlob

    },
    17: {
      name: 'Bear',
      rarity: 'Common',
      class: 'Inferno Fartens',
      description: 'Un appassionato del fuoco che incenerisce tutto sul suo cammino.',
      specialName: 'Blazing Trail',
      type: 'Burst',
      speed: 'Medium',
      effect: 'Un’esplosione di fuoco che infligge danni ad area.',
      skin: skinItemImages.bear

    },
    18: {
      name: 'Soprano',
      rarity: 'Rare',
      class: 'Frozen Fartens',
      description: 'Un essere gelido che usa il suo gas per bloccare i nemici.',
      specialName: 'Ice Wall',
      type: 'Area',
      speed: 'Slow',
      effect: 'Crea un muro di ghiaccio che rallenta e danneggia i nemici.',
      skin: skinItemImages.soprano
    },
    19: {
      name: 'Mr Takeshi',
      rarity: 'Epic',
      class: 'Speed Fartens',
      description: 'Un velocista che usa il suo gas per superare ogni limite.',
      specialName: 'Sonic Boom',
      type: 'Directional',
      speed: 'Very Fast',
      effect: 'Un’onda sonora che infligge danni e disorienta i nemici.',
      skin: skinItemImages.mrTakeshi
    },
    20: {
      name: 'Stein',
      rarity: 'Legendary',
      class: 'Heavy Fartens',
      description: 'Un colosso dal gas così potente da schiacciare i nemici.',
      specialName: 'Gasquake',
      type: 'Area',
      speed: 'Slow',
      effect: 'Crea un terremoto di gas che infligge danni devastanti a tutti i nemici.',
      skin: skinItemImages.stein

    },
    21: {
      name: 'Gorilloz',
      rarity: 'Legendary',
      class: 'Heavy Fartens',
      description: 'Godzilla è impazzito. Ha mangiato troppo e causerà danni che faranno sffrire tutto il mondo',
      specialName: 'Porcdio',
      type: 'Area',
      speed: 'Slow',
      effect: 'Crea un pattaccone di merda dio can',
      skin: skinItemImages.gorilloz
    }
  };

  const item = itemsData[selectedCharacterId] || itemsData[1];

  console.log(visibleFart)
  return (
    <ImageBackground
      source={require('../assets/images/sfondo blu.png')}
      style={styles.page1}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.tema}>
        <Animated.Image
          source={require("../assets/images/silouette scoreggia da mettere su sfondo, dietro il livello dell'impulso di luce.png")}
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
      <HUD setIsPlaying={setIsPlaying} />
      <View style={styles.mainContainer}>
        <Animated.Image
          source={require('../assets/images/impulso di luce.png')}
          style={[styles.impulso, { opacity: impulsoOpacity }]}
        />
        <View style={styles.containerUser}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.user}
              source={require('../assets/images/Prova utente.jpeg')}
            />
            <TouchableOpacity
              style={styles.buttonUser}
              activeOpacity={1}
              onPress={handleButtonUserPress}
            >
              <Image
                source={require('../assets/images/cerchio contentente personaggio in home casupola.png')}
                style={styles.buttonImageUser}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonsRowTop}>
          <View style={styles.buttonsRowTopLeft}>
            <ImageBackground
              style={styles.buttonsRowTopLeftBackground}
              source={require('../assets/images/balaustrino home.png')}
            />
            <TouchableOpacity style={styles.rewardsButton} activeOpacity={1} onPressIn={() => bounceAnimation(rewardsScaleAnim)} >
              <Animated.Image
                source={require('../assets/images/rewards icon.png')}
                style={[styles.buttonImageMenu, { transform: [{ scale: rewardsScaleAnim }] }]}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemsButton} activeOpacity={1} onPressIn={() => bounceAnimation(itemsScaleAnim)} >
              <Animated.Image
                source={require('../assets/images/items icon V.2 2.png')}
                style={[styles.buttonImageMenu, { transform: [{ scale: itemsScaleAnim }] }]}
              />
              <Text style={styles.buttonText}></Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsRowTopRight}>
            <ImageBackground
              style={styles.buttonsRowTopRightBackground}
              source={require('../assets/images/balaustrino home.png')}
            />
            <TouchableOpacity style={styles.itemsButton} activeOpacity={1} onPressIn={() => bounceAnimation(passiveScaleAnim)} >
              <Animated.Image
              source={require('../assets/images/passives icon.png')}
              style={[styles.buttonImageMenu, { transform: [{ scale: passiveScaleAnim }] }]}
              />
              <Text style={styles.buttonText}></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.newsButton} activeOpacity={1} onPressIn={() => bounceAnimation(newsScaleAnim)} >
              <Animated.Image
              source={require('../assets/images/newspaper.png')}
              style={[styles.buttonImageMenu, { transform: [{ scale: newsScaleAnim }] }]}
              />
              <Text style={styles.buttonText}></Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.characterContainer}>
          <Image
            source={{ uri: item.skin }}
            style={styles.characterImage}
            resizeMode="contain"
          />
          <Image
            source={require('../assets/images/piattaforma skin home.png')}
            style={styles.ombra}
            resizeMode="contain"
          />
          {visibleFart && (
            <Image
              source={visibleFart}
              style={[styles.farts, fartPositions[selectedCharacterId] || fartPositions[1]]} />
          )}

        </View>
        <TouchableOpacity style={styles.playButton}
          activeOpacity={1}
          onPress={handlePlayPress}
          onPressIn={() => bounceAnimation(playScaleAnim)} >
          <Animated.Image
            source={require('../assets/images/tasto arancione semi ellittico.png')}
            style={[styles.playButtonImage, { transform: [{ scale: playScaleAnim }] }]}
          />
          <Text style={styles.playButtonText}>
            Play
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={handlePress} style={styles.fartButton} />
      </View>
      {transitionVisible && (
        <View style={[styles.cascade]}>
          <Animated.View
            style={[
              styles.animatedBlock,
              {
                backgroundColor: 'red',
                height: '70%',
                transform: [{
                  translateY: block1Animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [height, 0]
                  })
                }],
                zIndex: 3
              }
            ]}
          />
          <Animated.View
            style={[
              styles.animatedBlock,
              {
                backgroundColor: 'yellow',
                height: '20%',
                transform: [{
                  translateY: block2Animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [height, -height * 0.7]
                  })
                }],
                zIndex: 2
              }
            ]}
          />
          <Animated.View
            style={[
              styles.animatedBlock,
              {
                backgroundColor: 'orange',
                height: '10%',
                transform: [{
                  translateY: block3Animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [height, -height * 0.9]
                  })
                }],
                zIndex: 1
              }
            ]}
          />
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerUser: {
    zIndex: 10,
    elevation: 10,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-start',
    top: 30,
  },
  imageContainer: {
    position: 'relative',
    width: 95,
    height: 95,
  },
  fartButton: {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 0,
  },
  farts: {
    width: '30%',
    height: '30%',
    resizeMode: 'contain',
    position: 'absolute',
  },
  user: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    transform: [{ scale: 0.8 }],
    resizeMode: 'cover',
    borderRadius: 360,
    zIndex: 1,
  },
  buttonUser: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    transform: [{ scale: 0.8 }],
    borderRadius: 360,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  buttonImageUser: {
    width: '100%',
    height: '100%',
    borderRadius: 360,
    resizeMode: 'cover',
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
  characterContainer: {
    pointerEvents: 'none',
    flex: 1, // Occupa tutto lo spazio disponibil
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra orizzontalmente
    position: 'relative',
    marginTop: height * 0.2
  },
  characterImage: {
    position: 'absolute',
    zIndex: 1,
    width: '100%', // Puoi regolare dinamicamente se necessario
    height: '100%',
  },
  ombra: {
    position: 'relative', // Sovrappone l'immagine sotto
    width: 550,
    height: 720,
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
    zIndex: 15,
    elevation: 15,
    width: '100%',
    height: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    elevation: 6,
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
    top: getSize(0, 0, 80),
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
  playButton: {
    top: 40,
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
    fontSize: 48, // Font size più piccolo per schermi più piccoli
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
export default Home;