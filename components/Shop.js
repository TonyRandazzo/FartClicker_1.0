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
  
  const backgroundImageUrl = 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Shop%20Icons%2Fmoneta%20opaca%20sfondo%20shop.png?alt=media&token=3b835818-3b18-4622-b2d2-afb840d695b9'

  const Shop = () => {
    const [animation] = useState(new Animated.Value(0));

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
  
    useEffect(() => {
      // Start looping diagonal animation
      translateX.value = withRepeat(
        withTiming(width * 0.2, {
          duration: 30000, // Duration for diagonal movement
          easing: Easing.linear,
        }),
        -1, // -1 means infinite repetition
        true // Reverse direction after each iteration
      );
  
      translateY.value = withRepeat(
        withTiming(height * 0.2, {
          duration: 30000, // Duration for diagonal movement
          easing: Easing.linear,
        }),
        -1, // Infinite repetition
        true // Reverse direction after each iteration
      );
    }, [translateX, translateY]);
  
    // Apply animated style to the background image
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: translateX.value },
          { translateY: translateY.value },
        ],
      };
    });
  
    return (
    <ImageBackground
      source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fsfondo%20shop.png?alt=media&token=384318d8-0527-411d-a67c-0344b23fdedf' }}
      style={[styles.page, { justifyContent: 'center', alignItems: 'center' }]}
      resizeMode="cover"
    >
       <Animated.Image
        source={{ uri: backgroundImageUrl }}
        style={[styles.animatedBackground, animatedStyle]}
      />

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
    );
  }
  const styles = StyleSheet.create({
    animatedBackground: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      zIndex: 0, 
    },
    container: {
      flex: 1,
    },
    topContainer: {
      position: 'relative',
      width: '100%',
      height: 60,
    },
    topImage: {
      width: '100%',
      height: '100%', // Full height of the top container
    },
    button: {
      position: 'absolute',
      right: 16, // Adjust padding to position the button
      top: '50%', // Center vertically within the image
      transform: [{ translateY: -25 }], // Adjust to center based on button size
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonImage: {
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
    bottomImage: {
      width: '100%', // Full width of the screen
      height: 90, // Adjust height as needed
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
      width: 350, // Imposta la larghezza desiderata
      height: 350, // Imposta l'altezza desiderata
      resizeMode: 'contain', // Mantieni il rapporto di aspetto
    },
    rotatedText: {
      fontSize: 40, // Imposta la dimensione del testo
      color: 'white',
      transform: [{ rotate: '-3.3deg' }], // Ruota il testo di 30 gradi
      marginVertical: 10, // Spazio verticale intorno al testo
      position: 'absolute',
      fontFamily: 'Tricky Jimmy',
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
      width: 50, // Imposta la larghezza desiderata per l'altra immagine
      height: 50, // Imposta l'altezza desiderata per l'altra immagine
      position: 'absolute',
      left: 0, // Posiziona a sinistra
      bottom: 90, // Posiziona in basso
    },
    scrollContainer: {
      alignItems: 'center',
      paddingBottom: 500, // Aggiungi uno spazio di fondo per evitare che l'ultimo contenuto sia nascosto
    },
    shopButtonText: {
      top: '38%',
      width: '100%',
      position: 'absolute',
      fontSize: 18,
      color: '#fff',
      textAlign: 'center',
      fontFamily: 'Tricky Jimmy',
      textShadowColor: 'black',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1,
    },
    topRightText: {
      position: 'absolute',
      top: -15, // Puoi modificare questo valore in base a dove vuoi posizionare il testo
      right: -15, // Posiziona il testo in alto a destra
      color: '#fff', // Colore del testo
      fontSize: 18, // Dimensione del testo
      fontFamily: 'Tricky Jimmy',
      textShadowColor: 'black',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 1, // Stile grassetto
      textShadowColor: 'orange', // Colore dell'ombra (che simula il bordo)
      textShadowOffset: { width: 1, height: 1 }, // Offset dell'ombra
      textShadowRadius: 4,
      padding: 5, // Padding interno per il testo
      borderRadius: 5, // Bordo arrotondato per l'estetica
    },

    imageButtonContainer: {
      position: 'relative',
      width: '100%', // Larghezza totale
      height: 200, // Imposta un'altezza desiderata per il contenitore
      alignItems: 'center',
    },
    topImage: {
      width: '100%',
      height: '100%', // Immagine di sfondo a piena larghezza e altezza del contenitore
    },
    sortButton: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      right: 45,
      width: '45%', // Larghezza del bottone
      height: '150%', // Altezza del bottone
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
      color: '#FFF', // Colore del testo del bottone
      fontSize: 25,
      fontFamily: 'Tricky Jimmy',
      textShadowColor: 'black',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 1,
      padding: 4,
    },
    backgroundImage: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      resizeMode: 'contain',
      transform: [{ scale: 3.8 }],
      zIndex: -1,
    },
    backgroundImage2: {
      position: 'absolute',
      resizeMode: 'contain',
      zIndex: -1,
      width: '100%',
      height: '100%',
      transform: [{ scale: 2.9 }],
    },
 
  });
  export default Shop;
