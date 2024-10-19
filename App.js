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

const { width, height } = Dimensions.get('window');

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const shopItemImages = [
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Shop%20Icons%2Ficona%20soldi%201.png?alt=media&token=1d60b34d-df85-4a42-88c5-a707df97f7a6',
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Shop%20Icons%2Ficona%20soldi%202.png?alt=media&token=c1e9e543-3811-4092-8ea4-564c4fd75a3b',
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Shop%20Icons%2Ficona%20soldi%203.png?alt=media&token=e00fca13-ceeb-43ef-981a-1c1d72c7afd5',
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Shop%20Icons%2Ficona%20soldi%20sgravior%204.png?alt=media&token=f2debd95-462d-4b34-bbd1-2dcb6fce0e2c',
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Shop%20Icons%2Ficona%20soldi%20sgravior%205.png?alt=media&token=3f25093d-d83d-440e-b188-049568a65c75',
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Shop%20Icons%2Ficona%20soldi%20sgravior%206.png?alt=media&token=34823b48-1f64-4976-82ad-f70d6815cb0d',
];

const buttonTexts = [
  '0,10 $',
  '0,30 $',
  '0,50 $',
  '1,00 $',
  '2,50 $',
  '5,00 $',
];

const topRightTexts = [
  '', // Lascia vuoto per la prima immagine
  '10%', // Testo per la seconda immagine
  '10%', // Testo per la terza immagine
  '10%', // Testo per la quarta immagine
  '10%', // Testo per la quinta immagine
  '10%', // Testo per la sesta immagine
];

const buttonImage = 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2FButtonText_Small_Orange_Round.png?alt=media&token=072178ce-843d-4a0d-b8e8-63787564dab3';

const zigzagImage = 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Shop%20Icons%2Fmoneta%20opaca%20sfondo%20shop.png?alt=media&token=3b835818-3b18-4622-b2d2-afb840d695b9';

