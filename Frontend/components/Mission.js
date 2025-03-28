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
import HUD from './HUD';
const { width, height } = Dimensions.get('window');

// Centralizzazione delle immagini
const images = {
  background: require('../assets/images/nuova_schermata_mission.png'),
  missionSeparator: require('../assets/images/separe_schermata_missioni_Schlein.png'),
  achievementSeparator: require('../assets/images/separe_schermata_missioni_Meloni.png'),
};

// Dati delle missioni
const missionItems = [
  { id: 1, name: 'Mission 1', description: 'Completa 5 livelli', progress: 20, total: 50, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Mission 2', description: 'Raccogli 10 oggetti', progress: 10, total: 50, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Mission 3', description: 'Vinci 3 battaglie', progress: 35, total: 50, image: 'https://via.placeholder.com/150' },
];

// Dati degli achievements
const achievementItems = [
  { id: 1, title: 'Beginner Collector (Level 1)', description: 'Collect 10 rare items.', cover: 'https://via.placeholder.com/300x150', progress: 20, total: 50 },
  { id: 2, title: 'Master Explorer (Level 3)', description: 'Explore 5 new worlds.', cover: 'https://via.placeholder.com/300x150', progress: 30, total: 100 },
  { id: 3, title: 'Skilled Warrior (Level 2)', description: 'Defeat 100 enemies.', cover: 'https://via.placeholder.com/300x150', progress: 75, total: 150 },
];

// Barra di progresso riutilizzabile
const ProgressBar = ({ progress, total }) => {
  const percentage = (progress / total) * 100;
  return (
    <View style={styles.progressContainer}>
      <View style={[styles.progress, { width: `${percentage}%` }]} />
      <Text style={styles.progressText}>{`${progress}/${total}`}</Text>
    </View>
  );
};

const Mission = ({ setIsPlaying }) => {
  const [activeTab, setActiveTab] = useState('missions');

  return (
    <ImageBackground 
      source={(() => {
        if (!images.background) console.log('Mission - background image source is null');
        return images.background;
      })()} 
      style={styles.page1} 
      resizeMode="cover"
    >
      <View style={styles.mainContainer}>
        {/* Pulsanti di navigazione */}
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity style={styles.topButton} onPress={() => setActiveTab('missions')}>
            <Text style={styles.topButtonText}>Mission</Text>
            {activeTab === 'missions' && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton} onPress={() => setActiveTab('achievements')}>
            <Text style={styles.topButtonText}>Achievement</Text>
            {activeTab === 'achievements' && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
        </View>
  
        {/* Immagine separatrice */}
        <Image 
          source={(() => {
            const img = activeTab === 'missions' ? images.missionSeparator : images.achievementSeparator;
            if (!img) console.log(`Mission - ${activeTab === 'missions' ? 'missionSeparator' : 'achievementSeparator'} image source is null`);
            return img;
          })()} 
          style={styles.topImage} 
        />
  
        <View style={styles.contentContainer}>
          {activeTab === 'missions' ? (
            <View style={styles.missionList}>
              {missionItems.map((item) => (
                <View key={item.id} style={styles.missionItem}>
                  <ImageBackground 
                    source={(() => {
                      if (!item.image) console.log(`Mission - missionItem image source is null (id: ${item.id})`);
                      return item.image;
                    })()} 
                    style={styles.missionImage}
                  >
                    <View style={styles.missionTextContainer}>
                      <Text style={styles.missionTitle}>{item.name}</Text>
                      <Text style={styles.missionDescription}>{item.description}</Text>
                    </View>
                    <ProgressBar progress={item.progress} total={item.total} />
                  </ImageBackground>
                </View>
              ))}
            </View>
          ) : (
            <ScrollView contentContainerStyle={styles.achievementList} showsVerticalScrollIndicator={false}>
              {achievementItems.map((item) => (
                <View key={item.id} style={styles.achievementItem}>
                  <ImageBackground 
                    source={(() => {
                      if (!item.cover) console.log(`Mission - achievementItem cover image source is null (id: ${item.id})`);
                      return item.cover;
                    })()} 
                    style={styles.achievementImage}
                  >
                    <View style={styles.achievementTextContainer}>
                      <Text style={styles.achievementTitle}>{item.title}</Text>
                      <Text style={styles.achievementDescription}>{item.description}</Text>
                    </View>
                    <ProgressBar progress={item.progress} total={item.total} />
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
    top: 50,
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
    top: -5,
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
