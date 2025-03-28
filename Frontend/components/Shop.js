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
import Video from 'react-native-video';
import HUD from './HUD';
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
// Centralizziamo il caricamento delle immagini
const images = {
  backgroundVideo: require('../assets/videos/sfondo_shop.mp4'),
  barraBluina: require('../assets/images/barra_bluina.png'),
  chronometer: require('../assets/images/chronometertimercounterfreepng.webp'),
  barraMagentine: require('../assets/images/barra_magentine.png'),
  buttonImage: require('../assets/images/tasto_arancione_semi_ellittico.png'), // Sostituire con il percorso corretto
};

// Array di immagini degli shop items
const shopItems = [
  { image: require('../assets/images/icona_soldi_1.png'), price: '0,10 $', discount: '' },
  { image: require('../assets/images/icona_soldi_2.png'), price: '0,30 $', discount: '10%' },
  { image: require('../assets/images/icona_soldi_3.png'), price: '0,50 $', discount: '10%' },
  { image: require('../assets/images/icona_soldi_sgravior_4.png'), price: '1,00 $', discount: '10%' },
  { image: require('../assets/images/icona_soldi_sgravior_5.png'), price: '2,50 $', discount: '10%' },
  { image: require('../assets/images/icona_soldi_sgravior_6.png'), price: '5,00 $', discount: '10%' },
];

// Immagini remote (esempio con placeholder)
const remoteImages = [
  'https://via.placeholder.com/100',
  'https://via.placeholder.com/100',
  'https://via.placeholder.com/100',
];

const Shop = ({ setIsPlaying }) => {
  return (
    <View style={styles.page}>
      <View style={styles.mainContainer}>
        {/* Video di sfondo */}
        <Video
          source={(() => {
            if (!images.backgroundVideo) console.log('Shop - backgroundVideo source is null');
            return images.backgroundVideo;
          })()}
          style={styles.backgroundVideo}
          resizeMode="cover"
          repeat
          muted
          playInBackground
        />

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Shop Items */}
          <View style={styles.rectangle}>
            <View style={styles.imageContainer}>
              {shopItems.map((item, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image 
                    source={(() => {
                      if (!item.image) console.log(`Shop - shopItem image source is null (index: ${index})`);
                      return item.image;
                    })()} 
                    style={styles.shopImage} 
                  />
                  {item.discount && <Text style={styles.topRightText}>{item.discount}</Text>}
  
                  <TouchableOpacity style={styles.shopButton} activeOpacity={1}>
                    <Image 
                      source={(() => {
                        if (!images.buttonImage) console.log('Shop - buttonImage source is null');
                        return images.buttonImage;
                      })()} 
                      style={styles.shopButtonImage} 
                    />
                    <Text style={styles.shopButtonText}>{item.price}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
  
          {/* Limited Offer 1 */}
          <View style={styles.LimitedOffer}>
            <Image 
              source={(() => {
                if (!images.barraBluina) console.log('Shop - barraBluina source is null');
                return images.barraBluina;
              })()} 
              style={styles.newImage} 
            />
            <Text style={styles.rotatedText}>La tua scritta</Text>
            <Image 
              source={(() => {
                if (!images.chronometer) console.log('Shop - chronometer source is null');
                return images.chronometer;
              })()} 
              style={styles.Timer} 
            />
          </View>
  
          {/* Limited Offer 2 */}
          <View style={styles.LimitedOffer}>
            <Image 
              source={(() => {
                if (!images.barraMagentine) console.log('Shop - barraMagentine source is null');
                return images.barraMagentine;
              })()} 
              style={styles.newImage} 
            />
            <Text style={styles.rotatedText}>Testo Rotato</Text>
            <View style={styles.threeImagesContainer}>
              {remoteImages.map((imgUrl, idx) => (
                <Image 
                  key={idx} 
                  source={(() => {
                    if (!imgUrl) console.log(`Shop - remoteImage source is null (index: ${idx})`);
                    return imgUrl;
                  })()} 
                  style={styles.smallImage} 
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
      <HUD setIsPlaying={setIsPlaying} />
    </View>
  );
};

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
    bottom: 10,
    height: '60%',
    width: '60%',
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
