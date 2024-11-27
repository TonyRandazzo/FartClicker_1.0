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


class ImageCache {
  static cacheDir = `${RNFS.CachesDirectoryPath}/imageCache`;
  static cachedImages = new Map();

  static async initialize() {
    try {
      // Create cache directory if it doesn't exist
      const exists = await RNFS.exists(this.cacheDir);
      if (!exists) {
        await RNFS.mkdir(this.cacheDir);
      }

      // Load existing cached files
      const files = await RNFS.readDir(this.cacheDir);
      files.forEach(file => {
        const uri = file.name.replace(/_/g, '/').replace('.img', '');
        this.cachedImages.set(uri, file.path);
      });
    } catch (error) {
      console.error('Failed to initialize image cache:', error);
    }
  }

  static async getCachedImagePath(uri) {
    if (!uri) return null;
    
    if (this.cachedImages.has(uri)) {
      console.log(`Image found in cache: ${uri}`);
      return `file://${this.cachedImages.get(uri)}`;
    }
  
    try {
      const filename = uri.replace(/\//g, '_').replace(/[^a-zA-Z0-9_]/g, '') + '.img';
      const filePath = `${this.cacheDir}/${filename}`;
  
      console.log(`Downloading image from: ${uri}`);
      await RNFS.downloadFile({
        fromUrl: uri,
        toFile: filePath,
        background: true,
        discretionary: true,
      }).promise;
  
      this.cachedImages.set(uri, filePath);
      console.log(`Image cached successfully: ${uri}`);
      return `file://${filePath}`;
    } catch (error) {
      console.error(`Failed to cache image: ${uri}`, error);
      return uri;
    }
  }

  static async clearCache() {
    try {
      await RNFS.unlink(this.cacheDir);
      await RNFS.mkdir(this.cacheDir);
      this.cachedImages.clear();
    } catch (error) {
      console.error('Failed to clear image cache:', error);
    }
  }
}

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

const Skin = () => {
  const [activeButton, setActiveButton] = useState('skin');
  const skinItemImages = {
    marvick: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20marvik.png?alt=media&token=92ff07c9-ae89-49a0-a698-aa3677443a90',
    maestroSasuke: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20sasuke.png?alt=media&token=fae519f9-ba44-46cf-b9ef-680629843f11',
    bob: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20bob.png?alt=media&token=4a52b112-1e10-4e39-83b5-1c92f479ff2c',
    cyclop: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20cyclop.png?alt=media&token=94e26047-aca9-47bb-907d-e92f1d2ac3e2',
    babyAlien: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzobusto%20alien.png?alt=media&token=121dcfc6-3d7e-410a-8097-42c10af79784',
    george: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20george.png?alt=media&token=10b6c8f3-39a9-4a99-99de-a88f42572375',
    yokozuna: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20yokkozuna.png?alt=media&token=248beef7-ea0e-4b6a-a883-9afed5dcc449',
    dracula: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2FMezzob%20Draccula.png?alt=media&token=29392aff-cd3c-4ede-a5a0-87baaea85540',
    robert: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20robert.png?alt=media&token=68cfc266-3d67-4d0c-a57f-0c769a129d73',
    xao: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20xao.png?alt=media&token=3b85a8a1-2202-4b1a-b4b3-fa903ae568b9',
    fartMan: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20fartman.png?alt=media&token=961c0f05-55c6-4e11-97a9-99deaa230539',
    alien: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Falien%20adulto%20mezzob.png?alt=media&token=2fbc4279-ebc6-4ef0-b87f-3fb3475e66ed',
    mrFarte: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20Mr.%20Fart%C3%A9.png?alt=media&token=2f1f1eb0-52d9-4ba2-8dbb-daa1ebf483e3',
    fangpi: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20fangpi%C3%AC.png?alt=media&token=a0d97103-7d72-4648-8729-3b71449ec82c',
    amaterasuTsukuyomi: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20tuskuamateras.png?alt=media&token=e3be9494-04c8-4cad-ab23-ccbf7e835246',
    stinkyBlob: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20melma%20puzzonsa.png?alt=media&token=2add89e2-6c4f-4d5a-84d0-4cae2ca524e7',
    bear: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzobusto%20bear.png?alt=media&token=1bcfc630-9007-4fb8-81b9-446c292f3168',
    soprano: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20soprano.png?alt=media&token=949f658a-2034-436e-b15e-e6baa473790a',
    mrTakeshi: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20mr.%20takeshi.png?alt=media&token=b4ee41e6-1a61-4cfc-9528-d51b331088b7',
    stein: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20stein.png?alt=media&token=9f5854a3-7b60-4ca4-9ba8-b8cfcc8456e2',
    gorilloz: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20gorilloz.png?alt=media&token=5d113d1f-7988-495f-8499-14f1251b76ef'
  };
  const skinItemRarities = {
    comune: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice%20intera%20comune.png?alt=media&token=1c18b981-7086-4063-8d23-845760bac25f',
    non_comune: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice%20intera%20non%20comune.png?alt=media&token=bfd04c06-98fd-4b57-b186-67309816d94f',
    raro: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice_intera_raro-transformed.png?alt=media&token=b544f1db-1305-4d89-8bcc-2e132e5ec20f',
    epico: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice%20intera%20epico.png?alt=media&token=a34a1c61-855d-454f-9652-112d11596d45',
    leggendario: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice%20intera%20leggendaria.png?alt=media&token=03b064a1-b1a6-42ed-92ab-8e8423069644',
    mitico: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice%20intera%20mitico.png?alt=media&token=f1b3f8b0-236f-4735-8676-0068340e65f0',
    divinità: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice%20intera%20divinit%C3%A0.png?alt=media&token=8ef1d64f-dfeb-44f4-81c8-cd6dfb98e8f7',
  }
  const skinItemBackgrounds = {
    comune: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20blu%20con%20sfumatura%20biancastra%20della%20schermata%20home.png?alt=media&token=b83d60da-2118-4eed-b3ec-e2dce661aed4',
    raro: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20raro.png?alt=media&token=51b32ffd-043a-4bcb-b38f-0ce28d2b1615',
    non_comune: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20non%20comune.png?alt=media&token=9de28b8a-4d76-4d7e-8d63-b796756e73cf',
    epico: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20epico.png?alt=media&token=3fb40852-9040-4352-93f8-d0841723978c',
    leggendario: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20leggendaria.png?alt=media&token=0fd106da-5e3f-41ec-b148-194922a843a5',
    mitico: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fmitico.mp4?alt=media&token=eee7b7f6-d3d9-4eff-acf3-87a33abeee09',
    divinità: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fdivinita.mp4?alt=media&token=aa041503-69aa-4ee7-9de5-135b005ff792',
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
  const images = [
    'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20schermata%20personaggio%201.png?alt=media&token=666a1520-3005-493c-9de6-ba1b93297cc5',
    'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20schermata%20personaggio%202.png?alt=media&token=c009f439-b44e-4781-9c1c-1b1b7ecc0cbe',
    'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20schermata%20personaggio%203.png?alt=media&token=a9e7fe0b-af4b-4241-a779-88dcf801fb71',
    'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20schermata%20personaggio%204.png?alt=media&token=6b01c40b-538d-4422-b62d-b065f3e4c170',
    'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20schermata%20personaggio%205.png?alt=media&token=efb61365-c3b8-4cd5-8e29-fa7869ca6433',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const [cachedImagePaths, setCachedImagePaths] = useState({});
  const [cachedVideoPaths, setCachedVideoPaths] = useState({});

  // Initialize caches when component mounts
  useEffect(() => {
    const initializeCaches = async () => {
      await Promise.all([
        ImageCache.initialize(),
        VideoCache.initialize()
      ]);

      // Pre-cache all images
      const imagePaths = {};
      const cacheImage = async (uri) => {
        const cachedPath = await ImageCache.getCachedImagePath(uri);
        if (cachedPath) {
          imagePaths[uri] = cachedPath;
        }
      };

      // Cache all image assets
      const imagesToCache = [
        ...Object.values(skinItemImages),
        ...Object.values(skinItemRarities),
        ...Object.values(skinItemBackgrounds).filter(uri => !uri.endsWith('.mp4')),
        ...images,
        imageBehindSwitchSkin,
        imageBehindSwitchComic
      ];

      await Promise.all(imagesToCache.map(cacheImage));
      setCachedImagePaths(imagePaths);

      // Pre-cache videos (existing code)
      const videoPaths = {};
      for (const key in skinItemBackgrounds) {
        const background = skinItemBackgrounds[key];
        if (background.endsWith('.mp4')) {
          const cachedPath = await VideoCache.getCachedVideoPath(background);
          videoPaths[background] = cachedPath;
        }
      }
      setCachedVideoPaths(videoPaths);
    };

    initializeCaches();

    return () => {
      // Optionally clear caches on unmount
      // ImageCache.clearCache();
      // VideoCache.clearCache();
    };
  }, []);

  // Helper function to get cached image path
  const getCachedImage = (uri) => {
    return cachedImagePaths[uri] || uri;
  };

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
        source={{ uri: getCachedImage(item.background) }}
        style={styles.sfondi}
      />
    );
  };


  const changeBackground = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const imageBehindSwitchSkin = 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fskin%20targa.png?alt=media&token=a248bd60-061d-4695-a2f8-bdebf47b9a7d';
  const imageBehindSwitchComic = 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fskin%20targa.png?alt=media&token=a248bd60-061d-4695-a2f8-bdebf47b9a7d';

  const handleSwitchSkin = () => setActiveButton('skin');
  const handleSwitchComic = () => setActiveButton('comic');



  return (
    <ImageBackground
      source={{ uri: getCachedImage(images[currentIndex]) }}
      style={styles.page1}
      resizeMode="cover"
    >
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
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity title="Cambia Immagine" onPress={changeBackground} style={styles.dinamismo}>
          <Text style={styles.testo}>{currentIndex + 1}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButton} activeOpacity={1} onPress={handleSwitchSkin}>
          <Text style={styles.topButtonText}>Skin</Text>
          {activeButton === 'skin' && (
            <Image source={{ uri: getCachedImage(imageBehindSwitchSkin)}} style={styles.backgroundImage} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.topButton} activeOpacity={1} onPress={handleSwitchComic}>
          <Text style={styles.topButtonText}>Comic</Text>
          {activeButton === 'comic' && (
            <Image source={{ uri: getCachedImage(imageBehindSwitchComic) }} style={styles.backgroundImage2} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.imageButtonContainer}>
        <Image
          source={{ uri: getCachedImage('https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Skin%20Icons%2Fsepar%C3%A9%20schermata%20skin.png?alt=media&token=35253d9d-7e56-4a86-802f-6a36a06d1085') }}
          style={styles.topImage}
        />
        <TouchableOpacity style={styles.sortButton} activeOpacity={1}>
          <Image
            source={{ uri: getCachedImage('https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Frettangolo%20longilineo.png?alt=media&token=cbb49ff8-bc7b-4e3a-9003-b8b5c29e1147') }}
            style={styles.buttonImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
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
                    <Text style={styles.nome}>{item.name}</Text>
                    <Image source={{ uri: item.image }} style={styles.skinImage} />
                    <Text style={styles.classe}>{item.class}</Text>
                    <Image source={{ uri: item.rarity }} style={styles.rarity} />
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
  imageButtonContainer: {
    position: 'relative',
    width: '100%',
    height: 200, // Modifica l'altezza per schermi medi
    alignItems: 'center',
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    zIndex: 2,
    position: 'absolute',
    top: 20,
  },
  topButton: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topButtonText: {
    top: 0,
    color: '#FFF',
    fontSize: 25,
    fontFamily: 'LuckiestGuy-8jyD',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    padding: 4,
  },
  backgroundImage: {
    bottom: getSize(0, 0, -60),
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
    bottom: getSize(0, 0, -60),
    width: getSize(0, 0, 152),
    height: getSize(0, 0, 170),
  },
  skinContent: {
    marginTop: 20,
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
    marginBottom: 50,
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