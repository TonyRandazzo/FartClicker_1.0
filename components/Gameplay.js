import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import HUD from './HUD'
const { width, height } = Dimensions.get('window');

function Gameplay() {
  return (
    <View style={styles.container}>
    <HUD/>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progress} />
          <Image 
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Ftasto%20arancione%20tondo.png?alt=media&token=a5c750b9-54f0-46ac-8c84-b947c93c9ea8' }}
            style={styles.progressEndImage}
          />
        </View>
      </View>

      <View style={styles.imagesContainer}>
        <Image 
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FFartman.png?alt=media&token=0b63be39-b735-4a90-90f4-219e149767c0' }}
          style={styles.leftImage}
          resizeMode="contain"
        />
        
        <Image 
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FMarvick.png?alt=media&token=d5346127-30e1-4fc6-9ac4-e092f4d86175' }}
          style={styles.rightImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
  progressContainer: {
    width: width,
    height: 50,
    paddingHorizontal: 20,
    position: 'absolute',
    top: '20%', // Adjust based on your needs
  },
  progressBar: {
    width: '100%',
    height: 20,
    backgroundColor: '#E0E0E0', // Progress bar background color
    borderRadius: 10,
    overflow: 'hidden',
  },
  progress: {
    width: '60%', // Adjust this value to change progress
    height: '100%',
    backgroundColor: '#4CAF50', // Progress color
    borderRadius: 10,
  },
  progressEndImage: {
    position: 'absolute',
    right: -15, // Adjust based on image size
    top: -5, // Adjust based on image size
    width: 30,
    height: 30,
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    position: 'absolute',
    top: height * 0.4, // Position slightly below center
    width: width,
  },
  leftImage: {
    width: width * 0.35, // 45% of screen width
    height: height * 0.3, // 30% of screen height
    marginBottom: 40, // Push down slightly
  },
  rightImage: {
    width: width * 0.35, // 35% of screen width
    height: height * 0.25, // 25% of screen height
    marginTop: -20, // Pull up slightly
  },
});

export default Gameplay;