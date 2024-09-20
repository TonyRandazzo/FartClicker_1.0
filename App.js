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
  '', // Lascia vuoto per la prima immagine
  '10%', // Testo per la seconda immagine
  '10%', // Testo per la terza immagine
  '10%', // Testo per la quarta immagine
  '10%', // Testo per la quinta immagine
  '10%', // Testo per la sesta immagine
];

const buttonImage = 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2FButtonText_Small_Orange_Round.png?alt=media&token=072178ce-843d-4a0d-b8e8-63787564dab3';

const zigzagImage = 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Shop%20Icons%2Fmoneta%20opaca%20sfondo%20shop.png?alt=media&token=3b835818-3b18-4622-b2d2-afb840d695b9';

const Shop = () => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    const startAnimation = () => {
      animation.setValue(0);
      Animated.loop(
        Animated.timing(animation, {
          toValue: 1,
          duration: 30000, // 30 secondi
          useNativeDriver: true,
        })
      ).start();
    };
    startAnimation();
  }, [animation]);

  const animatedBackground = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -height], // Muove il background verso l'alto
  });

  return (<ImageBackground
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
      decelerationRate={0.5}
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
const Skin = () => {
  const [activeButton, setActiveButton] = useState('skin');

  const imageBehindSwitchSkin = 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fskin%20targa.png?alt=media&token=a248bd60-061d-4695-a2f8-bdebf47b9a7d';
  const imageBehindSwitchComic = 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fskin%20targa.png?alt=media&token=a248bd60-061d-4695-a2f8-bdebf47b9a7d';

  const handleSwitchSkin = () => setActiveButton('skin');
  const handleSwitchComic = () => setActiveButton('comic');

  const skinItems = Array(21).fill().map((_, index) => ({
    id: index + 1,
    name: `Skin ${index + 1}`,
    image: 'https://via.placeholder.com/100',
    background: 'https://via.placeholder.com/150x200'
  }));
  const comicItems = Array(15).fill().map((_, index) => ({
    id: index + 1,
    title: `Comic ${index + 1}`,
    cover: 'https://via.placeholder.com/150x200'
  }));

  return (
    <ImageBackground
      source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fsfondo%20shop.png?alt=media&token=384318d8-0527-411d-a67c-0344b23fdedf' }}
      style={styles.page1}
      resizeMode="cover"
    >
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity style={styles.topButton} activeOpacity={1} onPress={handleSwitchSkin}>
          <Text style={styles.topButtonText}>Skin</Text>
          {activeButton === 'skin' && (
            <Image source={{ uri: imageBehindSwitchSkin }} style={styles.backgroundImage} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.topButton} activeOpacity={1} onPress={handleSwitchComic}>
          <Text style={styles.topButtonText}>Comic</Text>
          {activeButton === 'comic' && (
            <Image source={{ uri: imageBehindSwitchComic }} style={styles.backgroundImage2} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.imageButtonContainer}>
        <Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Skin%20Icons%2Fsepar%C3%A9%20schermata%20skin.png?alt=media&token=35253d9d-7e56-4a86-802f-6a36a06d1085' }}
          style={styles.topImage}
        />
        <TouchableOpacity style={styles.sortButton} activeOpacity={1}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Frettangolo%20longilineo.png?alt=media&token=cbb49ff8-bc7b-4e3a-9003-b8b5c29e1147' }}
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
                    <ImageBackground source={{ uri: item.background }} style={styles.sfondi}>
                      <Text style={styles.nome}>{item.name}</Text>
                      <Image source={{ uri: item.image }} style={styles.skinImage} />
                      <Text style={styles.classe}>{`ID: ${item.id}`}</Text>
                    </ImageBackground>
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

const Home = () => {
  return (
    <ImageBackground
      source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fsfondo%20shop.png?alt=media&token=384318d8-0527-411d-a67c-0344b23fdedf' }}
      style={styles.page1}
      resizeMode="cover"
    >
      <View style={styles.mainContainer}> 
        <Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Ftitolo.png?alt=media&token=2b91b8c6-7da2-4d47-993e-bf3b08eb8fdf' }} 
          style={styles.titleImage} 
          resizeMode="contain"
        />

        <View style={styles.buttonsRowTop}> 
          <TouchableOpacity style={styles.rewardsButton} activeOpacity={1}>
            <Image
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Frewards%20icon.png?alt=media&token=c91aaa7c-2ad9-4461-9b6f-abbfe784aaf7' }}
              style={styles.buttonImageMenu}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.passiveButton} activeOpacity={1}>
            <Image
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fpassives%20icon.png?alt=media&token=cd878bca-2667-4165-a7e0-b1796948e073' }}
              style={styles.buttonImageMenu}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.newsButton} activeOpacity={1}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fnewspaper.png?alt=media&token=b12866ee-2794-4d62-9d4f-a59673182398' }}
            style={styles.buttonImageMenu}
          />
          <Text style={styles.buttonText}>News</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton} activeOpacity={1}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Ftasto%20arancione%20semi%20ellittico.png?alt=media&token=f8d37105-4194-447e-8889-3513aedc6a1e' }}
            style={styles.playButtonImage}
          />
          <Text style={styles.playButtonText} activeOpacity={1}>Play</Text>
        </TouchableOpacity>

        <View style={styles.buttonsRowBottom}>
          <TouchableOpacity style={styles.itemsButton}>
            <Image
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fitems%20icon%20V.2%202.png?alt=media&token=3e7ebce0-7fc1-45e6-ba3f-a89d0eb332f0' }}
              style={styles.buttonImageMenu}
            />
            <Text style={styles.buttonText}>Items</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapButton} activeOpacity={1}>
            <Image
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fmap%20icon.png?alt=media&token=99bc80b2-1369-4a8f-bfb0-53a3e56717a6' }}
              style={styles.buttonImageMenu}
            />
            <Text style={styles.buttonText}>Map</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.characterContainer}>
        <Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2FMarvick.png?alt=media&token=056bf8e4-af3f-4b8e-b3be-0a3eb73bf589' }} 
          style={styles.characterImage}
          resizeMode="contain"
        />
      </View>
    </ImageBackground>
  );
};
const Mission = () => {
  const [activeButton, setActiveButton] = useState('missions');

  const imageBehindSwitchMissions = 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fskin%20targa.png?alt=media&token=a248bd60-061d-4695-a2f8-bdebf47b9a7d';
  const imageBehindSwitchAchievements = 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fskin%20targa.png?alt=media&token=a248bd60-061d-4695-a2f8-bdebf47b9a7d';

  const handleSwitchMissions = () => setActiveButton('missions');
  const handleSwitchAchievements = () => setActiveButton('achievements');

  const missionItems = Array(21).fill().map((_, index) => ({
    id: index + 1,
    name: `Mission ${index + 1}`,
    image: 'https://via.placeholder.com/100',
    background: 'https://via.placeholder.com/150x200'
  }));
  const achievementItems = Array(15).fill().map((_, index) => ({
    id: index + 1,
    title: `Achievement ${index + 1}`,
    cover: 'https://via.placeholder.com/150x200'
  }));

  return (
    <ImageBackground
      source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fsfondo%20shop.png?alt=media&token=384318d8-0527-411d-a67c-0344b23fdedf' }}
      style={styles.missionPage}
      resizeMode="cover"
    >
      <View style={styles.missionTopButtonsContainer}>
        <TouchableOpacity style={styles.missionTopButton} activeOpacity={1} onPress={handleSwitchMissions}>
          <Text style={styles.missionTopButtonText}>Missions</Text>
          {activeButton === 'missions' && (
            <Image source={{ uri: imageBehindSwitchMissions }} style={styles.missionBackgroundImage} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.missionTopButton} activeOpacity={1} onPress={handleSwitchAchievements}>
          <Text style={styles.missionTopButtonText}>Achievements</Text>
          {activeButton === 'achievements' && (
            <Image source={{ uri: imageBehindSwitchAchievements }} style={styles.missionBackgroundImage2} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.missionImageButtonContainer}>
        <Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Skin%20Icons%2Fsepar%C3%A9%20schermata%20skin.png?alt=media&token=35253d9d-7e56-4a86-802f-6a36a06d1085' }}
          style={styles.missionTopImage}
        />
        <TouchableOpacity style={styles.missionSortButton} activeOpacity={1}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Frettangolo%20longilineo.png?alt=media&token=cbb49ff8-bc7b-4e3a-9003-b8b5c29e1147' }}
            style={styles.missionButtonImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.missionScrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {activeButton === 'missions' && (
          <View style={styles.missionContent}>
            {Array(7).fill().map((_, rowIndex) => (
              <View key={rowIndex} style={styles.missionRow}>
                {missionItems.slice(rowIndex * 3, (rowIndex + 1) * 3).map((item) => (
                  <View key={item.id} style={styles.missionWrapper}>
                    <ImageBackground source={{ uri: item.background }} style={styles.missionBackground}>
                      <Text style={styles.missionName}>{item.name}</Text>
                      <Image source={{ uri: item.image }} style={styles.missionImage} />
                      <Text style={styles.missionClass}>{`ID: ${item.id}`}</Text>
                    </ImageBackground>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {activeButton === 'achievements' && (
          <View style={styles.achievementContent}>
            {achievementItems.map((item) => (
              <View key={item.id} style={styles.achievementItem}>
                <Image source={{ uri: item.cover }} style={styles.achievementCover} />
                <Text style={styles.achievementTitle}>{item.title}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
};
const User = () => <View style={[styles.page, { backgroundColor: '#fff' }]} />;

const pages = [<Shop />, <Skin />, <Home />, <Mission />, <User />];

const imageUrls = [
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Navigation%20Bar%20Icons%2Ftoilettatura.png?alt=media&token=ba9f3b7e-01ef-4c35-9874-c5f2f1061ecd',
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Navigation%20Bar%20Icons%2Fpersonaggi%20icona%20men%C3%B9.png?alt=media&token=b45e969a-7a86-4b71-a0f4-399a001587f6',
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Navigation%20Bar%20Icons%2Fhome%20simbolo.png?alt=media&token=25ccbe53-120e-4ca1-be13-45f2deee520b',
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Navigation%20Bar%20Icons%2Frotolo%20missione.png?alt=media&token=1badebd8-2727-4840-a03f-2e7aa3c1105a',
  'https://via.placeholder.com/150/FFFFFF/000000?text=5',
];

const App = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const scaleValues = useRef(imageUrls.map(() => new Animated.Value(1))).current;
  const translateYValues = useRef(imageUrls.map(() => new Animated.Value(0))).current;

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setCurrentIndex(newIndex);
      animateIcons(newIndex);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const goToPage = (index) => {
    flatListRef.current.scrollToIndex({ index, animated: false });
    setActiveIndex(index);
    animateIcons(index);
  };

  const animateIcons = (selectedIndex) => {
    scaleValues.forEach((scale, index) => {
      if (index === selectedIndex) {
        Animated.parallel([
          Animated.spring(scaleValues[selectedIndex], {
            toValue: 1.5,
            friction: 3.5,
            useNativeDriver: true,
          }),
          Animated.spring(translateYValues[selectedIndex], {
            toValue: -20,
            friction: 3.5,
            useNativeDriver: true,
          }),
        ]).start(() => {
          Animated.spring(scaleValues[selectedIndex], {
            toValue: 1.5,
            friction: 3.5,
            tension: 300,
            useNativeDriver: true,
          }).start();
        });
      } else {
        Animated.parallel([
          Animated.spring(scaleValues[index], {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
          }),
          Animated.spring(translateYValues[index], {
            toValue: 0,
            friction: 5,
            useNativeDriver: true,
          }),
        ]).start();
      }
    });
  };

  const getItemLayout = (data, index) => ({
    length: width,
    offset: width * index,
    index,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fbarra%20in%20alto%20schermata.png?alt=media&token=f05f1f2d-2286-41b3-9fa8-fe350d0dbe6e' }} // Replace with your image URL
          style={styles.topImage}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.button} activeOpacity={1}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2FGreenButton.png?alt=media&token=859bade4-78bf-47ec-b3fd-88d486c37e97' }} // Replace with your button image URL
            style={styles.buttonImage}
            resizeMode="contain"
          />
        </TouchableOpacity >
      </View>
      <FlatList
        data={pages}
        renderItem={({ item }) => item}
        horizontal
        pagingEnabled
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        keyExtractor={(_, index) => index.toString()}
        getItemLayout={getItemLayout}
      />
      <Image
        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fbarra%20in%20basso.png?alt=media&token=62e385a2-831b-4421-aa8a-cfa55d3c7392' }} // Replace with your bottom image URL
        style={styles.bottomImage}
        resizeMode="cover"
      />
      <View style={styles.indicatorContainer}>
        {imageUrls.map((url, index) => {
          const scale = scaleValues[index];
          const translateY = translateYValues[index];

          return (
            <TouchableOpacity key={index} onPress={() => goToPage(index)} style={styles.buttonContainer} activeOpacity={1}>
              <Animated.View style={{ transform: [{ scale }, { translateY }] }}>
                <Image
                  source={{ uri: url }}
                  style={[styles.indicator]}
                  resizeMode="contain"
                />
              </Animated.View>
            </TouchableOpacity >
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    position: 'relative',
    width: '100%',
    height: 60, // Adjust height as needed
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
    width: 400,
    height: 350,
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
    height: '70%',
    aspectRatio: 0.8,
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
    width: 60,
    height: 60,
    marginHorizontal: 10,
  },
  buttonContainer: {
    paddingRight: 0,
    borderRightWidth: 4,
    borderRightColor: '#fff',
  },
  LimitedOffer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  newImage: {
    width: 350, // Imposta la larghezza desiderata
    height: 350, // Imposta l'altezza desiderata
    resizeMode: 'contain', // Mantieni il rapporto di aspetto
  },
  rotatedText: {
    fontSize: 30, // Imposta la dimensione del testo
    color: 'white',
    transform: [{ rotate: '-3.3deg' }], // Ruota il testo di 30 gradi
    marginVertical: 10, // Spazio verticale intorno al testo
    position: 'absolute',
  },
  LimitedOffer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', // Aggiungi questa proprietà per posizionare Timer in modo relativo
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
    paddingBottom: 1000, // Aggiungi uno spazio di fondo per evitare che l'ultimo contenuto sia nascosto
  },
  shopButtonText: {
    marginLeft: 15,
    marginTop: 25,
    position: 'absolute',
    fontSize: 11,
    color: '#fff',
    textAlign: 'center',
  },
  topRightText: {
    position: 'absolute',
    top: -15, // Puoi modificare questo valore in base a dove vuoi posizionare il testo
    right: -15, // Posiziona il testo in alto a destra
    color: '#fff', // Colore del testo
    fontSize: 18, // Dimensione del testo
    fontWeight: 'bold', // Stile grassetto
    textShadowColor: 'orange', // Colore dell'ombra (che simula il bordo)
    textShadowOffset: { width: 1, height: 1 }, // Offset dell'ombra
    textShadowRadius: 4,
    padding: 5, // Padding interno per il testo
    borderRadius: 5, // Bordo arrotondato per l'estetica
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 1000, // Aggiungi uno spazio di fondo per evitare che l'ultimo contenuto sia nascosto
  },
  zigzagImage: {
    position: 'absolute',
    width: width,  // Usa la larghezza dello schermo
    height: height,  // Usa l'altezza dello schermo
    resizeMode: 'cover',  // Assicura che l'immagine copra l'intera area
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
    top: 110,
    right: 45,
    width: '45%', // Larghezza del bottone
    height: '45%', // Altezza del bottone
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
    fontWeight: 'bold',
    padding: 4,
  },
  backgroundImage: {
    top: 10,
    position: 'absolute',
    resizeMode: 'contain',
    width: '120%',
    height: '100%',
    zIndex: -1,
    bottom: 11.5,
    transform: [{scale: 2.5}],
  },
  backgroundImage2: {
    top: 10,
    position: 'absolute',
    resizeMode: 'contain',
    width: '120%',
    height: '100%',
    zIndex: -1,
    bottom: 11.5,
    transform: [{scale: 1.8}],
  },
  skinContent: {
    marginTop: 20,
    width: '100%',
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
    aspectRatio: 3/4,
    borderRadius: 10,
  },
  comicTitle: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  skinContent: {
    paddingHorizontal: 10,
  },
  skinRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  skinWrapper: {
    width: '30%',
    aspectRatio: 1,
  },
  sfondi: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nome: {
    top: 5,
    left: -30,
    color: '#fff',
    fontSize: 12,
  },
  skinImage: {
    width: '80%',
    height: '60%',
    resizeMode: 'contain',
  },
  classe: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    fontSize: 11,
    color: '#fff',
  },
  page1: {
    width: width,
    height: height,
  },
  mainContainer: { 
    width: '100%',
    height: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  titleImage: {
    width: 350,
    height: 150,
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
    fontWeight: 'bold',
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
    top: '50%',
    left: '50%',
    transform: [{ translateX: -125 }, { translateY: -125 }],
  },
  characterImage: {
    width: 250,
    height: 250,
  },
  playButton: {
    top: 100,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 100,
  },
  playButtonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  playButtonText: {
    position: 'absolute',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
});

export default App;