const Shop = () => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    const startAnimation = () => {
      animation.setValue(0);
      Animated.loop(
        Animated.timing(animation, {
          toValue: 1,
          duration: 30000, // 30 secondi
          useNativeDriver: true,
        })
      ).start();
    };
    startAnimation();
  }, [animation]);

  const animatedBackground = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -height], // Muove il background verso l'alto
  });

  return (<ImageBackground
    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fsfondo%20shop.png?alt=media&token=384318d8-0527-411d-a67c-0344b23fdedf' }}
    style={[styles.page, { justifyContent: 'center', alignItems: 'center' }]}
    resizeMode="cover"
  >
    <Animated.View style={[styles.animatedBackground, { transform: [{ translateY: animatedBackground }] }]}>
      <Image
        source={{ uri: zigzagImage }}
      />
    </Animated.View>
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}

    >
      <View style={styles.rectangle}>
        <View style={styles.imageContainer}>
          {shopItemImages.map((imageUrl, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri: imageUrl }} style={styles.shopImage} />

              {index > 0 && (
                <Text style={styles.topRightText}>{topRightTexts[index]}</Text>
              )}

              <TouchableOpacity style={styles.shopButton} activeOpacity={1}>
                <Image source={{ uri: buttonImage }} style={styles.shopButtonImage} />
                <Text style={styles.shopButtonText}>{buttonTexts[index]}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.LimitedOffer}>
        <Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fbarra%20bluina.png?alt=media&token=b92e883e-ec4f-4f3d-bbb1-b25d78f58aeb' }}
          style={styles.newImage}
        />
        <Text style={styles.rotatedText}>La tua scritta</Text>
        <Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Shop%20Icons%2Fchronometer-timer-counter-free-png.webp?alt=media&token=df07c4c0-eab9-4de9-85c9-487b65cac239' }}
          style={styles.Timer}
        />
      </View>

      <View style={styles.LimitedOffer}>
        <Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fbarra%20magentine.png?alt=media&token=bd8eb3f4-31ea-4faf-adfa-a52dcbaafbbf' }}
          style={styles.newImage}
        />
        <Text style={styles.rotatedText}>Testo Rotato</Text>
        <View style={styles.threeImagesContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.smallImage}
          />
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.smallImage}
          />
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.smallImage}
          />
        </View>
      </View>
    </ScrollView>
  </ImageBackground>
  );
}
const Skin = () => {
  const [activeButton, setActiveButton] = useState('skin');

  const imageBehindSwitchSkin = 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fskin%20targa.png?alt=media&token=a248bd60-061d-4695-a2f8-bdebf47b9a7d';
  const imageBehindSwitchComic = 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fskin%20targa.png?alt=media&token=a248bd60-061d-4695-a2f8-bdebf47b9a7d';

  const handleSwitchSkin = () => setActiveButton('skin');
  const handleSwitchComic = () => setActiveButton('comic');

  const skinItems = [
    { id: 1, name: 'Marvick', image: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20marvik.png?alt=media&token=92ff07c9-ae89-49a0-a698-aa3677443a90', background: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20blu%20con%20sfumatura%20biancastra%20della%20schermata%20home.png?alt=media&token=b83d60da-2118-4eed-b3ec-e2dce661aed4', rarity: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice%20intera%20comune.png?alt=media&token=1c18b981-7086-4063-8d23-845760bac25f', class: 'Warrior' },
    { id: 2, name: 'Maestro Sasuke', image: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20sasuke.png?alt=media&token=fae519f9-ba44-46cf-b9ef-680629843f11', background: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20raro.png?alt=media&token=51b32ffd-043a-4bcb-b38f-0ce28d2b1615', rarity: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice_intera_raro-transformed.png?alt=media&token=b544f1db-1305-4d89-8bcc-2e132e5ec20f', class: 'Mage' },
    { id: 3, name: 'Bob', image: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20bob.png?alt=media&token=4a52b112-1e10-4e39-83b5-1c92f479ff2c', background: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20raro.png?alt=media&token=51b32ffd-043a-4bcb-b38f-0ce28d2b1615', rarity: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice_intera_raro-transformed.png?alt=media&token=b544f1db-1305-4d89-8bcc-2e132e5ec20f', class: 'Ranger' },
    { id: 4, name: 'Cyclop', image: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20cyclop.png?alt=media&token=94e26047-aca9-47bb-907d-e92f1d2ac3e2', background: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20blu%20con%20sfumatura%20biancastra%20della%20schermata%20home.png?alt=media&token=b83d60da-2118-4eed-b3ec-e2dce661aed4', rarity: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice%20intera%20comune.png?alt=media&token=1c18b981-7086-4063-8d23-845760bac25f', class: 'Assassin' },
    { id: 5, name: 'Baby Alien', image: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzobusto%20alien.png?alt=media&token=121dcfc6-3d7e-410a-8097-42c10af79784', background: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20blu%20con%20sfumatura%20biancastra%20della%20schermata%20home.png?alt=media&token=b83d60da-2118-4eed-b3ec-e2dce661aed4', rarity: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice%20intera%20comune.png?alt=media&token=1c18b981-7086-4063-8d23-845760bac25f', class: 'Paladin' },
    { id: 6, name: 'George', image: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20george.png?alt=media&token=10b6c8f3-39a9-4a99-99de-a88f42572375', background: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20non%20comune.png?alt=media&token=9de28b8a-4d76-4d7e-8d63-b796756e73cf', rarity: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice%20intera%20non%20comune.png?alt=media&token=bfd04c06-98fd-4b57-b186-67309816d94f', class: 'Rogue' },
    { id: 7, name: 'Yokozuna', image: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20yokkozuna.png?alt=media&token=248beef7-ea0e-4b6a-a883-9afed5dcc449', background: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20epico.png?alt=media&token=3fb40852-9040-4352-93f8-d0841723978c', rarity: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice%20intera%20epico.png?alt=media&token=a34a1c61-855d-454f-9652-112d11596d45', class: 'Archer' },
    { id: 8, name: 'Dracula', image: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2FMezzob%20Draccula.png?alt=media&token=29392aff-cd3c-4ede-a5a0-87baaea85540', background: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20leggendaria.png?alt=media&token=0fd106da-5e3f-41ec-b148-194922a843a5', rarity: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice%20intera%20leggendaria.png?alt=media&token=03b064a1-b1a6-42ed-92ab-8e8423069644', class: 'Golem' },
    { id: 9, name: 'Robert', image: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20robert.png?alt=media&token=68cfc266-3d67-4d0c-a57f-0c769a129d73', background: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20non%20comune.png?alt=media&token=9de28b8a-4d76-4d7e-8d63-b796756e73cf', rarity: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice%20intera%20non%20comune.png?alt=media&token=bfd04c06-98fd-4b57-b186-67309816d94f', class: 'Necromancer' },
    { id: 10, name: 'Xao', image: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20xao.png?alt=media&token=3b85a8a1-2202-4b1a-b4b3-fa903ae568b9', background: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20non%20comune.png?alt=media&token=9de28b8a-4d76-4d7e-8d63-b796756e73cf', rarity: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice%20intera%20non%20comune.png?alt=media&token=bfd04c06-98fd-4b57-b186-67309816d94f', class: 'Knight' },
    { id: 11, name: 'Fart Man', image: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20fartman.png?alt=media&token=961c0f05-55c6-4e11-97a9-99deaa230539', background: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfonfo%20mitico%20sotto.png?alt=media&token=68eda32d-6047-47ea-a740-f5c463f25171', rarity: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice%20intera%20mitico.png?alt=media&token=f1b3f8b0-236f-4735-8676-0068340e65f0', class: 'Sorceress' },
    { id: 12, name: 'Alien', image: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Falien%20adulto%20mezzob.png?alt=media&token=2fbc4279-ebc6-4ef0-b87f-3fb3475e66ed', background: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20leggendaria.png?alt=media&token=0fd106da-5e3f-41ec-b148-194922a843a5', rarity: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice%20intera%20leggendaria.png?alt=media&token=03b064a1-b1a6-42ed-92ab-8e8423069644', class: 'Nomad' },
    { id: 13, name: 'Mr Fartè', image: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20Mr.%20Fart%C3%A9.png?alt=media&token=2f1f1eb0-52d9-4ba2-8dbb-daa1ebf483e3', background: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20leggendaria.png?alt=media&token=0fd106da-5e3f-41ec-b148-194922a843a5', rarity: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice%20intera%20leggendaria.png?alt=media&token=03b064a1-b1a6-42ed-92ab-8e8423069644', class: 'Lord' },
    { id: 14, name: 'Fangpì', image: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20fangpi%C3%AC.png?alt=media&token=a0d97103-7d72-4648-8729-3b71449ec82c', background: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfonfo%20mitico%20sotto.png?alt=media&token=68eda32d-6047-47ea-a740-f5c463f25171', rarity: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice%20intera%20mitico.png?alt=media&token=f1b3f8b0-236f-4735-8676-0068340e65f0', class: 'Shaman' },
    { id: 15, name: 'Amaterasu&Tsukuyomi', image: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20tuskuamateras.png?alt=media&token=e3be9494-04c8-4cad-ab23-ccbf7e835246', background: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20raro.png?alt=media&token=51b32ffd-043a-4bcb-b38f-0ce28d2b1615', rarity: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice%20intera%20divinit%C3%A0.png?alt=media&token=8ef1d64f-dfeb-44f4-81c8-cd6dfb98e8f7', class: 'Monk' },
    { id: 16, name: 'StinkyBlob', image: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20melma%20puzzonsa.png?alt=media&token=2add89e2-6c4f-4d5a-84d0-4cae2ca524e7', background: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20epico.png?alt=media&token=3fb40852-9040-4352-93f8-d0841723978c', rarity: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice%20intera%20epico.png?alt=media&token=a34a1c61-855d-454f-9652-112d11596d45', class: 'Giant' },
    { id: 17, name: 'Bear', image: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzobusto%20bear.png?alt=media&token=1bcfc630-9007-4fb8-81b9-446c292f3168', background: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20non%20comune.png?alt=media&token=9de28b8a-4d76-4d7e-8d63-b796756e73cf', rarity: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice%20intera%20non%20comune.png?alt=media&token=bfd04c06-98fd-4b57-b186-67309816d94f', class: 'Captain' },
    { id: 18, name: 'Soprano', image: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20soprano.png?alt=media&token=949f658a-2034-436e-b15e-e6baa473790a', background: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20raro.png?alt=media&token=51b32ffd-043a-4bcb-b38f-0ce28d2b1615', rarity: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice_intera_raro-transformed.png?alt=media&token=b544f1db-1305-4d89-8bcc-2e132e5ec20f', class: 'Priestess' },
    { id: 19, name: 'Mr Takeshi', image: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20mr.%20takeshi.png?alt=media&token=b4ee41e6-1a61-4cfc-9528-d51b331088b7', background: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20blu%20con%20sfumatura%20biancastra%20della%20schermata%20home.png?alt=media&token=b83d60da-2118-4eed-b3ec-e2dce661aed4', rarity: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice%20intera%20comune.png?alt=media&token=1c18b981-7086-4063-8d23-845760bac25f', class: 'Priestess' },
    { id: 20, name: 'Stein', image: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20stein.png?alt=media&token=9f5854a3-7b60-4ca4-9ba8-b8cfcc8456e2', background: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20epico.png?alt=media&token=3fb40852-9040-4352-93f8-d0841723978c', rarity: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice%20intera%20epico.png?alt=media&token=a34a1c61-855d-454f-9652-112d11596d45', class: 'Priestess' },
    { id: 21, name: 'Gorilloz', image: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Facce%2Fmezzob%20gorilloz.png?alt=media&token=5d113d1f-7988-495f-8499-14f1251b76ef', background: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Sfondi%20Skin%2Fsfondo%20epico.png?alt=media&token=3fb40852-9040-4352-93f8-d0841723978c', rarity: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Rarity%2Fcornice%20intera%20epico.png?alt=media&token=a34a1c61-855d-454f-9652-112d11596d45', class: 'Priestess' },
  ];

  const comicItems = Array(15).fill().map((_, index) => ({
    id: index + 1,
    title: `Comic ${index + 1}`,
    cover: 'https://via.placeholder.com/150x200'
  }));

  return (
    <ImageBackground
      source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fsfondo%20shop.png?alt=media&token=384318d8-0527-411d-a67c-0344b23fdedf' }}
      style={styles.page1}
      resizeMode="cover"
    >
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity style={styles.topButton} activeOpacity={1} onPress={handleSwitchSkin}>
          <Text style={styles.topButtonText}>Skin</Text>
          {activeButton === 'skin' && (
            <Image source={{ uri: imageBehindSwitchSkin }} style={styles.backgroundImage} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.topButton} activeOpacity={1} onPress={handleSwitchComic}>
          <Text style={styles.topButtonText}>Comic</Text>
          {activeButton === 'comic' && (
            <Image source={{ uri: imageBehindSwitchComic }} style={styles.backgroundImage2} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.imageButtonContainer}>
        <Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Skin%20Icons%2Fsepar%C3%A9%20schermata%20skin.png?alt=media&token=35253d9d-7e56-4a86-802f-6a36a06d1085' }}
          style={styles.topImage}
        />
        <TouchableOpacity style={styles.sortButton} activeOpacity={1}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Frettangolo%20longilineo.png?alt=media&token=cbb49ff8-bc7b-4e3a-9003-b8b5c29e1147' }}
            style={styles.buttonImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {activeButton === 'skin' && (
          <View style={styles.skinContent}>
            {Array(7).fill().map((_, rowIndex) => (
              <View key={rowIndex} style={styles.skinRow}>
                {skinItems.slice(rowIndex * 3, (rowIndex + 1) * 3).map((item) => (
                  <View key={item.id} style={styles.skinWrapper}>
                    <ImageBackground source={{ uri: item.background }} style={styles.sfondi}>
                    </ImageBackground>
                    <Text style={styles.nome}>{item.name}</Text>
                    <Image source={{ uri: item.image }} style={styles.skinImage} />
                    <Text style={styles.classe}>{item.class}</Text>
                    <Image source={{ uri: item.rarity }} style={styles.rarity} />
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {activeButton === 'comic' && (
          <View style={styles.comicContent}>
            {comicItems.map((item) => (
              <View key={item.id} style={styles.comicItem}>
                <Image source={{ uri: item.cover }} style={styles.comicCover} />
                <Text style={styles.comicTitle}>{item.title}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const MapScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: 'https://example.com/path-to-your-image.png' }} // Sostituisci con l'URL dell'immagine
        style={styles.itemImage}
      />
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  // Genera un array di numeri da 1 a 100
  const data = Array.from({ length: 100 }, (_, index) => index + 1);

  return (
    <ImageBackground
    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fsfondo%20shop.png?alt=media&token=384318d8-0527-411d-a67c-0344b23fdedf' }} // Usa lo stesso sfondo di Home
    style={styles.background}
    resizeMode="cover"
  >
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.toString()}
      numColumns={2} // Mostra 2 colonne
    />
        </ImageBackground>

  );
};

const Home = () => {
  const [showMapScreen, setShowMapScreen] = useState(false);

  const toggleMapScreen = () => {
    setShowMapScreen((prev) => !prev);
  };

  if (showMapScreen) {
    return <MapScreen />; 
  }
  return (
    <ImageBackground
      source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fsfondo%20shop.png?alt=media&token=384318d8-0527-411d-a67c-0344b23fdedf' }}
      style={styles.page1}
      resizeMode="cover"
    >
      <View style={styles.mainContainer}>
        <Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Ftitolo.png?alt=media&token=2b91b8c6-7da2-4d47-993e-bf3b08eb8fdf' }}
          style={styles.titleImage}
          resizeMode="contain"
        />

        <View style={styles.buttonsRowTop}>
          <TouchableOpacity style={styles.rewardsButton} activeOpacity={1}>
            <Image
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Frewards%20icon.png?alt=media&token=c91aaa7c-2ad9-4461-9b6f-abbfe784aaf7' }}
              style={styles.buttonImageMenu}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.passiveButton} activeOpacity={1}>
            <Image
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fpassives%20icon.png?alt=media&token=cd878bca-2667-4165-a7e0-b1796948e073' }}
              style={styles.buttonImageMenu}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.newsButton} activeOpacity={1}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fnewspaper.png?alt=media&token=b12866ee-2794-4d62-9d4f-a59673182398' }}
            style={styles.buttonImageMenu}
          />
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton} activeOpacity={1}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Ftasto%20arancione%20semi%20ellittico.png?alt=media&token=f8d37105-4194-447e-8889-3513aedc6a1e' }}
            style={styles.playButtonImage}
          />
          <Text style={styles.playButtonText} activeOpacity={1}>Play</Text>
        </TouchableOpacity>

        <View style={styles.buttonsRowBottom}>
          <TouchableOpacity style={styles.itemsButton} activeOpacity={1}>
            <Image
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fitems%20icon%20V.2%202.png?alt=media&token=3e7ebce0-7fc1-45e6-ba3f-a89d0eb332f0' }}
              style={styles.buttonImageMenu}
            />
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.mapButton}
            activeOpacity={1}
            onPress={toggleMapScreen}>
            <Image
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Menu%20Icons%2Fmap%20icon.png?alt=media&token=99bc80b2-1369-4a8f-bfb0-53a3e56717a6' }}
              style={styles.buttonImageMenu}
            />
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.characterContainer}>
        <Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Characters%2FFartman.png?alt=media&token=0b63be39-b735-4a90-90f4-219e149767c0' }}
          style={styles.characterImage}
          resizeMode="contain"
        />
      </View>
    </ImageBackground>
  );
};

const ProgressBar = ({ progress, total }) => {
  const percentage = (progress / total) * 100;

  return (
    <View style={styles.progressContainer}>
      <View style={[styles.progress, { width: `${percentage}%` }]} />
      <Text style={styles.progressText}>{`${progress}/${total}`}</Text>
    </View>
  );
};

const Mission = () => {
  const [activeButton, setActiveButton] = useState('missions');

  const imageBehindSwitchAchievement = 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/MissionIcons%2Fskin%20targa%20missioni.png?alt=media&token=140de971-bc35-4dde-a2f9-e21b927f7f77';
  const imageBehindSwitchmission = 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/MissionIcons%2Fskin%20targa%20missioni.png?alt=media&token=140de971-bc35-4dde-a2f9-e21b927f7f77';

  const handleSwitchMissions = () => setActiveButton('missions');
  const handleSwitchAchievements = () => setActiveButton('achievements');

  const missionItems = [
    { id: 1, name: 'Mission 1', description: 'Completa 5 livelli', progress: 20, total: 50, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Mission 2', description: 'Raccogli 10 oggetti', progress: 10, total: 50, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Mission 3', description: 'Vinci 3 battaglie', progress: 35, total: 50, image: 'https://via.placeholder.com/150' },
  ];

  const achievementItems = [
    {
      id: 1,
      title: 'Beginner Collector (Level 1)',
      description: 'Collect 10 rare items to level up.',
      cover: 'https://via.placeholder.com/300x150', // URL immagine dell'achievement
      progress: 20,
      total: 50,
    },
    {
      id: 2,
      title: 'Master Explorer (Level 3)',
      description: 'Explore 5 new worlds to level up.',
      cover: 'https://via.placeholder.com/300x150',
      progress: 30,
      total: 100,
    },
    {
      id: 3,
      title: 'Skilled Warrior (Level 2)',
      description: 'Defeat 100 enemies to level up.',
      cover: 'https://via.placeholder.com/300x150',
      progress: 75,
      total: 150,
    },
    // Aggiungi altri achievement secondo necessità
  ];

  return (
    <ImageBackground
      source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fsfondo%20shop.png?alt=media&token=384318d8-0527-411d-a67c-0344b23fdedf' }}
      style={styles.page1}
      resizeMode="cover"
    >
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity style={styles.topButton} activeOpacity={1} onPress={handleSwitchMissions}>
          <Text style={styles.topButtonText}>Mission</Text>
          {activeButton === 'missions' && (
            <Image source={{ uri: imageBehindSwitchmission }} style={styles.backgroundImageMission} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.topButton} activeOpacity={1} onPress={handleSwitchAchievements}>
          <Text style={styles.topButtonText}>Achievement</Text>
          {activeButton === 'achievements' && (
            <Image source={{ uri: imageBehindSwitchAchievement }} style={styles.backgroundImageAchievement} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.imageButtonContainer}>
        <Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/MissionIcons%2Fsepar%C3%A9%20schermata%20missioni.png?alt=media&token=b40d4936-da6c-4863-97b8-6247e33f3969' }}
          style={styles.topImage}
        />
      </View>

      <View style={styles.missionContent}>
        {activeButton === 'missions' && (
          <View style={styles.missionContainer}>
            {missionItems.map((item) => (
              <View key={item.id} style={styles.missionWrapper}>
                <ImageBackground source={{ uri: item.image }} style={styles.missionBackground}>
                  <View style={styles.textContainer}>
                    <Text style={styles.missionName}>{item.name}</Text>
                    <Text style={styles.missionDescription}>{item.description}</Text>
                    <Text style={styles.missionDetails}>Dettagli</Text>
                    <ImageBackground
                      source={{ uri: 'https://via.placeholder.com/50' }}
                      style={styles.backgroundImage}
                    >
                      <Text style={styles.backgroundText}>Info</Text>
                    </ImageBackground>
                  </View>
                  <ProgressBar progress={item.progress} total={item.total} />
                </ImageBackground>
              </View>
            ))}
          </View>
        )}

        {activeButton === 'achievements' && (
          <ScrollView contentContainerStyle={styles.achievementScrollContainer} showsVerticalScrollIndicator={false}>
            {achievementItems.map((item) => (
              <View key={item.id} style={styles.achievementWrapper}>
                <ImageBackground source={{ uri: item.cover }} style={styles.achievementBackground}>
                  <View style={styles.achievementTextContainer}>
                    <Text style={styles.achievementName}>{item.title}</Text>
                    <Text style={styles.achievementDescription}>{item.description}</Text>
                    <Text style={styles.achievementDetails}>More Info</Text>
                  </View>
                  <View style={styles.achievementProgressBarContainer}>
                    <View style={[styles.achievementProgressBar, { width: `${(item.progress / item.total) * 100}%` }]} />
                    <Text style={styles.achievementProgressText}>{`${item.progress}/${item.total}`}</Text>
                  </View>
                </ImageBackground>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </ImageBackground>
  );
};

const User = () => <View style={[styles.page, { backgroundColor: '#fff' }]} />;

const pages = [<Shop />, <Skin />, <Home />, <Mission />, <User />];

const imageUrls = [
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Navigation%20Bar%20Icons%2Ftoilettatura.png?alt=media&token=ba9f3b7e-01ef-4c35-9874-c5f2f1061ecd',
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Navigation%20Bar%20Icons%2Fpersonaggi%20icona%20men%C3%B9.png?alt=media&token=b45e969a-7a86-4b71-a0f4-399a001587f6',
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Navigation%20Bar%20Icons%2Fhome%20simbolo.png?alt=media&token=25ccbe53-120e-4ca1-be13-45f2deee520b',
  'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Navigation%20Bar%20Icons%2Frotolo%20missione.png?alt=media&token=1badebd8-2727-4840-a03f-2e7aa3c1105a',
  'https://via.placeholder.com/150/FFFFFF/000000?text=5',
];
const ItemComponent = React.memo(({ item }) => {
  return (
    <View style={styles.pageContainer}>
      {item}
    </View>
  );
});

const App = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(2);
  const [activeIndex, setActiveIndex] = useState(2);
  const scrollX = useRef(new Animated.Value(0)).current;

  const scaleValues = useRef(imageUrls.map(() => new Animated.Value(1))).current;
  const translateYValues = useRef(imageUrls.map(() => new Animated.Value(0))).current;

  const onViewRef = useRef(({ viewableItems, changed }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;

      setCurrentIndex(newIndex);
      setActiveIndex(newIndex);

      // Utilizziamo setTimeout per assicurarci che lo stato sia aggiornato prima di loggare
      setTimeout(() => {
        console.log('--- Scroll Debug Info ---');
        console.log('Viewable Items:', viewableItems.map(item => ({ index: item.index, key: item.key })));
        console.log('Changed:', changed.map(item => ({ index: item.index, key: item.key, isViewable: item.isViewable })));
        console.log('New Index:', newIndex);
        console.log('Current Index:', newIndex);
        console.log('Active Index:', newIndex);
        console.log('------------------------');
      }, 0);

      animateIcons(newIndex);
    }
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const goToPage = (index) => {
    console.log('goToPage called with index:', index);
    flatListRef.current?.scrollToIndex({ index, animated: false });
    setCurrentIndex(index);
    setActiveIndex(index);
    animateIcons(index);
  };

  const animateIcons = (selectedIndex) => {
    const animations = imageUrls.map((_, index) => {
      const isSelected = index === selectedIndex;

      return Animated.sequence([
        Animated.parallel([
          // Ingrandimento iniziale e rimbalzo verso l'alto
          Animated.timing(scaleValues[index], {
            toValue: isSelected ? 1.6 : 1,  // Più grande se selezionato
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(translateYValues[index], {
            toValue: isSelected ? -20 : 0,  // Rimbalzo verso l'alto
            duration: 300,
            friction: 3.5,
            useNativeDriver: true,
          }),
        ]),
        // Effetto rimbalzo (riduzione temporanea)
        Animated.timing(scaleValues[index], {
          toValue: isSelected ? 1.3 : 1,  // Riduci leggermente dopo l'espansione
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValues[index], {
          toValue: isSelected ? 1.6 : 1,  // Mantieni la dimensione più grande
          duration: 100,
          useNativeDriver: true,
        }),
      ]);
    });

    // Esegui tutte le animazioni in parallelo
    Animated.parallel(animations).start();
  };

  useEffect(() => {
    console.log('State Updated - Current Index:', currentIndex, 'Active Index:', activeIndex);
  }, [currentIndex, activeIndex]);

  const getInterpolatedScale = (index) => {
    return scrollX.interpolate({
      inputRange: [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
      ],
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });
  };

  const getInterpolatedTranslateY = (index) => {
    return scrollX.interpolate({
      inputRange: [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
      ],
      outputRange: [0, -20, 0],
      extrapolate: 'clamp',
    });
  };

  const getItemLayout = (data, index) => ({
    length: width,
    offset: width * index,
    index,
  });

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: 2, animated: false });
    }
  }, []);



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fbarra%20in%20alto%20schermata.png?alt=media&token=f05f1f2d-2286-41b3-9fa8-fe350d0dbe6e' }}
          style={styles.topImage}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.button} activeOpacity={1}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2FGreenButton.png?alt=media&token=859bade4-78bf-47ec-b3fd-88d486c37e97' }}
            style={styles.buttonImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <Animated.FlatList
        data={pages}
        renderItem={({ item, index }) => (
          <View style={styles.pageContainer}>
            {item}
          </View>
        )}
        horizontal
        pagingEnabled
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        keyExtractor={(item, index) => `page_${index}`}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onViewableItemsChanged={onViewRef}
        viewabilityConfig={viewConfigRef.current}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
      <Image
        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fartclciker.appspot.com/o/Icons%2Fbarra%20in%20basso.png?alt=media&token=62e385a2-831b-4421-aa8a-cfa55d3c7392' }}
        style={styles.bottomImage}
        resizeMode="cover"
      />
      <View style={styles.indicatorContainer}>
        {imageUrls.map((url, index) => {
          const scale = scaleValues[index];
          const translateY = translateYValues[index];
          const buttonContainerStyle = [
            styles.buttonContainer,
            index === 4 && { borderRightWidth: 0 }, // Se l'index è 5, borderRightWidth diventa 0
          ];
          return (
            <TouchableOpacity key={index} onPress={() => goToPage(index)}  style={buttonContainerStyle} activeOpacity={1}>
              <Animated.View
                style={{
                  transform: [
                    { scale: scale },  // Usa il valore animato per la scala
                    { translateY: translateY },  // Usa il valore animato per il rimbalzo verticale
                  ],
                }}
              >
                <Image
                  source={{ uri: url }}
                  style={styles.indicator}
                  resizeMode="contain"
                />
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    position: 'relative',
    width: '100%',
    height: 60, // Adjust height as needed
  },
  topImage: {
    width: '100%',
    height: '100%', // Full height of the top container
  },
  button: {
    position: 'absolute',
    right: 16, // Adjust padding to position the button
    top: '50%', // Center vertically within the image
    transform: [{ translateY: -25 }], // Adjust to center based on button size
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
  page: {
    width: width,
    height: height,
  },
  page1: {
    width: width,
    height: height,
  },
  bottomImage: {
    width: '100%', // Full width of the screen
    height: 90, // Adjust height as needed
  },
  rectangle: {
    width: '400vh',
    height: '350vh',
    backgroundColor: '#ffb57a',
    borderWidth: 15,
    borderColor: '#f9923e',
    position: 'relative',
    top: '50%',
    transform: [{ translateY: -500 }],
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  imageWrapper: {
    backgroundColor: '#ffd3ae',
    width: '30%',
    aspectRatio: 1,
    marginBottom: 50,
    alignItems: 'center',
  },
  shopImage: {
    width: '100%',
    height: '100%',
  },
  shopButton: {
    position: 'relative',
    bottom: 30,
    height: '80%',
    width: '70%',
  },
  shopButtonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  indicator: {
    width: 55,
    height: 60,
    marginHorizontal: 10,
  },
  buttonContainer: {
    paddingRight: 0,
    borderRightWidth: 4,
    borderRightColor: '#fff',
  },

  newImage: {
    width: 350, // Imposta la larghezza desiderata
    height: 350, // Imposta l'altezza desiderata
    resizeMode: 'contain', // Mantieni il rapporto di aspetto
  },
  rotatedText: {
    fontSize: 40, // Imposta la dimensione del testo
    color: 'white',
    transform: [{ rotate: '-3.3deg' }], // Ruota il testo di 30 gradi
    marginVertical: 10, // Spazio verticale intorno al testo
    position: 'absolute',
    fontFamily: 'Tricky Jimmy',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  LimitedOffer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  Timer: {
    width: 50, // Imposta la larghezza desiderata per l'altra immagine
    height: 50, // Imposta l'altezza desiderata per l'altra immagine
    position: 'absolute',
    left: 0, // Posiziona a sinistra
    bottom: 90, // Posiziona in basso
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 500, // Aggiungi uno spazio di fondo per evitare che l'ultimo contenuto sia nascosto
  },
  shopButtonText: {
    top: '38%',
    width: '100%',
    position: 'absolute',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Tricky Jimmy',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  topRightText: {
    position: 'absolute',
    top: -15, // Puoi modificare questo valore in base a dove vuoi posizionare il testo
    right: -15, // Posiziona il testo in alto a destra
    color: '#fff', // Colore del testo
    fontSize: 18, // Dimensione del testo
    fontFamily: 'Tricky Jimmy',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1, // Stile grassetto
    textShadowColor: 'orange', // Colore dell'ombra (che simula il bordo)
    textShadowOffset: { width: 1, height: 1 }, // Offset dell'ombra
    textShadowRadius: 4,
    padding: 5, // Padding interno per il testo
    borderRadius: 5, // Bordo arrotondato per l'estetica
  },

  zigzagImage: {
    position: 'absolute',
    width: width,  // Usa la larghezza dello schermo
    height: height,  // Usa l'altezza dello schermo
    resizeMode: 'cover',  // Assicura che l'immagine copra l'intera area
  },
  animatedBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
  imageButtonContainer: {
    position: 'relative',
    width: '100%', // Larghezza totale
    height: 200, // Imposta un'altezza desiderata per il contenitore
    alignItems: 'center',
  },
  topImage: {
    width: '100%',
    height: '100%', // Immagine di sfondo a piena larghezza e altezza del contenitore
  },
  sortButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 45,
    width: '45%', // Larghezza del bottone
    height: '150%', // Altezza del bottone
  },

  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    zIndex: 2,
    position: 'absolute',
    top: 20,
  },
  topButton: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topButtonText: {
    top: 0,
    color: '#FFF', // Colore del testo del bottone
    fontSize: 25,
    fontFamily: 'Tricky Jimmy',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    padding: 4,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'contain',
    transform: [{ scale: 3.8 }],
    zIndex: -1,
  },
  backgroundImage2: {
    position: 'absolute',
    resizeMode: 'contain',
    zIndex: -1,
    width: '100%',
    height: '100%',
    transform: [{ scale: 2.9 }],
  },
  skinContent: {
    marginTop: 20,
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  comicContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  comicItem: {
    width: '45%',
    marginBottom: 20,
    alignItems: 'center',
  },
  comicCover: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 10,
  },
  comicTitle: {
    marginTop: 5,
    fontSize: 22,
    fontFamily: 'Tricky Jimmy',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    color: '#fff',
    textAlign: 'center',
  },
  skinRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  skinWrapper: {
    right: '3%',
    width: '30%',
    aspectRatio: 1,
  },
  rarity: {
    width: '122%',
    height: '139%',
    resizeMode: 'contain',
    position: 'absolute',
  },
  sfondi: {
    position: 'absolute',
    top: '5%',
    left: '20%',
    width: '90%',
    height: '110%',
  },
  nome: {
    top: '5%',
    left: '20%',
    color: '#fff',
    fontSize: 16,
    zIndex: 1,
    fontFamily: 'Tricky Jimmy',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    color: '#fff',
  },
  skinImage: {
    width: '119%',
    height: '119%',
    resizeMode: 'contain',
  },
  classe: {
    position: 'absolute',
    top: '120%',
    left: '20%',
    fontSize: 11,
    fontFamily: 'Tricky Jimmy',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    color: '#fff',
    zIndex: 1,
  },
  mainContainer: {
    width: '100%',
    height: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  titleImage: {
    width: '300%',
    height: '20%',
    resizeMode: 'cover',
  },
  buttonsRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  passiveButton: {
    alignItems: 'flex-end',
  },
  rewardsButton: {
    alignItems: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Tricky Jimmy',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  buttonImageMenu: {
    width: 50,
    height: 50,
  },
  newsButton: {
    alignSelf: 'flex-start',
  },
  characterContainer: {
    position: 'absolute',
    top: '35%',
    left: '18%',
  },
  characterImage: {
    width: 250,
    height: 250,
  },
  playButton: {
    top: '13%',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '200%',
    height: '15%',
  },
  playButtonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  playButtonText: {
    position: 'absolute',
    color: '#fff',
    fontSize: 50,
    fontFamily: 'Tricky Jimmy',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonsRowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  itemsButton: {
    alignItems: 'flex-start',
  },
  mapButton: {
    alignItems: 'flex-end',
  },
  missionContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0,
  },
  missionWrapper: {
    marginBottom: 40,
  },
  missionBackground: {
    padding: 15,
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  textContainer: {
    marginBottom: 10,
  },
  missionName: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Tricky Jimmy',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  missionDescription: {
    fontSize: 14,
    fontFamily: 'Tricky Jimmy',
  },
  missionDetails: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'Tricky Jimmy',
  },

  backgroundText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Tricky Jimmy',
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
    backgroundColor: '#3b5998', // Cambia il colore della barra
  },
  progressText: {
    fontFamily: 'Tricky Jimmy',
    position: 'absolute',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 15,
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
  backgroundImageMission: {
    bottom: '14%',
    position: 'absolute',
    resizeMode: 'contain',
    zIndex: -1,
    width: '100%',
    height: '100%',
    transform: [{ scale: 2 }],
  },
  backgroundImageAchievement: {
    position: 'absolute',
    resizeMode: 'contain',
    zIndex: -1,
    width: '100%',
    height: '100%',
    transform: [{ scale: 2.35 }],
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
    fontFamily: 'Tricky Jimmy',
  },
  achievementName: {
    fontSize: 21,
    fontFamily: 'Tricky Jimmy',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    color: '#fff',
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Tricky Jimmy',
    color: '#444',
  },
  achievementDetails: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'Tricky Jimmy',
  },

  achievementProgressBarContainer: {
    height: 15,
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginTop: 5,
    position: 'relative',
    fontFamily: 'Tricky Jimmy',
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
    fontSize: 18,
    fontFamily: 'Tricky Jimmy',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    position: 'relative',
  },
  itemImage: {
    width: 100,
    height: 100, // Dimensioni dell'immagine
  },
  itemText: {
    position: 'absolute',
    color: 'white', // Colore del testo
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;


