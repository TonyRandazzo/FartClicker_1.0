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
  Modal,
  NativeModules,
} from 'react-native';
import HUD from './HUD';
import { ScaledSheet } from 'react-native-size-matters';
import RNFS from 'react-native-fs';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://mtwsyxmhjhahirdeisnz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10d3N5eG1oamhhaGlyZGVpc256Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNDYxMDgsImV4cCI6MjA1ODkyMjEwOH0.-5qoeUa4iXkXMsN3vRW4df3WyKOETavF6lqnRHNN8Pk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


const { width, height } = Dimensions.get('window');

const { RNRestart } = NativeModules;



function Gameplay({ isPlaying, setIsPlaying, selectedCharacterId, isPaused }) {

  if (isPlaying) return null;
  const [showRoundWon, setShowRoundWon] = useState(false);
  const [visibleFart, setVisibleFart] = useState(null);
  const [fartEnemy, setFartEnemy] = useState(null);
  const [HPbarMidPoint, setHPbarMidPoint] = useState(10);
  const [HPbar, setHPbar] = useState(HPbarMidPoint * 2)
  const [lambdaRound, setLambdaRound] = useState(3);
  const [DPC_player, setDPC_player] = useState(0.3);
  const [DPC_bot, setDPC_bot] = useState(1);
  const [round, setRound] = useState(1);
  const [roundWon, setRoundWon] = useState(0);
  const [gold, setGold] = useState(0);
  const [go, setGo] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [start_DPC, setStart_DPC] = useState(1);
  const [username, setUsername] = useState(null);

  // Costanti e parametri di progressione
  const RC = 10; // Ricompensa base
  const RC_round_d = 0.4; // Diminuzione ricompensa per round
  const RC_CAP = 3.5; // Ricompensa minima
  const CPS = 2; // Attacchi per secondo base
  const CPS_round = 0.01; // Incremento attacchi per round
  const CPS_cap = 4; // Massimo attacchi per secondo
  const power_CAP = 0.12; // Incremento massimo potenza nemico
  const power_CAP_d = 0.002; // Diminuzione incremento per round
  const power_CAP_lower_bound = 0.02; // Minimo incremento potenza
  const base_IPS = 0.007; // Incremento base danno per secondo
  const IPSR = 0.05; // Incremento rate danno
  const IPSR_d = 0.0008; // Diminuzione incremento rate
  const IPSR_lower_bound = 0.01; // Minimo incremento rate
  const HPbar_increment = 0.03; // Incremento vita per round

  const getCurrentRoundFromDB = async () => {
    if (!username) return 0; // Usa username
    
    try {
      const { data, error } = await supabase
        .from('main')
        .select('round')
        .eq('user', username) // Usa username
        .single();
  
      return data?.round || 0;
    } catch (error) {
      console.error('Error fetching round:', error);
      return 0;
    }
  };
  const updateMaxRound = async (newRound) => {
    if (!username) {
      console.error('Cannot update round: No user found');
      return false;
    }
  
    try {
      // USA getCurrentRoundFromDB invece di ripetere la query
      const currentRound = await getCurrentRoundFromDB();
      console.log(`Current round: ${currentRound}, New round: ${newRound}`);
  
      if (newRound > currentRound) {
        const { error } = await supabase
          .from('main')
          .update({ round: newRound })
          .eq('user', username);
  
        if (error) throw error;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Update round error:', error.message);
      return false;
    }
  };
  // Fetch current user from AsyncStorage
  useEffect(() => {
    const getUserFromStorage = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('loggedInUser');
        if (storedUsername !== null) {
          setUsername(storedUsername);
          console.log('Current user loaded:', storedUsername);
        }
      } catch (error) {
        console.error('Error fetching user from AsyncStorage:', error);
      }
    };

    getUserFromStorage();
  }, []);

  // Function to update money in Supabase
  const updateUserMoney = async (amount) => {
    if (!username) {
      console.error('Cannot update money: No user found in AsyncStorage');
      return;
    }

    try {
      // First, get the current money value from the database
      const { data, error: fetchError } = await supabase
        .from('main')
        .select('money')
        .eq('user', username)
        .single();

      if (fetchError) {
        console.error('Error fetching user data:', fetchError);
        return;
      }

      // Calculate the new money value
      const currentMoney = data?.money || 0;
      const newMoneyValue = currentMoney + amount;

      // Update the money field in the database
      const { error: updateError } = await supabase
        .from('main')
        .update({ money: newMoneyValue })
        .eq('user', username);

      if (updateError) {
        console.error('Error updating money in Supabase:', updateError);
        return;
      }

      console.log(`Successfully updated user's money. Added ${amount}. New total: ${newMoneyValue}`);
    } catch (error) {
      console.error('Unexpected error updating money:', error);
    }
  };

  // Calcola la ricompensa per il round corrente
  const calculateRoundGold = () => {
    if (round === 1) return RC;
    const RC_current_round = Math.max(RC - RC_round_d * (round - 1), RC_CAP);
    return Math.round(round * RC_current_round);
  };

  // Calcola il tasso di attacco del nemico
  const calculateLambdaRound = () => {
    return Math.min(CPS + (CPS_round * (round - 1)), CPS_cap);
  };

  // Calcola il CAP del danno nemico
  const calculateCapDPC = () => {
    const power_CAP_current = Math.max(
      power_CAP - (power_CAP_d * (round - 1)), 
      power_CAP_lower_bound
    );
    return start_DPC * (1 + power_CAP_current);
  };

  // Calcola l'incremento del danno nemico
  const calculateDPCIncrement = () => {
    return base_IPS * (1 + Math.max(
      (IPSR - (IPSR_d * (round - 1))), 
      IPSR_lower_bound
    )) ** (round - 1);
  };

  // Avvia un nuovo round
  const startNewRound = async () => {
    const newRound = round + 1;
    setRound(newRound);
    setLambdaRound(calculateLambdaRound());
    
    // Aumenta la vita massima
    setHPbarMidPoint(prev => prev * (1 + HPbar_increment));
    setHPbar(HPbarMidPoint * 2);
    
    // Resetta la barra a metà
    setHPbarMidPoint(HPbarMidPoint);
    
    // Aggiorna il round massimo nel DB
    await updateMaxRound(newRound);
    
    // Aggiungi la ricompensa
    // Calcola la ricompensa per il round
    const roundReward = calculateRoundGold();
    
    // Aggiungi la ricompensa allo stato locale
    setGold(prev => prev + roundReward);
    
    // Aggiorna il denaro nel database Supabase
    updateUserMoney(roundReward);
    // Ricalcola i parametri di difficoltà
    const newCapDPC = calculateCapDPC();
    const newDPCIncrement = calculateDPCIncrement();
    
    setGo(false);
    // Avvia il round dopo un breve delay
    setTimeout(() => setGo(true), 1000);
  };


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
    return inverseSum * 1000;
  };

