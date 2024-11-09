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
import User from './components/User';
import Mission from './components/Mission';
import Skin from './components/Skin';
import Shop from './components/Shop';
import Home from './components/Home';

const { width, height } = Dimensions.get('window');




const pages = [<Shop />, <Skin />, <Home />, <Mission />, <User />];

const imageUrls = [
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Navigation%20Bar%20Icons%2Ftoilettatura.png?alt=media&token=ba9f3b7e-01ef-4c35-9874-c5f2f1061ecd',
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Navigation%20Bar%20Icons%2Fpersonaggi%20icona%20men%C3%B9.png?alt=media&token=b45e969a-7a86-4b71-a0f4-399a001587f6',
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Navigation%20Bar%20Icons%2Fhome%20simbolo.png?alt=media&token=25ccbe53-120e-4ca1-be13-45f2deee520b',
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Navigation%20Bar%20Icons%2Frotolo%20missione.png?alt=media&token=1badebd8-2727-4840-a03f-2e7aa3c1105a',
  'https://via.placeholder.com/150/FFFFFF/000000?text=5',
];
const ItemComponent = React.memo(({ item }) => {
  return (
    <View style={styles.pageContainer}>
      {item}
    </View>
  );
});

const App = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(2);
  const [activeIndex, setActiveIndex] = useState(2);
  const scrollX = useRef(new Animated.Value(0)).current;

  const scaleValues = useRef(imageUrls.map(() => new Animated.Value(1))).current;
  const translateYValues = useRef(imageUrls.map(() => new Animated.Value(0))).current;

  const onViewRef = useRef(({ viewableItems, changed }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;

      setCurrentIndex(newIndex);
      setActiveIndex(newIndex);

      setTimeout(() => {
        console.log('--- Scroll Debug Info ---');
        console.log('Viewable Items:', viewableItems.map(item => ({ index: item.index, key: item.key })));
        console.log('Changed:', changed.map(item => ({ index: item.index, key: item.key, isViewable: item.isViewable })));
        console.log('New Index:', newIndex);
        console.log('Current Index:', newIndex);
        console.log('Active Index:', newIndex);
        console.log('------------------------');
      }, 0);

      animateIcons(newIndex);
    }
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const goToPage = (index) => {
    console.log('goToPage called with index:', index);
    flatListRef.current?.scrollToIndex({ index, animated: false });
    setCurrentIndex(index);
    setActiveIndex(index);
    animateIcons(index);
  };

  const animateIcons = (selectedIndex) => {
    const animations = imageUrls.map((_, index) => {
      const isSelected = index === selectedIndex;

      return Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleValues[index], {
            toValue: isSelected ? 1.6 : 1,  
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
        Animated.timing(scaleValues[index], {
          toValue: isSelected ? 1.3 : 1,  
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValues[index], {
          toValue: isSelected ? 1.6 : 1,  
          duration: 100,
          useNativeDriver: true,
        }),
      ]);
    });

    Animated.parallel(animations).start();
  };

  useEffect(() => {
    console.log('State Updated - Current Index:', currentIndex, 'Active Index:', activeIndex);
  }, [currentIndex, activeIndex]);

  const getInterpolatedScale = (index) => {
    return scrollX.interpolate({
      inputRange: [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
      ],
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });
  };

  const getInterpolatedTranslateY = (index) => {
    return scrollX.interpolate({
      inputRange: [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
      ],
      outputRange: [0, -20, 0],
      extrapolate: 'clamp',
    });
  };

  const getItemLayout = (data, index) => ({
    length: width,
    offset: width * index,
    index,
  });

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: 2, animated: false });
    }
  }, []);



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fbarra%20in%20alto%20schermata.png?alt=media&token=f05f1f2d-2286-41b3-9fa8-fe350d0dbe6e' }}
          style={styles.topImage}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.button} activeOpacity={1}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2FGreenButton.png?alt=media&token=859bade4-78bf-47ec-b3fd-88d486c37e97' }}
            style={styles.buttonImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <Animated.FlatList
        data={pages}
        renderItem={({ item, index }) => (
          <View style={styles.pageContainer}>
            {item}
          </View>
        )}
        horizontal
        pagingEnabled
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
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
      />
      <Image
        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fbarra%20in%20basso.png?alt=media&token=62e385a2-831b-4421-aa8a-cfa55d3c7392' }}
        style={styles.bottomImage}
        resizeMode="cover"
      />
      <View style={styles.indicatorContainer}>
        {imageUrls.map((url, index) => {
          const scale = scaleValues[index];
          const translateY = translateYValues[index];
          const buttonContainerStyle = [
            styles.buttonContainer,
            index === 4 && { borderRightWidth: 0 }, 
          ];
          return (
            <TouchableOpacity key={index} onPress={() => goToPage(index)} style={buttonContainerStyle} activeOpacity={1}>
              <Animated.View
                style={{
                  transform: [
                    { scale: scale },  
                    { translateY: translateY },  
                  ],
                }}
              >
                <Image
                  source={{ uri: url }}
                  style={styles.indicator}
                  resizeMode="contain"
                />
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

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

});

export default App;


