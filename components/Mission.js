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
        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20schermata%20missioni%202.png?alt=media&token=706f9ac9-3e8b-4cf8-b83b-124b62d2ae5c' }}
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
    imageButtonContainer: {
      position: 'relative',
      width: '100%', // Larghezza totale
      height: 200, // Imposta un'altezza desiderata per il contenitore
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
      fontFamily: 'Tricky Jimmy',
      textShadowColor: 'black',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 1,
      padding: 4,
    },
    mainContainer: {
      width: '100%',
      height: '80%',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
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
      fontFamily: 'Tricky Jimmy',
      textShadowColor: 'black',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    missionDescription: {
      fontSize: 14,
      fontFamily: 'Tricky Jimmy',
    },
    missionDetails: {
      fontSize: 12,
      color: '#888',
      fontFamily: 'Tricky Jimmy',
    },
    backgroundText: {
      color: '#fff',
      fontSize: 10,
      fontFamily: 'Tricky Jimmy',
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
      fontFamily: 'Tricky Jimmy',
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
    backgroundImageMission: {
      position: 'absolute',
      resizeMode: 'contain',
      zIndex: -1,
      width: 170,
      height: 170,
    },
    backgroundImageAchievement: {
      position: 'absolute',
      resizeMode: 'contain',
      zIndex: -1,
      width: 170,
      height: 170,
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
      fontFamily: 'Tricky Jimmy',
    },
    achievementName: {
      fontSize: 21,
      fontFamily: 'Tricky Jimmy',
      textShadowColor: 'black',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 1,
      color: '#fff',
    },
    achievementDescription: {
      fontSize: 14,
      fontFamily: 'Tricky Jimmy',
      color: '#444',
    },
    achievementDetails: {
      fontSize: 12,
      color: '#888',
      fontFamily: 'Tricky Jimmy',
    },
    achievementProgressBarContainer: {
      height: 15,
      width: '100%',
      backgroundColor: '#ddd',
      borderRadius: 5,
      marginTop: 5,
      position: 'relative',
      fontFamily: 'Tricky Jimmy',
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
      fontFamily: 'Tricky Jimmy',
    },

  });
  export default Mission;
