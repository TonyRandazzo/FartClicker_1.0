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
import RNFS from 'react-native-fs';

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
        } catch {

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

const imageBehindSwitchUser = 'https://fartclicker.s3.eu-north-1.amazonaws.com/separ%C3%A9+schermata+missioni+Schlein.png';
const imageBehindSwitchrecord = 'https://fartclicker.s3.eu-north-1.amazonaws.com/separ%C3%A9+schermata+missioni+Meloni.png';



const User = ({ goBack, isPlaying, setIsPlaying }) => {
  const [activeButton, setActiveButton] = useState('records');

  const handleSwitchAccount = () => setActiveButton('Account');
  const handleSwitchrecords = () => setActiveButton('records');
    const [cachedImagePaths, setCachedImagePaths] = useState({});
    const images = [
'https://fartclicker.s3.eu-north-1.amazonaws.com/Home/sfondo+blu.png',
'https://fartclicker.s3.eu-north-1.amazonaws.com/tasto+arancione+semi+ellittico.png',
'https://fartclicker.s3.eu-north-1.amazonaws.com/piattaforma+skin+home.png',
'https://fartclicker.s3.eu-north-1.amazonaws.com/Characters/Fartman.png',  
];
        useEffect(() => {
            const initializeCaches = async () => {
                await Promise.all([
                    ImageCache.initialize(),
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
                    ...Object.values(itemsData),
                    ...images,
                ];
    
                await Promise.all(imagesToCache.map(cacheImage));
                setCachedImagePaths(imagePaths);
    
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
  return (
    <ImageBackground
      source={{ uri: getCachedImage('https://fartclicker.s3.eu-north-1.amazonaws.com/Home/sfondo+blu.png') }}
      style={styles.page1}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.topButtonsContainer}>

          <TouchableOpacity style={styles.topButton} activeOpacity={1} onPress={handleSwitchrecords}>
            <Text style={styles.topButtonText}>record</Text>
            {activeButton === 'records' && (
              <Image source={{ uri: imageBehindSwitchrecord }} style={styles.backgroundImagerecord} />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.topButton} activeOpacity={1} onPress={handleSwitchAccount}>
            <Text style={styles.topButtonText}>User</Text>
            {activeButton === 'Account' && (
              <Image source={{ uri: imageBehindSwitchUser }} style={styles.backgroundImageUser} />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
        activeOpacity={1}
          style={styles.backButton}
          onPress={goBack}
        >
          <Image
            source={{ uri: getCachedImage('https://fartclicker.s3.eu-north-1.amazonaws.com/tasto+arancione+semi+ellittico.png') }}
            style={styles.backButtonImage}
          />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        {activeButton === 'records' && (
          <View style={styles.content}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: getCachedImage('https://fartclicker.s3.eu-north-1.amazonaws.com/Characters/Fartman.png') }}
                style={styles.characterImage}
                resizeMode="contain"
              />
              <Image
                source={{ uri: getCachedImage('https://fartclicker.s3.eu-north-1.amazonaws.com/piattaforma+skin+home.png') }}
                style={styles.ombra}
                resizeMode="contain"
              />
            </View>

            <ScrollView
              style={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              {Array(15).fill(0).map((_, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.cardText}>Record {index + 1}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        {activeButton === 'Account' && (
          <View style={styles.container}>
            <View style={styles.Accountcreen}>
              <View style={styles.avatar}>
                <Image
                  source={{ uri: getCachedImage('https://fartclicker.s3.eu-north-1.amazonaws.com/Characters/Fartman.png') }}
                  style={styles.characterImage}
                  resizeMode="contain"
                />
                <Image
                  source={{ uri: getCachedImage('https://fartclicker.s3.eu-north-1.amazonaws.com/piattaforma+skin+home.png') }}
                  style={styles.ombra}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View style={styles.settings}>
              <TouchableOpacity activeOpacity={1} style={styles.settingsButton}>
                <Text style={styles.settingsText}> Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} style={styles.settingsButton}>
                <Text style={styles.settingsText}> Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} style={styles.settingsButton}>
                <Text style={styles.settingsText}> Settings</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <HUD setIsPlaying={setIsPlaying}  />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  settingsText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'LuckiestGuy-8jyD',
    textShadowColor: 'black',
    padding: 8,
  },
  settingsButton: {
    margin: 8,
    alignSelf: 'center',
    backgroundColor: 'orange',
    width: '90%',
    borderColor: 'gold',
    borderWidth: 5,
  },
  settings: {
    paddingTop: 7,
    borderRadius: 10,
    borderColor: 'orange',
    borderWidth: 5,
    backgroundColor: '#FF8C00',
    width: width,
    height: height,
  },
  Accountcreen: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '45%',
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    zIndex: 51,
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
  backgroundImageUser: {
    position: 'absolute',
    resizeMode: 'contain',
    zIndex: -1,
    width: getSize(0, 0, 152),
    height: getSize(0, 0, 170),
  },
  backgroundImagerecord: {
    position: 'absolute',
    resizeMode: 'contain',
    zIndex: -1,
    width: getSize(0, 0, 152),
    height: getSize(0, 0, 100),
  },
  page1: {
    width: width,
    height: height,
  },
  container: {
    top: 80,
    width: width,
    height: height,
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 100,
    left: 20,
    zIndex: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  characterImage: {
    position: 'absolute',
    zIndex: 1,
    width: 250, // Puoi regolare dinamicamente se necessario
    height: 250,
  },
  ombra: {
    position: 'relative', // Sovrappone l'immagine sotto
    width: 450,
    height: 450,
  },
  backButtonImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  backButtonText: {
    position: 'absolute',
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  avatar: {
    top: 20,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  imageContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },
  scrollContainer: {
    zIndex: 11,
    elevation: 11,
    flex: 1,
    padding: 10,
    top: '10%',
    height: '73%',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 20,
    right: 0,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
});

export default User;
