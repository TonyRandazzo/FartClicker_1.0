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
const { width, height } = Dimensions.get('window');


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
  
  const zigzagImage = 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Shop%20Icons%2Fmoneta%20opaca%20sfondo%20shop.png?alt=media&token=3b835818-3b18-4622-b2d2-afb840d695b9';
  
  const DiagonalPacmanBackground = () => {
    const [animation] = useState(new Animated.Value(0));
  
    useEffect(() => {
      const startAnimation = () => {
        animation.setValue(0);
        Animated.loop(
          Animated.timing(animation, {
            toValue: 1,
            duration: 20000,
            useNativeDriver: true,
          })
        ).start();
      };
      startAnimation();
      return () => animation.stopAnimation();
    }, []);
  
    return (
      <View style={styles.backgroundContainer}>
        <Animated.View style={[
          styles.patternContainer,
          {
            transform: [{
              rotate: animation.interpolate({
                inputRange: [0, 1],
                outputRange: ['45deg', '405deg']
              })
            }, {
              translateX: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -60]
              })
            }, {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -60]
              })
            }]
          }
        ]}>
        </Animated.View>
      </View>
    );
  };

  const Shop = () => {
    const [animation] = useState(new Animated.Value(0));
  
    useEffect(() => {
      const startAnimation = () => {
        animation.setValue(0);
        Animated.loop(
          Animated.timing(animation, {
            toValue: 1,
            duration: 30000, 
            useNativeDriver: true,
          })
        ).start();
      };
      startAnimation();
    }, [animation]);
  
    const animatedBackground = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -height], 
    });
  
    return (
    <View>
    <DiagonalPacmanBackground />
    <ImageBackground
      source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fsfondo%20shop.png?alt=media&token=384318d8-0527-411d-a67c-0344b23fdedf' }}
      style={[styles.page, { justifyContent: 'center', alignItems: 'center' }]}
      resizeMode="cover"
    >
      <Animated.View style={[styles.animatedBackground, { transform: [{ translateY: animatedBackground }] }]}>
        <Image
          source={{ uri: zigzagImage }}
        />
      </Animated.View>
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
    </ImageBackground>

    </View>

    );
  }
  const styles = ScaledSheet.create({
    container: {
      flex: 1,
    },
    topContainer: {
      position: 'relative',
      width: '100%',
      height: 60,
    },
  
    button: {
      position: 'absolute',
      right: 16,
      top: '50%',
      transform: [{ translateY: -25 }],
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonImage: {
      width: '100%',
      height: '100%',
    },
    backgroundContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: '1px solid red'
    },
    patternContainer: {
      position: 'absolute',
      width: '200%',
      height: '200%',
      backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Shop%20Icons%2Fmoneta%20opaca%20sfondo%20shop.png?alt=media&token=3b835818-3b18-4622-b2d2-afb840d695b9")` 
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
      height: 90,
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
      width: '48@s',
      height: '50@s',
      marginHorizontal: '8@s',
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
    topImage: {
      width: '100%',
      height: '100%',
    },
    sortButton: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      right: 45,
      width: '45%',
      height: '150%',
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
      alignItems: 'center',
      justifyContent: 'center',
    },
    topButtonText: {
      top: 0,
      color: '#FFF',
      fontSize: 25,
      fontFamily: 'Chubby Cheeks',
      textShadowColor: 'black',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 1,
      padding: 7,
    },
    backgroundImage: {
      width: '40@s',
      height: '40@s',
      position: 'absolute',
      resizeMode: 'contain',
      zIndex: -1,
    },
    backgroundImage2: {
      position: 'absolute',
      resizeMode: 'contain',
      zIndex: -1,
      width: '52@s',
      height: '52@s',
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
      width: '45%',
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
      fontSize: 22,
      fontFamily: 'Chubby Cheeks',
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
      width: '30%',
      aspectRatio: 1,
    },
    rarity: {
      width: '122%',
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
    nome: {
      top: '5%',
      left: '20%',
      color: '#fff',
      fontSize: 16,
      zIndex: 1,
      fontFamily: 'Chubby Cheeks',
      textShadowColor: 'black',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 1,
      color: '#fff',
    },
    skinImage: {
      width: '119%',
      height: '119%',
      resizeMode: 'contain',
    },
    classe: {
      position: 'absolute',
      top: '120%',
      left: '20%',
      fontSize: 11,
      fontFamily: 'Chubby Cheeks',
      textShadowColor: 'black',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1,
      color: '#fff',
      zIndex: 1,
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
      fontFamily: 'Chubby Cheeks',
      textShadowColor: 'black',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 1,
    },
    buttonImageMenu: {
      width: 50,
      height: 50,
    },
    newsButton: {
      alignSelf: 'flex-start',
    },
    characterContainer: {
      position: 'absolute',
      top: '35%',
      left: '18%',
    },
    characterImage: {
      width: 250,
      height: 250,
    },
    playButton: {
      top: '13%',
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
      fontSize: 50,
      fontFamily: 'Chubby Cheeks',
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
      alignItems: 'flex-start',
    },
    mapButton: {
      alignItems: 'flex-end',
    },
    fixedMapButton: {
      position: 'absolute',
      top: '514@s', 
      right: '9@s',
      zIndex: 10, 
      width: '50@s', 
      height: '50@s',
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
  
    textContainer: {
      marginBottom: 10,
    },
    missionName: {
      fontSize: 18,
      color: '#fff',
      fontFamily: 'Chubby Cheeks',
      textShadowColor: 'black',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    missionDescription: {
      fontSize: 14,
      fontFamily: 'Chubby Cheeks',
    },
    missionDetails: {
      fontSize: 12,
      color: '#888',
      fontFamily: 'Chubby Cheeks',
    },
    backgroundText: {
      color: '#fff',
      fontSize: 10,
      fontFamily: 'Chubby Cheeks',
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
      fontFamily: 'Chubby Cheeks',
      position: 'absolute',
      alignSelf: 'center',
      color: '#fff',
      fontSize: 15,
    },
  
    backgroundImageMission: {
      position: 'absolute',
      resizeMode: 'contain',
      zIndex: -1,
      width: '150@s',
      height: '150@s',
    },
    backgroundImageAchievement: {
      position: 'absolute',
      resizeMode: 'contain',
      zIndex: -1,
      width: '150@s',
      height: '150@s',
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
      backgroundColor: '#f0f0f0',
    },
    achievementBackground: {
      width: '100%',
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
      borderRadius: 10,
      overflow: 'hidden',
    },
    achievementTextContainer: {
      marginBottom: 10,
      paddingHorizontal: 10,
      fontFamily: 'Chubby Cheeks',
    },
    achievementName: {
      fontSize: 21,
      fontFamily: 'Chubby Cheeks',
      textShadowColor: 'black',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 1,
      color: '#fff',
    },
    achievementDescription: {
      fontSize: 14,
      fontFamily: 'Chubby Cheeks',
      color: '#444',
    },
    achievementDetails: {
      fontSize: 12,
      color: '#888',
      fontFamily: 'Chubby Cheeks',
    },
    achievementProgressBarContainer: {
      height: 15,
      width: '100%',
      backgroundColor: '#ddd',
      borderRadius: 5,
      marginTop: 5,
      position: 'relative',
      fontFamily: 'Chubby Cheeks',
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
      fontSize: 18,
      fontFamily: 'Chubby Cheeks',
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
      resizeMode: 'contain',
      width: '90@s',
      height: '90@s',
    },
    itemText: {
      position: 'absolute',
      color: 'white',
      fontSize: 40,
      fontFamily: 'Chubby Cheeks',
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
  export default Shop;
