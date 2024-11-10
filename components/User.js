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

function User() {
  return (
    <View style={[styles.page, { backgroundColor: 'red' }]}>
      
    </View>
  )
}
const styles = StyleSheet.create({
  page: {
    width: width,
    height: height,
  },
  });
export default User
