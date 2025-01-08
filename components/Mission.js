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
import RNFS from 'react-native-fs';
import HUD from './HUD'

const { width, height } = Dimensions.get('window');
// Calcola la diagonale dello schermo (in pollici)
const diagonal = Math.sqrt(width ** 2 + height ** 2) / (width / height);

// Definisci i range per piccoli, medi e grandi schermi
const isSmallScreen = diagonal >= 5 && diagonal <= 7;
const isMediumScreen = diagonal > 7 && diagonal <= 8.5;
const isLargeScreen = diagonal > 8.5;

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

const ProgressBar = ({ progress, total }) => {
  const percentage = (progress / total) * 100;

  return (
    <View style={styles.progressContainer}>
      <View style={[styles.progress, { width: `${percentage}%` }]} />
      <Text style={styles.progressText}>{`${progress}/${total}`}</Text>
    </View>
  );
};

const Mission = ({ isPlaying, setIsPlaying }) => {
    const [cachedImagePaths, setCachedImagePaths] = useState({});

  const [activeButton, setActiveButton] = useState('missions');
  const images = [
    'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/MissionIcons%2Fnuova%20schermata%20mission.png?alt=media&token=484d1a77-5d98-42ec-b053-2b680f013852',
    'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Separ%C3%A8%2Fsepar%C3%A9%20schermata%20missioni%20Schlein.png?alt=media&token=a77600ef-295e-408f-afa7-e765edd1afe7',
    'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Separ%C3%A8%2Fsepar%C3%A9%20schermata%20missioni%20Meloni.png?alt=media&token=286b1d32-110a-46a1-97be-b2a2d3b1f733',
  ];


  const handleSwitchMissions = () => setActiveButton('missions');
  const handleSwitchAchievements = () => setActiveButton('achievements');

  const missionItems = [
    { id: 1, name: 'Mission 1', description: 'Completa 5 livelli', progress: 20, total: 50, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Mission 2', description: 'Raccogli 10 oggetti', progress: 10, total: 50, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Mission 3', description: 'Vinci 3 battaglie', progress: 35, total: 50, image: 'https://via.placeholder.com/150' },
  ];

  const achievementItems = [
    {
      id: 1,
      title: 'Beginner Collector (Level 1)',
      description: 'Collect 10 rare items to level up.',
      cover: 'https://via.placeholder.com/300x150', // URL immagine dell'achievement
      progress: 20,
      total: 50,
    },
    {
      id: 2,
      title: 'Master Explorer (Level 3)',
      description: 'Explore 5 new worlds to level up.',
      cover: 'https://via.placeholder.com/300x150',
      progress: 30,
      total: 100,
    },
    {
      id: 3,
      title: 'Skilled Warrior (Level 2)',
      description: 'Defeat 100 enemies to level up.',
      cover: 'https://via.placeholder.com/300x150',
      progress: 75,
      total: 150,
    },
    // Aggiungi altri achievement secondo necessità
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
        ...Object.values(missionItems),
        ...Object.values(achievementItems),
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
      source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/MissionIcons%2Fnuova%20schermata%20mission.png?alt=media&token=484d1a77-5d98-42ec-b053-2b680f013852' }}
      style={styles.page1}
      resizeMode="cover"
    >
      <View style={styles.mainContainer}>
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity style={styles.topButton} activeOpacity={1} onPress={handleSwitchMissions}>
            <Text style={styles.topButtonText}>Mission</Text>
            {activeButton === 'missions' && (
              <View style={styles.backgroundImageMission} />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.topButton} activeOpacity={1} onPress={handleSwitchAchievements}>
            <Text style={styles.topButtonText}>Achievement</Text>
            {activeButton === 'achievements' && (
              <View style={styles.backgroundImageMission} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.imageButtonContainer}>
          <Image
            source={{
              uri: activeButton === 'missions'
                ? 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Separ%C3%A8%2Fsepar%C3%A9%20schermata%20missioni%20Schlein.png?alt=media&token=a77600ef-295e-408f-afa7-e765edd1afe7'
                : 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Separ%C3%A8%2Fsepar%C3%A9%20schermata%20missioni%20Meloni.png?alt=media&token=286b1d32-110a-46a1-97be-b2a2d3b1f733'
            }}
            style={styles.topImage}
          />

        </View>

        <View style={styles.missionContent}>
          {activeButton === 'missions' && (
            <View style={styles.missionContainer}>
              {missionItems.map((item) => (
                <View key={item.id} style={styles.missionWrapper}>
                  <ImageBackground source={{ uri: item.image }} style={styles.missionBackground}>
                    <View style={styles.textContainer}>
                      <Text style={styles.missionName}>{item.name}</Text>
                      <Text style={styles.missionDescription}>{item.description}</Text>
                      <Text style={styles.missionDetails}>Dettagli</Text>
                    </View>
                    <ProgressBar progress={item.progress} total={item.total} />
                  </ImageBackground>
                </View>
              ))}
            </View>
          )}

          {activeButton === 'achievements' && (
            <ScrollView contentContainerStyle={styles.achievementScrollContainer} showsVerticalScrollIndicator={false}>
              {achievementItems.map((item) => (
                <View key={item.id} style={styles.achievementWrapper}>
                  <ImageBackground source={{ uri: item.cover }} style={styles.achievementBackground}>
                    <View style={styles.achievementTextContainer}>
                      <Text style={styles.achievementName}>{item.title}</Text>
                      <Text style={styles.achievementDescription}>{item.description}</Text>
                      <Text style={styles.achievementDetails}>More Info</Text>
                    </View>
                    <View style={styles.achievementProgressBarContainer}>
                      <View style={[styles.achievementProgressBar, { width: `${(item.progress / item.total) * 100}%` }]} />
                      <Text style={styles.achievementProgressText}>{`${item.progress}/${item.total}`}</Text>
                    </View>
                  </ImageBackground>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
      <HUD setIsPlaying={setIsPlaying} />

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    height: height,
    top: 30,
  },
  missionContent: {
    position: 'absolute',
    top: '30%',
    width: width,
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

  page: {
    width: width,
    height: height,
  },
  page1: {
    width: width,
    height: height,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 50, // Aggiungi uno spazio di fondo per evitare che l'ultimo contenuto sia nascosto
  },
  imageButtonContainer: {
    position: 'absolute',
    zIndex: 49,
    width: '100%',
    height: '100%', // Modifica l'altezza per schermi medi
    alignItems: 'center',
  },
  topButtonsContainer: {
    top: '8%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    left: '4%',
    zIndex: 50,
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
    top: 0,
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'LuckiestGuy-8jyD',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    padding: 4,
  },

  missionContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0,
  },
  missionWrapper: {
    marginBottom: 5,
  },
  missionBackground: {
    padding: 15,
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
  },

  missionName: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'LuckiestGuy-8jyD',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  missionDescription: {
    fontSize: 14,
    fontFamily: 'LuckiestGuy-8jyD',
  },
  missionDetails: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'LuckiestGuy-8jyD',
  },
  backgroundText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'LuckiestGuy-8jyD',
  },
  progressContainer: {
    height: 15,
    width: '100%',
    marginTop: 20,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#3b5998',
  },
  progressText: {
    fontFamily: 'LuckiestGuy-8jyD',
    position: 'absolute',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 12,
  },
  achievementContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  achievementItem: {
    width: '48%',
    margin: 10,
    alignItems: 'center',
  },
  achievementCover: {
    width: '100vh',
    height: '100vh',
  },
  achievementTitle: {
    marginTop: 5,
  },
  balaustra: {
    position: 'absolute',
    resizeMode: 'contain',
    width: width,
    height: '100%',
  },
  backgroundImageMission: {
    position: 'absolute',
    resizeMode: 'contain',
    zIndex: -1,
    width: 150,
    height: 60,
    backgroundColor: 'transparent',
  },

  achievementScrollContainer: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingBottom: 500,
  },
  achievementWrapper: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0', // Sfondo chiaro per i contenuti
  },
  achievementBackground: {
    width: '100%', // Riempie la larghezza del container
    height: 150, // Altezza rettangolare
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  achievementTextContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
    fontFamily: 'LuckiestGuy-8jyD',
  },
  achievementName: {
    fontSize: 21,
    fontFamily: 'LuckiestGuy-8jyD',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    color: '#fff',
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'LuckiestGuy-8jyD',
    color: '#444',
  },
  achievementDetails: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'LuckiestGuy-8jyD',
  },
  achievementProgressBarContainer: {
    height: 15,
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginTop: 5,
    position: 'relative',
    fontFamily: 'LuckiestGuy-8jyD',
  },
  achievementProgressBar: {
    height: '100%',
    backgroundColor: '#3b5998',
    borderRadius: 5,
  },
  achievementProgressText: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 13,
    fontFamily: 'LuckiestGuy-8jyD',
  },

});
export default Mission;
