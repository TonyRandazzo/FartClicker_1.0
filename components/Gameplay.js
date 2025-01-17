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

function Gameplay({ isPlaying, setIsPlaying, selectedCharacterId }) {
  const [progress, setProgress] = useState(0);
  if (isPlaying) return null;
  const fartPositions = {
    1: {
      top: 110,
      right: 50,
      bottom: null,
      left: null,
    },
    2: {
      top: 110,
      right: null,
      bottom: null,
      left: null,
    },
    3: {
      top: 90,
      right: null,
      bottom: null,
      left: 15,
      transform: [{ rotate: '35deg' }],
    },
    4: {
      top: 25,
      right: 45,
      bottom: null,
      left: null,
    },
    5: {
      top: null,
      right: null,
      bottom: 30,
      left: 40,
    },
    6: {
      top: 30,
      right: 35,
      bottom: null,
      left: null,
    },
    7: {
      top: null,
      right: 50,
      bottom: 20,
      left: null,
    },
    8: {
      top: 35,
      right: null,
      bottom: null,
      left: 45,
    },
    9: {
      top: null,
      right: 45,
      bottom: 35,
      left: null,
    },
    10: {
      top: 40,
      right: null,
      bottom: null,
      left: 50,
    },
    11: {
      top: null,
      right: 55,
      bottom: 40,
      left: null,
    },
    12: {
      top: 45,
      right: 40,
      bottom: null,
      left: null,
    },
    13: {
      top: null,
      right: null,
      bottom: 45,
      left: 55,
    },
    14: {
      top: 50,
      right: 45,
      bottom: null,
      left: null,
    },
    15: {
      top: null,
      right: 60,
      bottom: 30,
      left: null,
    },
    16: {
      top: 35,
      right: null,
      bottom: null,
      left: 60,
    },
    17: {
      top: null,
      right: 50,
      bottom: 50,
      left: null,
    },
    18: {
      top: 55,
      right: null,
      bottom: null,
      left: 45,
    },
    19: {
      top: null,
      right: 65,
      bottom: 35,
      left: null,
    },
    20: {
      top: 40,
      right: null,
      bottom: null,
      left: 65,
    },
    21: {
      top: null,
      right: 55,
      bottom: 55,
      left: null,
    }
  };

  const skinItemImages = {
    marvick: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FMarvick.png?alt=media&token=d5346127-30e1-4fc6-9ac4-e092f4d86175',
    maestroSasuke: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FMaestro%20Sasuke.png?alt=media&token=01bae3e1-5066-46a1-8b77-4e5a4a4ec050',
    bob: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FBoB.png?alt=media&token=b7b75588-7cfe-4a6e-ab85-eb42b51f29fd',
    cyclop: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FCyclop.png?alt=media&token=85783d86-ca0e-4bb3-852e-47e8974e6dd9',
    babyAlien: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FBaby%20Alien.png?alt=media&token=0cb16087-ca0d-41ac-99b1-9369bf1fdea4',
    george: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FGeorge.png?alt=media&token=40093d6e-c869-47e3-960d-9b128a72b61c',
    yokozuna: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FYokozuna.png?alt=media&token=2d742ba2-cffe-498f-af6c-386336e2bbdf',
    dracula: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FDracula.png?alt=media&token=15584519-9e16-47b3-a793-5e35e789ace2',
    robert: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FRobert.png?alt=media&token=21e94f96-ad20-40d6-9a59-985d370afb67',
    xao: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FXao.png?alt=media&token=63032bc7-12f2-41bf-a549-36fb01461ef1',
    fartMan: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FFartman.png?alt=media&token=0b63be39-b735-4a90-90f4-219e149767c0',
    alien: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FAlien.png?alt=media&token=774ec1bd-f4aa-483f-9b2c-d5b253fd678e',
    mrFarte: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FMr.%20Fart%C3%A9.png?alt=media&token=ba353fd8-19b6-4174-84f9-045329349a8b',
    fangpi: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FFangp%C3%AC.png?alt=media&token=53996ef6-9be4-4692-b2f8-af4534da21df',
    amaterasuTsukuyomi: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FAmaterasu.png?alt=media&token=6badbaf1-c60d-452c-a4fb-ed28edd45a02',
    stinkyBlob: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FMelma%20puzzona.png?alt=media&token=18655782-39f3-4e3d-8b29-4a5418b3e20e',
    bear: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FBear.png?alt=media&token=48f0ede4-a588-4bd6-b5ea-31b56e4fdaf0',
    soprano: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FSoprano.png?alt=media&token=9c74562e-786b-4e60-a5cb-ceff41c411e2',
    mrTakeshi: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FMr.%20Takeshi.png?alt=media&token=fc250bc2-052f-4e00-a069-6ec8e04cb91c',
    stein: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FStein.png?alt=media&token=63cb53d1-c651-4ec0-ab19-af2140cd43db',
    gorilloz: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FGorillos.png?alt=media&token=8c42e68f-97d3-479c-8e95-f6f821b07358'
  };
  const [enemySkin, setEnemySkin] = useState(1);

  const [enemyId, setEnemyId] = useState(1);
  const [visibleFart, setVisibleFart] = useState(null);

  const fartImages = [
    require('../assets/images/fart1.png'),
    require('../assets/images/fart2.png'),
    require('../assets/images/fart3.png'),
  ];
  useEffect(() => {
    const itemKeys = Object.keys(itemsData);
    const randomKey = itemKeys[Math.floor(Math.random() * itemKeys.length)];
    const selectedEnemyData = itemsData[randomKey];

    setEnemySkin(selectedEnemyData.skin);
    setEnemyId(parseInt(randomKey));
  }, []);

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

  const handlePress = () => {
    // Seleziona un'immagine casuale
    const randomFart = fartImages[Math.floor(Math.random() * fartImages.length)];
    setVisibleFart(randomFart);

    // Rimuovi l'immagine dopo 500ms
    setTimeout(() => {
      setVisibleFart(null);
    }, 500);
  };
  const item = itemsData[selectedCharacterId] || itemsData[1];

  return (
    <View style={styles.container}>
      <HUD setIsPlaying={setIsPlaying} />
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      <View style={styles.imagesContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: item.skin }}
            style={styles.player}
            accessible={true}
            accessibilityLabel="Palyer character"
          />
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fpiattaforma%20skin%20home.png?alt=media&token=cab9591d-8762-4a8f-901b-3eed084b15d7' }}
            style={styles.ombra}
            resizeMode="contain"
          />
          <Image
            source={visibleFart}
            style={[styles.farts, fartPositions[selectedCharacterId] || fartPositions[1]]} />
        </View>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fpiattaforma%20skin%20home.png?alt=media&token=cab9591d-8762-4a8f-901b-3eed084b15d7' }}
            style={styles.ombra}
            resizeMode="contain"
          />
          {visibleFart && (
            <Image
              source={visibleFart} 
              style={[styles.farts, fartPositions[selectedCharacterId] || fartPositions[1]]} />
            )}
          <Image
            source={{ uri: enemySkin }}
            style={styles.enemy}
            accessible={true}
            accessibilityLabel="Enemy character"
          />
        <TouchableOpacity activeOpacity={1} onPress={handlePress} style={styles.fartButton} />

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
  ombra: {
    position: 'relative', // Sovrappone l'immagine sotto
    width: 550,
    height: 720,
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
  farts: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
    position: 'absolute',
  },
  farts_enemy: {
    transform: [{ scaleX: -1 }],
    width: '50%',
    height: '50%',
    position: 'absolute',
    resizeMode: 'contain',
  },
  player: {
    width: '130%',
    height: '130%',
    left: 30,
    resizeMode: 'contain',
    zIndex: 1,
  },
  enemy: {
    transform: [{ scaleX: -1 }],
    width: '90%',
    height: '90%',
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