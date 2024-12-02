import React, { useRef, useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  Text,
  ScrollView,
} from 'react-native';
import Video from 'react-native-video';
import VideoCache from './VideoCache';
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

const shopItemImages = [
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Shop%20Icons%2Ficona%20soldi%201.png?alt=media&token=1d60b34d-df85-4a42-88c5-a707df97f7a6',
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Shop%20Icons%2Ficona%20soldi%202.png?alt=media&token=c1e9e543-3811-4092-8ea4-564c4fd75a3b',
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Shop%20Icons%2Ficona%20soldi%203.png?alt=media&token=e00fca13-ceeb-43ef-981a-1c1d72c7afd5',
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Shop%20Icons%2Ficona%20soldi%20sgravior%204.png?alt=media&token=f2debd95-462d-4b34-bbd1-2dcb6fce0e2c',
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Shop%20Icons%2Ficona%20soldi%20sgravior%205.png?alt=media&token=3f25093d-d83d-440e-b188-049568a65c75',
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Shop%20Icons%2Ficona%20soldi%20sgravior%206.png?alt=media&token=34823b48-1f64-4976-82ad-f70d6815cb0d',
];

const buttonTexts = [
  '0,10 $',
  '0,30 $',
  '0,50 $',
  '1,00 $',
  '2,50 $',
  '5,00 $',
];

const topRightTexts = [
  '',
  '10%',
  '10%',
  '10%',
  '10%',
  '10%',
];

const buttonImage = 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2FButtonText_Small_Orange_Round.png?alt=media&token=072178ce-843d-4a0d-b8e8-63787564dab3';

const backgroundImageUrl = 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Shop%20Icons%2Fmoneta%20opaca%20sfondo%20shop.png?alt=media&token=3b835818-3b18-4622-b2d2-afb840d695b9'

const Shop = () => {
  const [cachedVideoPath, setCachedVideoPath] = useState(
    'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo_shop.mp4?alt=media&token=5d6e101a-5250-4967-8a14-a79170d6b330'
  );

  useEffect(() => {
    const initializeVideoCache = async () => {
      await VideoCache.initialize();

      const videoUrl = 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo_shop.mp4?alt=media&token=5d6e101a-5250-4967-8a14-a79170d6b330';

      try {
        const cachedPath = await VideoCache.getCachedVideoPath(videoUrl);
        setCachedVideoPath(cachedPath);
      } catch (error) {
        console.error('Error caching video:', error);
      }
    };

    initializeVideoCache();
  }, []);

  const renderBackground = () => {
    return (
      <Video
        source={{ uri: cachedVideoPath }}
        style={styles.backgroundVideo}
        resizeMode="cover"
        repeat={true}
        controls={false}
        muted={true}
        playInBackground={true}
        onError={(error) => {
          console.error('Video playback error:', error);
          setCachedVideoPath('https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo_shop.mp4?alt=media&token=5d6e101a-5250-4967-8a14-a79170d6b330');
        }}
      />
    );
  };
  return (
    <View style={styles.page}>
      <View style={styles.mainContainer}>
      {renderBackground()}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}

      >
        <View style={styles.rectangle}>
          <View style={styles.imageContainer}>
            {shopItemImages.map((imageUrl, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={{ uri: imageUrl }} style={styles.shopImage} />

                {index > 0 && (
                  <Text style={styles.topRightText}>{topRightTexts[index]}</Text>
                )}

                <TouchableOpacity style={styles.shopButton} activeOpacity={1}>
                  <Image source={{ uri: buttonImage }} style={styles.shopButtonImage} />
                  <Text style={styles.shopButtonText}>{buttonTexts[index]}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.LimitedOffer}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fbarra%20bluina.png?alt=media&token=b92e883e-ec4f-4f3d-bbb1-b25d78f58aeb' }}
            style={styles.newImage}
          />
          <Text style={styles.rotatedText}>La tua scritta</Text>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Shop%20Icons%2Fchronometer-timer-counter-free-png.webp?alt=media&token=df07c4c0-eab9-4de9-85c9-487b65cac239' }}
            style={styles.Timer}
          />
        </View>

        <View style={styles.LimitedOffer}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fbarra%20magentine.png?alt=media&token=bd8eb3f4-31ea-4faf-adfa-a52dcbaafbbf' }}
            style={styles.newImage}
          />
          <Text style={styles.rotatedText}>Testo Rotato</Text>
          <View style={styles.threeImagesContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }}
              style={styles.smallImage}
            />
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }}
              style={styles.smallImage}
            />
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }}
              style={styles.smallImage}
            />
          </View>
        </View>
      </ScrollView>
      </View>
      <HUD />
    </View>
  );
}
const styles = StyleSheet.create({
  animatedBackgroundContainer: {
    position: 'absolute',
    width: width,
    height: height,
    flexDirection: 'row',
    flexWrap: 'wrap',
    zIndex: 0,
    right: 200, // Riduci la distanza per schermi più piccoli
    bottom: 500,
  },
  mainContainer: {
    height: height,
    top: 80,
  },
  topContainer: {
    position: 'absolute',
    width: width,
    height: 190,
    elevation: 1,
    top: 0,
    zIndex: 1,

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
  animatedBackgroundImage: {
    width: 700, // Immagine più piccola su schermi più piccoli
    height: 700,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
  shopImage: {
    width: '100%',
    height: '100%',
  },
  shopButton: {
    position: 'relative',
    bottom: 30,
    height: '80%',
    width: '70%',
  },
  shopButtonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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
  newImage: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  rotatedText: {
    fontSize: 40, // Font size più piccolo per schermi più piccoli
    color: 'white',
    transform: [{ rotate: '-3.3deg' }],
    marginVertical: 10,
    position: 'absolute',
    fontFamily: 'LuckiestGuy-8jyD',
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
    width: 50, // Modifica la dimensione della Timer per schermi più piccoli
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
    top: getSize(0, 0, '33%'),
    width: '100%',
    position: 'absolute',
    fontSize: 16, // Font size più piccolo per schermi più piccoli
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'LuckiestGuy-8jyD',
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
    fontFamily: 'LuckiestGuy-8jyD',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    textShadowColor: 'orange',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    padding: 5,
    borderRadius: 5,
  },
});
export default Shop;