// Modifica l'useEffect che gestisce gli attacchi del nemico con l'algoritmo di Poisson
useEffect(() => {
  // Riferimento alla stato attuale per i timeout
  const isActive = { current: go && !gameOver && !isPaused};
  
  let timeoutId;
  let animationTimeoutId;

  const scheduleNextAttack = () => {
    // Calcola il ritardo tra un attacco e l'altro secondo Poisson
    const delay = waitingTime();
    
    timeoutId = setTimeout(() => {
      // Verifica lo stato attuale usando il riferimento
      // invece degli stati che potrebbero non essere ancora aggiornati
      if (isActive.current) {
        setHPbarMidPoint(prev => {
          const newValue = prev - DPC_bot;
          
          // Controlla se la vita è arrivata a 0
          if (newValue <= 0) {
            isActive.current = false; // Aggiorna immediatamente il riferimento
            setGo(false);
            setGameOver(true);
            return 0;
          }
          
          return newValue;
        });

        // Mostra l'animazione della scoreggia solo se ancora attivo
        if (isActive.current) {
          const randomFart = fartImages[Math.floor(Math.random() * fartImages.length)];
          setFartEnemy(randomFart);

          // Rimuovi l'animazione dopo un breve periodo
          animationTimeoutId = setTimeout(() => {
            setFartEnemy(null);
            
            // Programma il prossimo attacco solo se ancora attivo
            if (isActive.current) {
              scheduleNextAttack();
            }
          }, 500);
        }
      }
    }, delay);
  };

  // Aggiorna il riferimento quando cambiano gli stati
  isActive.current = go && !gameOver && !isPaused;
  
  // Avvia la sequenza di attacchi solo se attivo
  if (isActive.current) {
    scheduleNextAttack();
  }

  // Pulisci i timeout quando il componente si smonta o quando cambiano le dipendenze
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (animationTimeoutId) {
      clearTimeout(animationTimeoutId);
    }
  };
},[go, gameOver, lambdaRound, DPC_bot, isPaused]);
  // Inizializzazione del gioco
  useEffect(() => {
    // Avvia il primo round dopo un breve delay
    setTimeout(() => setGo(true), 1000);
  }, []);
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
    maestroSasuke: require('../assets/images/Characters/Maestro_Sasuke.png'),
    bob: require('../assets/images/Characters/BoB.png'),
    cyclop:  require('../assets/images/Characters/Cyclop.png'),
    babyAlien: require('../assets/images/Characters/Baby_Alien.png'),
    george: require('../assets/images/Characters/George.png'),
    yokozuna: require('../assets/images/Characters/Yokozuna.png'),
    dracula: require('../assets/images/Characters/Dracula.png'),
    robert: require('../assets/images/Characters/Robert.png'),
    xao: require('../assets/images/Characters/Xao.png'),
    fartMan: require('../assets/images/Characters/Fartman.png'),
    alien: require('../assets/images/Characters/Alien.png'),
    mrFarte: require('../assets/images/Characters/Mr._Farté.png'),
    fangpi: require('../assets/images/Characters/Fangpì.png'),
    amaterasuTsukuyomi: require('../assets/images/Characters/Amaterasu.png'),
    stinkyBlob: require('../assets/images/Characters/Melma_puzzona.png'),
    bear: require('../assets/images/Characters/Bear.png'),
    soprano: require('../assets/images/Characters/Soprano.png'),
    mrTakeshi: require('../assets/images/Characters/Mr._Takeshi.png'),
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
  
  const handlePress = async () => {
    if (!go) return;
    
    setHPbarMidPoint(prev => {
      const newValue = prev + DPC_player;
      
      if (newValue >= HPbar) {
        setRoundWon(prev => prev + 1);
        setGo(false);
        setShowRoundWon(true);
        return HPbar;
      }
      
      return newValue;
    });
    
    // Animazione della scoreggia
    const randomFart = fartImages[Math.floor(Math.random() * fartImages.length)];
    setVisibleFart(randomFart);
    setTimeout(() => setVisibleFart(null), 500);
  };
  const item = itemsData[selectedCharacterId] || itemsData[1];


