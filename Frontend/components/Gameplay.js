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
import RNFS from 'react-native-fs';
import HUD from './HUD'

const sbarraCombattimento = require('../assets/images/sbarra_combattimento.png');

const { width, height } = Dimensions.get('window');




function Gameplay({ isPlaying, setIsPlaying, selectedCharacterId }) {

  if (isPlaying) return null;

  const [visibleFart, setVisibleFart] = useState(null);
  const [fartEnemy, setFartEnemy] = useState(null);
  const [HPbarMidPoint, setHPbarMidPoint] = useState(10);
  const [HPbar, setHPbar] = useState(HPbarMidPoint * 2)
  const [lambdaRound, setLambdaRound] = useState(3);
  const [DPC_player, setDPC_player] = useState(0.3);
  const [DPC_bot, setDPC_bot] = useState(1);

  const randf = () => Math.random();

  // Implementazione dell'algoritmo di Poisson
  const poisson = () => {
    const L = Math.exp(-lambdaRound);
    let k = 0;
    let p = 1.0;
    while (p > L) {
      k += 1;
      const u = randf();
      p *= u;
    }
    return k - 1;
  };

  // Calcola il tempo di attesa tra gli attacchi
  const waitingTime = () => {
    const attackCount = poisson();
    const totalAttacks = attackCount;
    let inverseSum = 1.0 / totalAttacks;
    if (totalAttacks === 0) {
      inverseSum = 1 / lambdaRound;
    }
    return inverseSum * 1000; // Convertiamo in millisecondi
  };

  useEffect(() => {
    if (isPlaying) return;

    let timeoutId;

    const scheduleNextAttack = () => {
      const delay = waitingTime();
      timeoutId = setTimeout(() => {
        // Riduci la vita del giocatore
        setHPbarMidPoint(prev => Math.max(0, prev - DPC_bot)); // Non scende sotto 0
        
        // Mostra l'animazione della scoreggia
        const randomFart = fartImages[Math.floor(Math.random() * fartImages.length)];
        setFartEnemy(randomFart);
        
        setTimeout(() => {
          setFartEnemy(null);
          // Verifica se la vita è a 0
          if (HPbarMidPoint - DPC_bot <= 0) {
            // Aggiungi qui la logica di game over se necessario
            console.log("Game Over!");
          }
        }, 500);

        scheduleNextAttack();
      }, delay);
    };

    scheduleNextAttack();

    return () => clearTimeout(timeoutId);
  }, [isPlaying, lambdaRound, HPbarMidPoint]);

  const [progress, setProgress] = useState(0);
  const fartPositions = {
    1: {
      top: -20,
      right: 100,
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
    marvick: require('../assets/images/Characters/Marvick.png'),
    maestroSasuke: require('../assets/images/Characters/Maestro Sasuke.png'),
    bob: require('../assets/images/Characters/BoB.png'),
    cyclop:  require('../assets/images/Characters/Cyclop.png'),
    babyAlien: require('../assets/images/Characters/Baby Alien.png'),
    george: require('../assets/images/Characters/George.png'),
    yokozuna: require('../assets/images/Characters/Yokozuna.png'),
    dracula: require('../assets/images/Characters/Dracula.png'),
    robert: require('../assets/images/Characters/Robert.png'),
    xao: require('../assets/images/Characters/Xao.png'),
    fartMan: require('../assets/images/Characters/Fartman.png'),
    alien: require('../assets/images/Characters/Alien.png'),
    mrFarte: require('../assets/images/Characters/Mr. Fartè.png'),
    fangpi: require('../assets/images/Characters/Fangpì.png'),
    amaterasuTsukuyomi: require('../assets/images/Characters/Amaterasu.png'),
    stinkyBlob: require('../assets/images/Characters/Melma puzzona.png'),
    bear: require('../assets/images/Characters/Bear.png'),
    soprano: require('../assets/images/Characters/Sopranp.png'),
    mrTakeshi: require('../assets/images/Characters/Mr. Takeshi.png'),
    stein: require('../assets/images/Characters/Stein.png'),
    gorilloz: require('../assets/images/Characters/Stein.png')
  };

  const fartImages = [
    require('../assets/images/fart1.png'),
    require('../assets/images/fart2.png'),
    require('../assets/images/fart3.png'),
  ];

  const itemsData = {
    1: {
      name: 'Marvick',
      rarity: 'Common',
      class: 'Homo Fartens',
      description: 'Marvick è un normale cittadino del mondo che come tutti emette delle flatulenze che non mimetizza affatto. Al contrario, le annuncia con orgoglio.',
      specialName: 'MegaFart',
      type: 'Burst',
      speed: 'Medium',
      effect: "All'attivazione le scoregge fanno 110% del danno. Per 4 secondi appaiono le banane che se consumate provocano scoregge che fanno 250% del danno.",
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
      description: "Un esperto nell'arte del vento, capace di usare le sue flatulenze come raffiche offensive.",
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
      effect: "Un'ondata di fetore che causa danni enormi e debilita i nemici.",
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
      effect: "Causa un'esplosione che infligge danni critici a un gruppo di nemici.",
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
      effect: "Un'esplosione elettrica che paralizza i nemici e infligge danni.",
      skin: skinItemImages.mrFarte

    },
    14: {
      name: 'Fangpì',
      rarity: 'Rare',
      class: 'Dark Fartens',
      description: "Un essere misterioso che attacca dall'ombra.",
      specialName: 'Dark Wave',
      type: 'Stealth',
      speed: 'Fast',
      effect: "Un'onda oscura che infligge danni critici ai nemici più vicini.",
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
      effect: "Una tempesta elettrica che colpisce tutti i nemici nell'area.",
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
      effect: "Un'esplosione di fuoco che infligge danni ad area.",
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
      effect: "Un'onda sonora che infligge danni e disorienta i nemici.",
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


  const [enemySkin, setEnemySkin] = useState(skinItemImages.marvick);
  const [enemyId, setEnemyId] = useState(1);

  useEffect(() => {
    const itemKeys = Object.keys(itemsData);
    const randomKey = itemKeys[Math.floor(Math.random() * itemKeys.length)];
    const selectedEnemyData = itemsData[randomKey];
    setEnemySkin(selectedEnemyData.skin);
    setEnemyId(parseInt(randomKey));
  }, []);

  const handlePress = () => {
    // Aumenta la barra di progresso
    setHPbarMidPoint(prev => {
      const newValue = prev + DPC_player;
      // Non superare il massimo
      return Math.min(newValue, HPbar);
    });

    // Animazione della scoreggia (esistente)
    const randomFart = fartImages[Math.floor(Math.random() * fartImages.length)];
    setVisibleFart(randomFart);
    setTimeout(() => setVisibleFart(null), 500);
  };

  const item = itemsData[selectedCharacterId] || itemsData[1];


  return (
    <View style={styles.container}>
      <HUD setIsPlaying={setIsPlaying} />
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View style={[
            styles.progressFill, 
            { 
              width: `${(HPbarMidPoint / HPbar) * 100}%`,
              backgroundColor: '#4CAF50' // Rosso se sotto il 
            }
          ]} >
              <Image 
              source={require('../assets/images/separatore.png')} 
              style={styles.progressEndImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
      <View style={styles.imagesContainer}>
        {/* Player side */}
        <View style={styles.characterContainer}>
          <Image
            source={ require('../assets/images/piattaforma skin home.png')}
            style={styles.ombra}
            resizeMode="contain"
          />
          <Image
            source={{ uri: item.skin }}
            style={styles.player}
            accessible={true}
            accessibilityLabel="Player character"
          />
          {visibleFart && (
            <Image
              source={visibleFart}
              style={[styles.farts, fartPositions[selectedCharacterId] || fartPositions[1]]} />
          )}
        </View>

        {/* Enemy side */}
        <View style={[styles.characterContainer, { bottom: 5 }]}>
          <Image
            source={ require('../assets/images/piattaforma skin home.png')}
            style={styles.ombra}
            resizeMode="contain"
          />
          <Image
            source={{ uri: enemySkin }}
            style={styles.enemy}
            accessible={true}
            accessibilityLabel="Enemy character"
          />
          {fartEnemy && (
            <Image
              source={fartEnemy}
              style={[styles.farts_enemy, fartPositions[enemyId] || fartPositions[1]]} />
          )}
        </View>
      </View>

      <TouchableOpacity activeOpacity={1} onPress={handlePress} style={styles.fartButton} />

      <View style={styles.bottomContainer}>
        <ImageBackground
          source={sbarraCombattimento}
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
  fartButton: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 2,
  },
  ombra: {
    position: 'absolute',
    width: '350@s',
    height: '350@s',
    bottom: '-95@s',
    alignSelf: 'center',
    zIndex: 1,
  },
  progressContainer: {
    elevation: 90,
    zIndex: 50,
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
    width: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: '5@s',
    position: 'relative', // Necessario per posizionamento assoluto dell'immagine
  },
  progressEndImage: {
    width: 40,  // Regola in base alle tue esigenze
    height: 40, // Regola in base alle tue esigenze
    position: 'absolute',
    right: -20, // Metà della larghezza per farla sporgere
    top: -20,
  },
  imagesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between', // Changed from space-evenly to space-between
    alignItems: 'center',
    paddingHorizontal: '50@s',
  },
  characterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  farts: {
    width: '60%',
    height: '60%',
    zIndex: 1,
    resizeMode: 'contain',
    position: 'absolute',
  },
  farts_enemy: {
    zIndex: 1,
    width: '60@s',
    height: '60@s',
    position: 'absolute',
    resizeMode: 'contain',
    transform: [{ scaleX: -1 }],
  },
  player: {
    width: '150@s',
    height: '150@s',
    resizeMode: 'contain',
    zIndex: 2,
  },
  enemy: {
    width: '120@s',
    height: '120@s',
    resizeMode: 'contain',
    transform: [{ scaleX: -1 }], // Mirror the enemy horizontally
    zIndex: 2,
  },
  bottomContainer: {
    height: '200@vs',
    width: '100%',
  },
  bottomBackground: {
    zIndex: 1,
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