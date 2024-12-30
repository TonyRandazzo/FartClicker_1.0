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

const Info = ({ goBack, itemId }) => {
    const skinItemImages = {
        marvick: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20marvik.png?alt=media&token=92ff07c9-ae89-49a0-a698-aa3677443a90',
        maestroSasuke: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20sasuke.png?alt=media&token=fae519f9-ba44-46cf-b9ef-680629843f11',
        bob: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20bob.png?alt=media&token=4a52b112-1e10-4e39-83b5-1c92f479ff2c',
        cyclop: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20cyclop.png?alt=media&token=94e26047-aca9-47bb-907d-e92f1d2ac3e2',
        babyAlien: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzobusto%20alien.png?alt=media&token=121dcfc6-3d7e-410a-8097-42c10af79784',
        george: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20george.png?alt=media&token=10b6c8f3-39a9-4a99-99de-a88f42572375',
        yokozuna: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20yokkozuna.png?alt=media&token=248beef7-ea0e-4b6a-a883-9afed5dcc449',
        dracula: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2FMezzob%20Draccula.png?alt=media&token=29392aff-cd3c-4ede-a5a0-87baaea85540',
        robert: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20robert.png?alt=media&token=68cfc266-3d67-4d0c-a57f-0c769a129d73',
        xao: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20xao.png?alt=media&token=3b85a8a1-2202-4b1a-b4b3-fa903ae568b9',
        fartMan: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20fartman.png?alt=media&token=961c0f05-55c6-4e11-97a9-99deaa230539',
        alien: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Falien%20adulto%20mezzob.png?alt=media&token=2fbc4279-ebc6-4ef0-b87f-3fb3475e66ed',
        mrFarte: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20Mr.%20Fart%C3%A9.png?alt=media&token=2f1f1eb0-52d9-4ba2-8dbb-daa1ebf483e3',
        fangpi: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20fangpi%C3%AC.png?alt=media&token=a0d97103-7d72-4648-8729-3b71449ec82c',
        amaterasuTsukuyomi: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20tuskuamateras.png?alt=media&token=e3be9494-04c8-4cad-ab23-ccbf7e835246',
        stinkyBlob: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20melma%20puzzonsa.png?alt=media&token=2add89e2-6c4f-4d5a-84d0-4cae2ca524e7',
        bear: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzobusto%20bear.png?alt=media&token=1bcfc630-9007-4fb8-81b9-446c292f3168',
        soprano: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20soprano.png?alt=media&token=949f658a-2034-436e-b15e-e6baa473790a',
        mrTakeshi: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20mr.%20takeshi.png?alt=media&token=b4ee41e6-1a61-4cfc-9528-d51b331088b7',
        stein: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20stein.png?alt=media&token=9f5854a3-7b60-4ca4-9ba8-b8cfcc8456e2',
        gorilloz: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20gorilloz.png?alt=media&token=5d113d1f-7988-495f-8499-14f1251b76ef'
      };
    const itemsData = {
        1: {
            name: 'Marvick',
            rarity: 'Common',
            class: 'Homo Fartens',
            description: 'Marvick è un normale cittadino del mondo che come tutti emette delle flatulenze che non mimetizza affatto. Al contrario, le annuncia con orgoglio.',
            specialName: 'MegaFart',
            type: 'Burst',
            speed: 'Medium',
            effect: 'All’attivazione le scoregge fanno 110% del danno. Per 4 secondi appaiono le banane che se consumate provocano scoregge che fanno 250% del danno.',
            skin: skinItemImages.marvick
        },
        2: {
            name: 'Zorg',
            rarity: 'Rare',
            class: 'Alien Fartens',
            description: 'Un alieno bizzarro con un gas tossico che tiene lontani gli invasori terrestri.',
            specialName: 'Toxic Cloud',
            type: 'Continuous',
            speed: 'Fast',
            effect: 'Produce un gas tossico che infligge danni costanti ai nemici vicini per 5 secondi.',
            skin: skinItemImages.maestroSasuke
        },
        3: {
            name: 'Bubblo',
            rarity: 'Epic',
            class: 'Bubble Fartens',
            description: 'Un essere magico che crea bolle di gas che esplodono al minimo tocco.',
            specialName: 'Bubble Bomb',
            type: 'Area',
            speed: 'Slow',
            effect: 'Le bolle esplodono causando danno ad area e stordendo i nemici per 3 secondi.',
            skin: skinItemImages.bob
        },
        4: {
            name: 'Whispy',
            rarity: 'Common',
            class: 'Windy Fartens',
            description: 'Un esperto nell’arte del vento, capace di usare le sue flatulenze come raffiche offensive.',
            specialName: 'Wind Blast',
            type: 'Directional',
            speed: 'Fast',
            effect: 'Una raffica di vento che spinge i nemici indietro infliggendo danni.',
            skin: skinItemImages.cyclop
        },
        5: {
            name: 'Stinkster',
            rarity: 'Legendary',
            class: 'Foul Fartens',
            description: 'Il re del fetore, temuto da tutti per il suo odore insostenibile.',
            specialName: 'Stench Wave',
            type: 'Burst',
            speed: 'Slow',
            effect: 'Un’ondata di fetore che causa danni enormi e debilita i nemici.',
            skin: skinItemImages.babyAlien
        },
        6: {
            name: 'Gustav',
            rarity: 'Common',
            class: 'Whirlwind Fartens',
            description: 'Con ogni suo movimento crea vortici di aria nauseante.',
            specialName: 'Cyclone Spin',
            type: 'Area',
            speed: 'Medium',
            effect: 'Crea un ciclone che intrappola e danneggia i nemici vicini.',
            skin: skinItemImages.george
        },
        7: {
            name: 'Puff',
            rarity: 'Rare',
            class: 'Cloud Fartens',
            description: 'Un essere leggero come una nuvola, ma dal gas devastante.',
            specialName: 'Gas Cloud',
            type: 'Continuous',
            speed: 'Slow',
            effect: 'Genera una nube tossica che avvelena i nemici.',
            skin: skinItemImages.yokozuna
        },
        8: {
            name: 'Blaster',
            rarity: 'Epic',
            class: 'Explosive Fartens',
            description: 'Specialista in esplosioni rapide e distruttive.',
            specialName: 'Gas Explosion',
            type: 'Burst',
            speed: 'Fast',
            effect: 'Causa un’esplosione che infligge danni critici a un gruppo di nemici.',
            skin: skinItemImages.dracula
        },
        9: {
            name: 'Silentus',
            rarity: 'Legendary',
            class: 'Stealth Fartens',
            description: 'Un ninja silenzioso, il cui gas agisce di sorpresa.',
            specialName: 'Silent Strike',
            type: 'Stealth',
            speed: 'Fast',
            effect: 'Un attacco silenzioso che infligge danni critici senza avvisare i nemici.',
            skin: skinItemImages.robert

        },
        10: {
            name: 'Skid',
            rarity: 'Common',
            class: 'Sliding Fartens',
            description: 'Un maestro dello scivolamento, che usa il gas per guadagnare velocità.',
            specialName: 'Slide Attack',
            type: 'Directional',
            speed: 'Fast',
            effect: 'Scivola attraverso i nemici infliggendo danni lungo il percorso.',
            skin: skinItemImages.xao

        },
        11: {
            name: 'Flamer',
            rarity: 'Rare',
            class: 'Fire Fartens',
            description: 'Con il suo gas infuocato, non lascia niente al suo passaggio.',
            specialName: 'Flame Burst',
            type: 'Area',
            speed: 'Medium',
            effect: 'Una fiammata che incendia il terreno, causando danni continui.',
            skin: skinItemImages.fartMan

        },
        12: {
            name: 'Frosty',
            rarity: 'Epic',
            class: 'Ice Fartens',
            description: 'Un maestro del gelo che congela i nemici con il suo gas ghiacciato.',
            specialName: 'Frost Breath',
            type: 'Continuous',
            speed: 'Slow',
            effect: 'Congela i nemici, rallentandoli e infliggendo danni.',
            skin: skinItemImages.alien

        },
        13: {
            name: 'Thunder',
            rarity: 'Legendary',
            class: 'Storm Fartens',
            description: 'Portatore di tempeste, con un gas che emette scariche elettriche.',
            specialName: 'Thunder Clap',
            type: 'Burst',
            speed: 'Medium',
            effect: 'Un’esplosione elettrica che paralizza i nemici e infligge danni.',
            skin: skinItemImages.mrFarte

        },
        14: {
            name: 'Shadow',
            rarity: 'Rare',
            class: 'Dark Fartens',
            description: 'Un essere misterioso che attacca dall’ombra.',
            specialName: 'Dark Wave',
            type: 'Stealth',
            speed: 'Fast',
            effect: 'Un’onda oscura che infligge danni critici ai nemici più vicini.',
            skin: skinItemImages.fangpi

        },
        15: {
            name: 'Spark',
            rarity: 'Epic',
            class: 'Electric Fartens',
            description: 'Un esperto di scariche elettriche che usa il gas per amplificarle.',
            specialName: 'Spark Storm',
            type: 'Area',
            speed: 'Fast',
            effect: 'Una tempesta elettrica che colpisce tutti i nemici nell’area.',
            skin: skinItemImages.amaterasuTsukuyomi

        },
        16: {
            name: 'Tornado',
            rarity: 'Legendary',
            class: 'Cyclone Fartens',
            description: 'Maestro delle tempeste, il cui gas crea tornado devastanti.',
            specialName: 'Tornado Blast',
            type: 'Directional',
            speed: 'Slow',
            effect: 'Un tornado che spazza via i nemici e infligge danni enormi.',
            skin: skinItemImages.stinkyBlob

        },
        17: {
            name: 'Blaze',
            rarity: 'Common',
            class: 'Inferno Fartens',
            description: 'Un appassionato del fuoco che incenerisce tutto sul suo cammino.',
            specialName: 'Blazing Trail',
            type: 'Burst',
            speed: 'Medium',
            effect: 'Un’esplosione di fuoco che infligge danni ad area.',
            skin: skinItemImages.bear

        },
        18: {
            name: 'Chilly',
            rarity: 'Rare',
            class: 'Frozen Fartens',
            description: 'Un essere gelido che usa il suo gas per bloccare i nemici.',
            specialName: 'Ice Wall',
            type: 'Area',
            speed: 'Slow',
            effect: 'Crea un muro di ghiaccio che rallenta e danneggia i nemici.',
            skin: skinItemImages.soprano
        },
        19: {
            name: 'Sonic',
            rarity: 'Epic',
            class: 'Speed Fartens',
            description: 'Un velocista che usa il suo gas per superare ogni limite.',
            specialName: 'Sonic Boom',
            type: 'Directional',
            speed: 'Very Fast',
            effect: 'Un’onda sonora che infligge danni e disorienta i nemici.',
            skin: skinItemImages.mrTakeshi
        },
        20: {
            name: 'Crusher',
            rarity: 'Legendary',
            class: 'Heavy Fartens',
            description: 'Un colosso dal gas così potente da schiacciare i nemici.',
            specialName: 'Gasquake',
            type: 'Area',
            speed: 'Slow',
            effect: 'Crea un terremoto di gas che infligge danni devastanti a tutti i nemici.',
            skin: skinItemImages.stein

        },
        21: {
            name: 'FartZilla',
            rarity: 'Legendary',
            class: 'Heavy Fartens',
            description: 'Godzilla è impazzito. Ha mangiato troppo e causerà danni che faranno sffrire tutto il mondo',
            specialName: 'Porcdio',
            type: 'Area',
            speed: 'Slow',
            effect: 'Crea un pattaccone di merda dio can',
            skin: skinItemImages.gorilloz
        },
    };
    const item = itemsData[itemId];

    if (!item) {
      return null; // O un messaggio di errore
    }
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
                    source={{ uri: item.skin }}
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
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.rarity}>Rarity: {item.rarity}</Text>
                <Text style={styles.class}>Class: {item.class}</Text>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionTitle}> Description</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            </View>
            <View style={styles.leftText}>
                <Text style={styles.specialName}> {item.specialName}</Text>
                <Text style={styles.type}> {item.type}</Text>
                <Text style={styles.speed}> {item.speed}</Text>
                <Text style={styles.effect}> {item.effect}</Text>
            </View>
        </ImageBackground>
    )
}

export default Info
const styles = StyleSheet.create({
    rightText: {
        position: 'absolute',
        top: '20%',
        right: '1%',
    },
    name: {
        alignSelf: 'center',
        justifySelf: 'center',
        color: '#fff',
        marginRight: '15%',
        fontSize: 20,
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
        fontSize: 14,
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
        fontSize: 14,
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
        fontSize: 20,
        fontFamily: 'LuckiestGuy-8jyD',
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
    },
    descriptionContainer: {
        position: 'absolute',
        top: '100%',
        right: '5%',
        width: '110%',
        height: '100%',
    },
    description: {
        textAlign: 'justify',
        color: '#fff',
        fontSize: 12,
        fontFamily: 'LuckiestGuy-8jyD',
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
    },
    characterImage: {
        position: 'absolute',
        zIndex: 1,
        width: 220, // Puoi regolare dinamicamente se necessario
        height: 220,
    },
    ombra: {
        position: 'relative', // Sovrappone l'immagine sotto
        width: 470,
        height: 470,
    },

    imageContainer: {
        top: '5%',
        width: '50%',
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
        position: 'absolute',
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