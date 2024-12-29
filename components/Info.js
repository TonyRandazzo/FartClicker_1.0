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
import Video from 'react-native-video';
import VideoCache from './VideoCache';
import RNFS from 'react-native-fs';
import HUD from './HUD'

const { width, height } = Dimensions.get('window');

const Info = ({ goBack }) => {
    return (
        <ImageBackground
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2FWhatsApp%20Image%202024-12-29%20at%2014.03.52.jpeg?alt=media&token=3f294538-72da-413a-a9f5-ed54f6c37c29' }}
            style={styles.page1}
            resizeMode="cover"
        >
            <HUD />
            <TouchableOpacity
                activeOpacity={1}
                style={styles.backButton}
                onPress={goBack}
            >
                <Image
                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Ftasto%20arancione%20semi%20ellittico.png?alt=media&token=f8d37105-4194-447e-8889-3513aedc6a1e' }}
                    style={styles.backButtonImage}
                />
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FMarvick.png?alt=media&token=d5346127-30e1-4fc6-9ac4-e092f4d86175' }}
                    style={styles.characterImage}
                    resizeMode="contain"
                />
                <Image
                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fpiattaforma%20skin%20home.png?alt=media&token=cab9591d-8762-4a8f-901b-3eed084b15d7' }}
                    style={styles.ombra}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.rightText}>
                <Text style={styles.name}> Marvick</Text>
                <Text style={styles.rarity}> Rarity: Common</Text>
                <Text style={styles.class}> Class: Homo Fartens</Text>
                <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}> Description</Text>
                <Text style={styles.description}>All’attivazione le scoregge fanno 110% del danno. Per 4 secondi appaiono le banane che se consumate provocano scoregge che fanno 250% del danno 
                </Text>
                </View>
            </View>
            <View style={styles.leftText}>
                <Text style={styles.specialName}> Marvick</Text>
                <Text style={styles.type}> Marvick</Text>
                <Text style={styles.speed}> Marvick</Text>
                <Text style={styles.effectTitle}> Marvick</Text>
                <Text style={styles.effect}> Marvick</Text>
            </View>
        </ImageBackground>
    )
}

export default Info
const styles = StyleSheet.create({
    rightText: {
        position: 'absolute',
        top: '20%',
        right: 0,
    },
    name: {
        alignSelf: 'center',
        justifySelf: 'center',
        color: '#fff',
        marginRight: '15%',
        fontSize: 22,
        padding: 15,
        fontFamily: 'LuckiestGuy-8jyD',
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
    },
    class: {
        alignSelf: 'center',
        justifySelf: 'center',
        color: '#fff',
        paddingRight: '5%',
        fontSize: 16,
        fontFamily: 'LuckiestGuy-8jyD',
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
    },
    rarity: {
        alignSelf: 'center',
        justifySelf: 'center',
        marginTop: '10%',
        paddingRight: '5%',
        color: '#fff',
        fontSize: 16,
        fontFamily: 'LuckiestGuy-8jyD',
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
    },
    descriptionTitle: {
        alignSelf: 'center',
        justifySelf: 'center',
        color: '#fff',
        marginTop: '10%',
        fontSize: 22,
        padding: 15,
        fontFamily: 'LuckiestGuy-8jyD',
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
    },
    descriptionContainer: {
        position: 'absolute',
        top: '80%',
        right: '5%',
        width: '110%',
        height: '100%',
    },
    description: {
        textAlign: 'justify',
        color: '#fff',
        fontSize: 14,
        fontFamily: 'LuckiestGuy-8jyD',
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1, 
    },
    characterImage: {
        position: 'absolute',
        zIndex: 1,
        width: 250, // Puoi regolare dinamicamente se necessario
        height: 250,
    },
    ombra: {
        position: 'relative', // Sovrappone l'immagine sotto
        width: 500,
        height: 450,
    },

    imageContainer: {
        top: '5%',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    page1: {
        width: width,
        height: height,
    },
    backButtonImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 5,
    },
    backButton: {
        position: 'absolute',
        top: 100,
        left: 20,
        zIndex: 50,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
}
)