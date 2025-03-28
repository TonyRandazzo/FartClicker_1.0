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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Video from 'react-native-video';
import VideoCache from './VideoCache';
import RNFS from 'react-native-fs';
import HUD from './HUD'
import Info from './Info';




const { width, height } = Dimensions.get('window');

const diagonal = Math.sqrt(width ** 2 + height ** 2) / (width / height);

const isSmallScreen = diagonal >= 5 && diagonal <= 7;
const isMediumScreen = diagonal > 7 && diagonal <= 8.5;
const isLargeScreen = diagonal > 8.5;

const getSize = (small, medium, large) => {
  if (isSmallScreen) return small;
  if (isMediumScreen) return medium;
  if (isLargeScreen) return large;
};

const Skin = ({ isPlaying, setIsPlaying, setSelectedCharacterId }) => {
  const [switchComponent, setSwitchComponent] = useState('Select')
  const [activeButton, setActiveButton] = useState('skin');
  const [visibleOptionsId, setVisibleOptionsId] = useState(false);
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loopAnimation = () => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 2000, // Durata dell'opacità a 0
          useNativeDriver: true,
        }),
        Animated.delay(1000), // Ritardo prima di tornare a 1
        Animated.timing(opacity, {
          toValue: 1,
          duration: 2000, // Durata dell'opacità a 1
          useNativeDriver: true,
        }),
      ]).start(() => loopAnimation());
    };

    loopAnimation();
  }, [opacity]);

  const skinItemImages = {
    marvick: require('../assets/images/Facce/mezzob marvick.png'),
    maestroSasuke: require('../assets/images/Facce/mezzob sasuke.png'),
    bob: require('../assets/images/Facce/mezzob bob.png'),
    cyclop: require('../assets/images/Facce/mezzob cyclop.png'),
    babyAlien: require('../assets/images/Facce/mezzobusto alien.png'),
    george: require('../assets/images/Facce/mezzob george.png'),
    yokozuna: require('../assets/images/Facce/mezzob yokkozuna.png'),
    dracula: require('../assets/images/Facce/Mezzob Draccula.png'),
    robert: require('../assets/images/Facce/mezzob robert.png'),
    xao: require('../assets/images/Facce/mezzob xao.png'),
    fartMan: require('../assets/images/Facce/mezzob fartman.png'),
    alien: require('../assets/images/Facce/alien aduto mezzob.png'),
    mrFarte: require('../assets/images/Facce/mezzob Mr. Fartè.png'),
    fangpi: require('../assets/images/Facce/mezzob fangpiì.png'),
    amaterasuTsukuyomi: require('../assets/images/Facce/mezzob tuskuamateras.png'),
    stinkyBlob: require('../assets/images/Facce/mezzob melma puzzonsa.png'),
    bear: require('../assets/images/Facce/mezzobusto bear.png'),
    soprano: require('../assets/images/Facce/mezzob soprano.png'),
    mrTakeshi: require('../assets/images/Facce/mezzob mr. takeshi.png'),
    stein: require('../assets/images/Facce/mezzob stein.png'),
    gorilloz: require('../assets/images/Facce/mezzob gorilloz.png')
  };
  const skinItemRarities = {
    comune: require('../assets/images/cornice intera comune.png'),
    non_comune: require('../assets/images/cornice intera non comune.png'),
    raro: require('../assets/images/cornice_intera_raro-transformed.png'),
    epico: require('../assets/images/cornice intera epico.png'),
    leggendario: require('../assets/images/cornice intera leggendaria.png'),
    mitico: require('../assets/images/cornice intera mitico.png'),
    divinità: require('../assets/images/cornice intera divinità.png'),
  }
  const skinItemBackgrounds = {
    comune: require('../assets/images/sfondo blu con sfumatura biancastra della schermata home.png'),
    raro: require('../assets/images/sfondo raro.png'),
    non_comune: require('../assets/images/sfondo non comune.png'),
    epico: require('../assets/images/sfondo epico.png'),
    leggendario: require('../assets/images/sfondo leggendaria.png'),
    mitico: require('../assets/videos/mitico.png'),
    divinità: require('../assets/videos/divinita.png'),
  };

  const skinItems = [
    { id: 1, name: 'Marvick', image: skinItemImages.marvick, background: skinItemBackgrounds.comune, rarity: skinItemRarities.comune, class: 'Warrior' },
    { id: 2, name: 'Maestro Sasuke', image: skinItemImages.maestroSasuke, background: skinItemBackgrounds.raro, rarity: skinItemRarities.raro, class: 'Mage' },
    { id: 3, name: 'Bob', image: skinItemImages.bob, background: skinItemBackgrounds.raro, rarity: skinItemRarities.raro, class: 'Ranger' },
    { id: 4, name: 'Cyclop', image: skinItemImages.cyclop, background: skinItemBackgrounds.comune, rarity: skinItemRarities.comune, class: 'Assassin' },
    { id: 5, name: 'Baby Alien', image: skinItemImages.babyAlien, background: skinItemBackgrounds.comune, rarity: skinItemRarities.comune, class: 'Paladin' },
    { id: 6, name: 'George', image: skinItemImages.george, background: skinItemBackgrounds.non_comune, rarity: skinItemRarities.non_comune, class: 'Rogue' },
    { id: 7, name: 'Yokozuna', image: skinItemImages.yokozuna, background: skinItemBackgrounds.epico, rarity: skinItemRarities.epico, class: 'Archer' },
    { id: 8, name: 'Dracula', image: skinItemImages.dracula, background: skinItemBackgrounds.leggendario, rarity: skinItemRarities.leggendario, class: 'Golem' },
    { id: 9, name: 'Robert', image: skinItemImages.robert, background: skinItemBackgrounds.non_comune, rarity: skinItemRarities.non_comune, class: 'Necromancer' },
    { id: 10, name: 'Xao', image: skinItemImages.xao, background: skinItemBackgrounds.non_comune, rarity: skinItemRarities.non_comune, class: 'Knight' },
    { id: 11, name: 'Fart Man', image: skinItemImages.fartMan, background: skinItemBackgrounds.mitico, rarity: skinItemRarities.mitico, class: 'Sorceress' },
    { id: 12, name: 'Alien', image: skinItemImages.alien, background: skinItemBackgrounds.leggendario, rarity: skinItemRarities.leggendario, class: 'Nomad' },
    { id: 13, name: 'Mr Fartè', image: skinItemImages.mrFarte, background: skinItemBackgrounds.leggendario, rarity: skinItemRarities.leggendario, class: 'Lord' },
    { id: 14, name: 'Fangpì', image: skinItemImages.fangpi, background: skinItemBackgrounds.mitico, rarity: skinItemRarities.mitico, class: 'Shaman' },
    { id: 15, name: 'Amaterasu&Tsukuyomi', image: skinItemImages.amaterasuTsukuyomi, background: skinItemBackgrounds.divinità, rarity: skinItemRarities.divinità, class: 'Monk' },
    { id: 16, name: 'StinkyBlob', image: skinItemImages.stinkyBlob, background: skinItemBackgrounds.epico, rarity: skinItemRarities.epico, class: 'Giant' },
    { id: 17, name: 'Bear', image: skinItemImages.bear, background: skinItemBackgrounds.non_comune, rarity: skinItemRarities.non_comune, class: 'Captain' },
    { id: 18, name: 'Soprano', image: skinItemImages.soprano, background: skinItemBackgrounds.raro, rarity: skinItemRarities.raro, class: 'Priestess' },
    { id: 19, name: 'Mr Takeshi', image: skinItemImages.mrTakeshi, background: skinItemBackgrounds.comune, rarity: skinItemRarities.comune, class: 'Priestess' },
    { id: 20, name: 'Stein', image: skinItemImages.stein, background: skinItemBackgrounds.epico, rarity: skinItemRarities.epico, class: 'Priestess' },
    { id: 21, name: 'Gorilloz', image: skinItemImages.gorilloz, background: skinItemBackgrounds.epico, rarity: skinItemRarities.epico, class: 'Priestess' },
  ];

  const comicItems = Array(15).fill().map((_, index) => ({
    id: index + 1,
    title: `Comic ${index + 1}`,
    cover: 'https://via.placeholder.com/150x200'
  }));


  const [currentIndex, setCurrentIndex] = useState(0);

  const [cachedImagePaths, setCachedImagePaths] = useState({});
  const [cachedVideoPaths, setCachedVideoPaths] = useState({});
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleInfoPress = (id) => {
    setSelectedItemId(id);
    setSwitchComponent('Info'); // Cambia lo stato per mostrare il componente User
  };

  const selectSkin = (id) => {
    setSelectedCharacterId(id);
  }

  const handleSelectPress = () => {
    setSwitchComponent('Select'); // Cambia lo stato per tornare al componente Home
  };

  // Initialize caches when component mounts

  // Modified render functions to use cached images
  const renderBackground = (item) => {
    if (item.rarity === skinItemRarities.mitico || item.rarity === skinItemRarities.divinità) {
      const videoSource = cachedVideoPaths[item.background] || item.background;
      return (
        <Video
          source={{ uri: videoSource }}
          style={styles.sfondiAnimati}
          resizeMode="cover"
          muted={true}
          repeat={true}
          controls={false}
          disableFocus
          onError={(error) => {
            console.error('Video playback error:', error);
            if (videoSource !== item.background) {
              setCachedVideoPaths(prev => ({
                ...prev,
                [item.background]: item.background
              }));
            }
          }}
        />
      );
    }
    return (
      <ImageBackground
        source={{ uri: (item.background) }}
        style={styles.sfondi}
      />
    );
  };



  const handleSwitchSkin = () => setActiveButton('skin');
  const handleSwitchComic = () => setActiveButton('comic');

  if (switchComponent === 'Info') {
    return <Info goBack={handleSelectPress} itemId={selectedItemId} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />;
  }


  return (
    <ImageBackground
      source={require('../assets/images/sfondo skin fermo 1.png')}
      style={styles.page1}
      resizeMode="cover"
    >
      <Animated.View style={[styles.page2, { opacity }]}>
        <Image
          source={require('../assets/images/sfondo skin fermo 2.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </Animated.View>
      <View style={styles.mainContainer}>
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity style={styles.topButton} activeOpacity={1} onPress={handleSwitchSkin}>
            <Text style={styles.topButtonText}>Skin</Text>
            {activeButton === 'skin' && (
              <View style={styles.backgroundImage} />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.topButton} activeOpacity={1} onPress={handleSwitchComic}>
            <Text style={styles.topButtonText}>Comic</Text>
            {activeButton === 'comic' && (
              <View style={styles.backgroundImage2} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.imageButtonContainer} pointerEvents="none">
          <Image
            source={
              activeButton === 'skin'
                ? require('../assets/images/separé schermata skin Schlein.png')
                : require('../assets/images/separé schermata skin Meloni.png')
            }
            style={styles.topImage}
          />

          <TouchableOpacity style={styles.sortButton} activeOpacity={1}>
            <Image
              source={require('../assets/images/rettangolo longilineo.png')}
              style={styles.buttonImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.separator} pointerEvents="none">
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {activeButton === 'skin' && (
            <View style={styles.skinContent}>
              {Array(7).fill().map((_, rowIndex) => (
                <View key={rowIndex} style={styles.skinRow}>
                  {skinItems.slice(rowIndex * 3, (rowIndex + 1) * 3).map((item) => (
                    <View key={item.id} style={styles.skinWrapper}>
                      {renderBackground(item)}
                      <TouchableOpacity style={styles.selection}
                        activeOpacity={1}
                        onPress={() =>
                          setVisibleOptionsId((prevId) => (prevId === item.id ? null : item.id))
                        }></TouchableOpacity>
                      <Text style={styles.nome}>{item.name}</Text>
                      <Image source={{ uri: item.image }} style={styles.skinImage} />
                      <Text style={styles.classe}>{item.class}</Text>
                      <Image source={{ uri: item.rarity }} style={styles.rarity} />
                      {visibleOptionsId === item.id && (
                        <>
                          <View style={styles.aura}></View>
                          <View style={styles.optionsContainer}>
                            <TouchableOpacity style={styles.optionButton} onPress={() => selectSkin(item.id)}>
                              <Text style={styles.optionText}>Select</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionButton} onPress={() => handleInfoPress(item.id)}>
                              <Text style={styles.optionText}>Info</Text>
                            </TouchableOpacity>
                          </View>
                        </>

                      )}
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {activeButton === 'comic' && (
            <View style={styles.comicContent}>
              {comicItems.map((item) => (
                <View key={item.id} style={styles.comicItem}>
                  <Image source={{ uri: item.cover }} style={styles.comicCover} />
                  <Text style={styles.comicTitle}>{item.title}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
      <HUD setIsPlaying={setIsPlaying} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    height: height,
  },
  separator: {
    width: width,
    height: '25%',
  },
  imageButtonContainer: {
    position: 'absolute',
    zIndex: 51,
    width: '100%',
    height: '100%', // Modifica l'altezza per schermi medi
    alignItems: 'center',
  },
  sortButton: {
    width: 160,
    left: '10%',
    height: '45%',
  },
  aura: {
    zIndex: -1,
    top: '5%',
    left: '18%',
    width: '90%', // Adatta la larghezza per schermi piccoli
    height: '139%',
    resizeMode: 'contain',
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Colore giallino opaco
    borderColor: 'rgba(255, 255, 255, 0.3)', // Colore nero opaco per il bordo
    borderWidth: 2, // Spessore del bordo
    borderRadius: 2, // Angoli arrotondati (opzionale)
  },
  optionsContainer: {
    left: '19%',
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: 'orange', // Colore di sfondo del pulsante
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: 'white',
    borderWidth: 2,
  },
  optionText: {
    fontSize: 10,
    color: 'white', // Colore del testo
    fontFamily: 'LuckiestGuy-8jyD',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    textAlign: 'center',
  },
  mainContainer: {
    top: 50,
    height: height,
    zIndex: 50,
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
  testo: {
    color: 'white',
    fontSize: 30,
  },
  dinamismo: {
    position: 'absolute',
    backgroundColor: 'black',
    zIndex: 10,
    width: 50,
    height: 50,
    left: 200,
    top: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 200, // Aggiungi uno spazio di fondo per evitare che l'ultimo contenuto sia nascosto
  },
  page: {
    width: width,
    height: height,
  },
  page1: {
    width: width,
    height: height,
  },
  page2: {
    position: 'absolute',
    width: width,
    height: height,
  },
  bottomImage: {
    width: '100%',
    height: 90, // Riduci l'altezza per schermi più piccoli
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
    width: '30%', // Modifica la larghezza su schermi piccoli
    aspectRatio: 1,
    marginBottom: 50,
    alignItems: 'center',
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

  topButtonsContainer: {
    top: '8%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    zIndex: 52,
    position: 'absolute',
  },
  topButton: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topButtonText: {
    top: -5,
    color: '#FFF',
    fontSize: 26,
    fontFamily: 'LuckiestGuy-8jyD',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    padding: 4,
  },
  balaustra: {
    position: 'absolute',
    resizeMode: 'contain',
    width: width,
    height: '100%',
  },
  backgroundImage: {
    width: getSize(0, 0, 152),
    height: getSize(0, 0, 170),
    position: 'absolute',
    resizeMode: 'contain',
    zIndex: -1,
  },
  backgroundImage2: {
    position: 'absolute',
    resizeMode: 'contain',
    zIndex: -1,
    width: getSize(0, 0, 152),
    height: getSize(0, 0, 170),
  },
  skinContent: {
    marginTop: 50,
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comicContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  comicItem: {
    width: '45%', // Adatta la larghezza per schermi piccoli
    marginBottom: 20,
    alignItems: 'center',
  },
  comicCover: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 10,
  },
  comicTitle: {
    marginTop: 5,
    fontSize: 22, // Riduci la dimensione del font per schermi piccoli
    fontFamily: 'LuckiestGuy-8jyD',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    color: '#fff',
    textAlign: 'center',
  },
  skinRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 90,
  },
  skinWrapper: {
    right: '3%',
    width: '30%', // Adatta la larghezza per schermi piccoli
    aspectRatio: 1,
  },
  rarity: {
    width: '122%', // Adatta la larghezza per schermi piccoli
    height: '139%',
    resizeMode: 'contain',
    position: 'absolute',
  },
  selection: {
    zIndex: 5,
    left: '16%',
    width: '95%', // Adatta la larghezza per schermi piccoli
    height: '139%',
    resizeMode: 'contain',
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  sfondi: {
    position: 'absolute',
    top: '5%',
    left: '20%',
    width: '90%',
    height: '110%',
  },
  sfondiAnimati: {
    position: 'absolute',
    top: '15%',
    left: '20%',
    width: '80%',
    height: '110%',
  },
  nome: {
    top: getSize(0, 0, 0),
    left: getSize(0, 0, '20%'),
    color: '#fff',
    fontSize: getSize(0, 0, 14), // Riduci la dimensione del font per schermi piccoli
    zIndex: 1,
    fontFamily: 'LuckiestGuy-8jyD',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  skinImage: {
    width: '119%',
    height: '119%',
    resizeMode: 'contain',
    bottom: 10,
  },
  classe: {
    position: 'absolute',
    top: '120%',
    left: '20%',
    fontSize: 11,
    fontFamily: 'LuckiestGuy-8jyD',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    color: '#fff',
    zIndex: 1,
  },
});
export default Skin;