// Definizione centrale di tutte le immagini
const images = {
  progressEnd: require('../assets/images/separatore.png'),
  platform: require('../assets/images/piattaforma_skin_home.png'),

};

useEffect(() => {
  if (gameOver && gold > 0) {
    setGold(0); // Reset gold after updating to prevent duplicate updates
  }
}, [gameOver]);


const resetGame = () => {
  updateUserMoney(gold);
  setGameOver(false);
  setHPbarMidPoint(10);
  setHPbar(20);
  setRound(1);
  setRoundWon(0);
  setGo(false);
  setTimeout(() => setGo(true), 1000);
};

const handleContinue = async () => {
  setShowRoundWon(false);
  await startNewRound();
};

const handleExit = () => {
  RNRestart.Restart();

};
const RoundWonOverlay = ({ onContinue, onExit }) => {
  return (
    <View style={styles.roundWonOverlay}>
      <View style={styles.roundWonContainer}>
        <Text style={styles.roundWonTitle}>WIN</Text>
        <Text style={styles.roundWonSubtitle}>Bottino: 🤪</Text>
        
        <View style={styles.roundWonButtonsContainer}>
          <TouchableOpacity 
            style={[styles.roundWonButton, styles.continueButton]}
            onPress={onContinue}
          >
            <Text style={styles.roundWonButtonText}>Continua</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.roundWonButton, styles.exitButton]}
            onPress={onExit}
          >
            <Text style={styles.roundWonButtonText}>Esci</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

