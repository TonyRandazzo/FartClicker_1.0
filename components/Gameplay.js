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
import HUD from './HUD'
const { width, height } = Dimensions.get('window');

function Gameplay() {
  const [progress, setProgress] = useState(0);

  return (
    <View style={styles.container}>
      <HUD/>
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      {/* Center Images Container */}
      <View style={styles.imagesContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FMarvick.png?alt=media&token=d5346127-30e1-4fc6-9ac4-e092f4d86175' }}
            style={styles.player}
                      accessible={true}
          accessibilityLabel="Sbarra di combattimento"
          />
        </View>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FMarvick.png?alt=media&token=d5346127-30e1-4fc6-9ac4-e092f4d86175' }}
            style={styles.enemy}
                      accessible={true}
          accessibilityLabel="Sbarra di combattimento"
          />
        </View>
      </View>

      {/* Bottom Buttons Container */}
      <View style={styles.bottomContainer}>
        <ImageBackground
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fsbarra%20combattimento.png?alt=media&token=944f67c2-5a0a-4974-8e2c-c8bb52c95ac2' }}
          style={styles.bottomBackground}
          accessible={true}
          accessibilityLabel="Sbarra di combattimento"
        >
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Button 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Button 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Button 3</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: 'orange',
  },
  progressContainer: {
    paddingHorizontal: '20@s',
    paddingTop: '90@vs',
  },
  progressBackground: {
    height: '10@vs',
    backgroundColor: '#E0E0E0',
    borderRadius: '5@s',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: '5@s',
  },
  imagesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: '20@s',
  },
  imageWrapper: {
    width: '150@s',
    height: '150@s',
  },
  player: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  enemy: {
    transform: [{ scaleX: -1 }],    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  bottomContainer: {
    height: '200@vs',
    width: '100%',
  },
  bottomBackground: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20@s',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: '10@vs',
    paddingHorizontal: '20@s',
    borderRadius: '8@s',
  },
  buttonText: {
    fontSize: '16@s',
    color: '#000',
    fontWeight: 'bold',
  },
});

export default Gameplay;