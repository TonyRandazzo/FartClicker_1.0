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
import RNFS from 'react-native-fs';

import HUD from './HUD'

const { width, height } = Dimensions.get('window');


class ImageCache {
    static cacheDir = `${RNFS.CachesDirectoryPath}/imageCache`;
    static cachedImages = new Map();
  
    static async initialize() {
      try {
        const exists = await RNFS.exists(this.cacheDir);
        if (!exists) {
          await RNFS.mkdir(this.cacheDir);
        }
  
        const files = await RNFS.readDir(this.cacheDir);
        files.forEach(file => {
          const uri = file.name.replace(/_/g, '/').replace('.img', '');
          this.cachedImages.set(uri, file.path);
        });
      } catch (error) {
        console.error('Failed to initialize image cache:', error);
      }
    }
  
    static async getCachedImagePath(uri) {
      if (!uri) return null;
  
      if (this.cachedImages.has(uri)) {
        console.log(`Image found in cache: ${uri}`);
        return `file://${this.cachedImages.get(uri)}`;
      }
  
      try {
        const filename = uri.replace(/\//g, '_').replace(/[^a-zA-Z0-9_]/g, '') + '.img';
        const filePath = `${this.cacheDir}/${filename}`;
  
        console.log(`Downloading image from server: ${uri}`);
        await RNFS.downloadFile({
          fromUrl: `http://10.0.2.2:3000/image/${encodeURIComponent(uri)}`,
          toFile: filePath,
          background: true,
          discretionary: true,
        }).promise;
  
        this.cachedImages.set(uri, filePath);
        console.log(`Image cached successfully: ${uri}`);
        return `file://${filePath}`;
      } catch (error) {
        console.error('Failed to download image:', error);
        return uri; // Fallback all'URL originale
      }
    }
  
    static async clearCache() {
      try {
        await RNFS.unlink(this.cacheDir);
        await RNFS.mkdir(this.cacheDir);
        this.cachedImages.clear();
      } catch (error) {
        console.error('Failed to clear image cache:', error);
      }
    }
  }
  

const Info = ({ goBack, itemId, isPlaying, setIsPlaying }) => {
    const [cachedImagePaths, setCachedImagePaths] = useState({});
    const images = [
        'https://fartclicker.s3.eu-north-1.amazonaws.com/Reference+schermata+da+rispettare+al+millimetro+di+x!.png',
        'https://fartclicker.s3.eu-north-1.amazonaws.com/tasto+arancione+semi+ellittico.png',
        'https://fartclicker.s3.eu-north-1.amazonaws.com/piattaforma+skin+home.png',
    ];
    const skinItemImages = {
        marvick: 'https://fartclicker.s3.eu-north-1.amazonaws.com/Characters/Marvick.png',
        maestroSasuke: 'https://fartclicker.s3.eu-north-1.amazonaws.com/Characters/Maestro+Sasuke.png',
        bob: 'https://fartclicker.s3.eu-north-1.amazonaws.com/Characters/BoB.png',
        cyclop: 'https://fartclicker.s3.eu-north-1.amazonaws.com/Characters/Cyclop.png',
        babyAlien: 'https://fartclicker.s3.eu-north-1.amazonaws.com/Characters/Baby+Alien.png',
        george: 'https://fartclicker.s3.eu-north-1.amazonaws.com/Characters/George.png',
        yokozuna: 'https://fartclicker.s3.eu-north-1.amazonaws.com/Characters/Yokozuna.png',
        dracula: 'https://fartclicker.s3.eu-north-1.amazonaws.com/Characters/Dracula.png',
        robert: 'https://fartclicker.s3.eu-north-1.amazonaws.com/Characters/Robert.png',
        xao: 'https://fartclicker.s3.eu-north-1.amazonaws.com/Characters/Xao.png',
        fartMan: 'https://fartclicker.s3.eu-north-1.amazonaws.com/Characters/Fartman.png',
        alien: 'https://fartclicker.s3.eu-north-1.amazonaws.com/Characters/Alien.png',
        mrFarte: 'https://fartclicker.s3.eu-north-1.amazonaws.com/Characters/Mr.+Fart%C3%A9.png',
        fangpi: 'https://fartclicker.s3.eu-north-1.amazonaws.com/Characters/Fangp%C3%AC.png',
        amaterasuTsukuyomi: 'https://fartclicker.s3.eu-north-1.amazonaws.com/Characters/Amaterasu.png',
        stinkyBlob: 'https://fartclicker.s3.eu-north-1.amazonaws.com/Characters/Melma+puzzona.png',
        bear: 'https://fartclicker.s3.eu-north-1.amazonaws.com/Characters/Bear.png',
        soprano: 'https://fartclicker.s3.eu-north-1.amazonaws.com/Characters/Soprano.png',
        mrTakeshi: 'https://fartclicker.s3.eu-north-1.amazonaws.com/Characters/Mr.+Takeshi.png',
        stein: 'https://fartclicker.s3.eu-north-1.amazonaws.com/Characters/Stein.png',
        gorilloz: 'https://fartclicker.s3.eu-north-1.amazonaws.com/Characters/Stein.png'
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
            name: 'Maestro Sasuke',
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
            name: 'Bob',
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
            name: 'Cyclop',
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
            name: 'Baby Alien',
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
            name: 'George',
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
            name: 'Yokozuna',
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
            name: 'Dracula',
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
            name: 'Robert',
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
            name: 'Xao',
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
            name: 'Fart Man',
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
            name: 'Alien',
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
            name: 'Mr Fartè',
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
            name: 'Fangpì',
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
            name: 'Amaterasu&Tsukuyomi',
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
            name: 'StinkyBlob',
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
            name: 'Bear',
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
            name: 'Soprano',
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
            name: 'Mr Takeshi',
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
            name: 'Stein',
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
            name: 'Gorilloz',
            rarity: 'Legendary',
            class: 'Heavy Fartens',
            description: 'Godzilla è impazzito. Ha mangiato troppo e causerà danni che faranno sffrire tutto il mondo',
            specialName: 'Porcdio',
            type: 'Area',
            speed: 'Slow',
            effect: 'Crea un pattaccone di merda dio can',
            skin: skinItemImages.gorilloz
        }
    };
    useEffect(() => {
        const initializeCaches = async () => {
          await ImageCache.initialize();
    
          const imagePaths = {};
          const cacheImage = async (uri) => {
            try {
              const cachedPath = await ImageCache.getCachedImagePath(uri);
              if (cachedPath) {
                imagePaths[uri] = cachedPath;
              }
            } catch (error) {
              console.error(`Failed to cache image: ${uri}`, error);
              imagePaths[uri] = uri; // Fallback all'URL originale
            }
          };
    
          const imagesToCache = [
            ...Object.values(skinItemImages),
            ...Object.values(itemsData),
            ...images,
          ];
    
          await Promise.all(imagesToCache.map(cacheImage));
          setCachedImagePaths(imagePaths);
        };
    
        initializeCaches();
    
        return () => {
          // Optionally clear caches on unmount
          // ImageCache.clearCache();
        };
      }, []);
    
      const getCachedImage = (uri) => {
        return cachedImagePaths[uri] || uri;
      };
    const item = itemsData[itemId];

    if (!item) {
        return null;
    }

    return (
        <ImageBackground
            source={{ uri: getCachedImage('https://fartclicker.s3.eu-north-1.amazonaws.com/Reference+schermata+da+rispettare+al+millimetro+di+x!.png') }}
            style={styles.page1}
            resizeMode="cover"
        >
            <HUD setIsPlaying={setIsPlaying} />
            <TouchableOpacity
                activeOpacity={1}
                style={styles.backButton}
                onPress={goBack}
            >
                <Image
                    source={{ uri: getCachedImage('https://fartclicker.s3.eu-north-1.amazonaws.com/tasto+arancione+semi+ellittico.png') }}
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
                    source={{ uri: getCachedImage('https://fartclicker.s3.eu-north-1.amazonaws.com/piattaforma+skin+home.png') }}
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

export default Info