return (
  <ImageBackground style={styles.container} source={require('../assets/images/sfondo_blu.png')}>
          {gameOver && (
        <View style={styles.gameOverOverlay}>
          <Text style={styles.gameOverText}>GAME OVER</Text>
          <TouchableOpacity onPress={resetGame} style={styles.restartButton}>
            <Text style={styles.restartButtonText}>Riprova</Text>
          </TouchableOpacity>
        </View>
      )}
    <HUD setIsPlaying={setIsPlaying} />
    <View style={styles.roundContainer}>
      <Text style={styles.roundText}>ROUND: {round}</Text>
    </View>
    <View style={styles.progressContainer}>
      <View style={styles.progressBackground}>
        <View style={[
          styles.progressFill, 
          { 
            width: `${(HPbarMidPoint / HPbar) * 100}%`,
            backgroundColor: '#4CAF50'
          }
        ]}>
          {images.progressEnd && (
            <Image 
              source={images.progressEnd} 
              style={styles.progressEndImage}
              resizeMode="contain"
              onError={() => console.error('[Image Error] Failed to load ProgressEnd image')}
            />
          )}
        </View>
      </View>
    </View>
    <View style={styles.imagesContainer}>
      <View style={styles.characterContainer}>
        {images.platform && (
          <Image
            source={images.platform}
            style={styles.ombra}
            resizeMode="contain"
            onError={() => console.error('[Image Error] Failed to load PlayerPlatform image')}
          />
        )}

        {item?.skin ? (
          <Image
            source={item.skin}
            style={styles.player}
            accessible={true}
            accessibilityLabel="Player character"
            onError={() => console.error('[Image Error] Failed to load PlayerSkin image')}
          />
        ) : console.error('[Image Debug] PlayerSkin is missing')}

        {visibleFart && (
          <Image
            source={visibleFart}
            style={[styles.farts, fartPositions[selectedCharacterId] || fartPositions[1]]}
            onError={() => console.error('[Image Error] Failed to load PlayerFart image')}
          />
        )}
      </View>

      <View style={[styles.characterContainer, { bottom: 5 }]}>
        {images.platform && (
          <Image
            source={images.platform}
            style={styles.ombra}
            resizeMode="contain"
            onError={() => console.error('[Image Error] Failed to load EnemyPlatform image')}
          />
        )}

        {enemySkin ? (
          <Image
            source={enemySkin}
            style={styles.enemy}
            accessible={true}
            accessibilityLabel="Enemy character"
            onError={() => console.error('[Image Error] Failed to load EnemySkin image')}
          />
        ) : console.error('[Image Debug] EnemySkin is missing')}

        {fartEnemy && (
          <Image
            source={fartEnemy}
            style={[styles.farts_enemy, fartPositions[enemyId] || fartPositions[1]]}
            onError={() => console.error('[Image Error] Failed to load EnemyFart image')}
          />
        )}
      </View>
    </View>

    <TouchableOpacity activeOpacity={1} onPress={handlePress} style={styles.fartButton} />
    {showRoundWon && (
  <RoundWonOverlay 
    onContinue={handleContinue} 
    onExit={handleExit} 
  />
)}
  </ImageBackground>
);
}

const styles = ScaledSheet.create({
  container: {
    width: width,
    height: height,
  },
  roundWonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  roundWonContainer: {
    padding: '20@s',
    borderRadius: '15@s',
    width: '80%',
    alignItems: 'center',
  },
  roundWonTitle: {
    color: '#fff',
    fontSize: '24@s',
    fontWeight: 'bold',
    marginBottom: '10@s',
    textAlign: 'center',
  },
  roundWonSubtitle: {
    color: '#ff9800',
    fontSize: '18@s',
    marginBottom: '20@s',
    textAlign: 'center',
  },
  roundWonButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  roundWonButton: {
    padding: '10@s',
    borderRadius: '10@s',
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButton: {
    backgroundColor: '#4caf50',
  },
  exitButton: {
    backgroundColor: '#f44336',
  },
  roundWonButtonText: {
    color: '#fff',
    fontSize: '16@s',
    fontWeight: 'bold',
  },
  roundContainer: {
    position: 'absolute',
    top: '10%', // Regola questa percentuale per posizionarlo sopra la barra
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 20,
  },
  roundText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'LuckiestGuy-8jyD',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  gameOverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  gameOverText: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  restartButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  restartButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
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
    paddingHorizontal: '20@s',
    paddingTop: '150@vs',
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
    bottom: '80@s',
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