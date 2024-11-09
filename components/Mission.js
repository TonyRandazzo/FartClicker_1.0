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


const ProgressBar = ({ progress, total }) => {
    const percentage = (progress / total) * 100;
  
    return (
      <View style={styles.progressContainer}>
        <View style={[styles.progress, { width: `${percentage}%` }]} />
        <Text style={styles.progressText}>{`${progress}/${total}`}</Text>
      </View>
    );
  };
  
  const Mission = () => {
    const [activeButton, setActiveButton] = useState('missions');
  
    const imageBehindSwitchAchievement = 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/MissionIcons%2Fskin%20targa%20missioni.png?alt=media&token=140de971-bc35-4dde-a2f9-e21b927f7f77';
    const imageBehindSwitchmission = 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/MissionIcons%2Fskin%20targa%20missioni.png?alt=media&token=140de971-bc35-4dde-a2f9-e21b927f7f77';
  
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
  
    return (
      <ImageBackground
        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fsfondo%20shop.png?alt=media&token=384318d8-0527-411d-a67c-0344b23fdedf' }}
        style={styles.page1}
        resizeMode="cover"
      >
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity style={styles.topButton} activeOpacity={1} onPress={handleSwitchMissions}>
            <Text style={styles.topButtonText}>Mission</Text>
            {activeButton === 'missions' && (
              <Image source={{ uri: imageBehindSwitchmission }} style={styles.backgroundImageMission} />
            )}
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.topButton} activeOpacity={1} onPress={handleSwitchAchievements}>
            <Text style={styles.topButtonText}>Achievement</Text>
            {activeButton === 'achievements' && (
              <Image source={{ uri: imageBehindSwitchAchievement }} style={styles.backgroundImageAchievement} />
            )}
          </TouchableOpacity>
        </View>
  
        <View style={styles.imageButtonContainer}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/MissionIcons%2Fsepar%C3%A9%20schermata%20missioni.png?alt=media&token=b40d4936-da6c-4863-97b8-6247e33f3969' }}
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
      </ImageBackground>
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
        width: width,
        height: '175@s',
        alignItems: 'center',
      },
      topImage: {
          resizeMode: 'contain',
        width: width,
        height: '300@s',
        bottom: '61.5@s',
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
      bottom: '-2@s',
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
      bottom: '-3@s',
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
  export default Mission;
