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

  const styles = ScaledSheet.create({
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
    scrollContainer: {
        alignItems: 'center',
        paddingBottom: 220,
    },
    imageButtonContainer: {
      position: 'relative',
      width: width,
      height: '175@s',
      alignItems: 'center',
    },
    topImage: {
      resizeMode: 'contain',
      width: width,
      height: '300@s',
      bottom: '61.5@s',
    },
    sortButton: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      right: 45,
      width: '45%',
      height: '150%',
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
      alignItems: 'center',
      justifyContent: 'center',
    },
    topButtonText: {
      top: 0,
      color: '#FFF',
      fontSize: 25,
      fontFamily: 'Chubby Cheeks',
      textShadowColor: 'black',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 1,
      padding: 7,
    },
    backgroundImage: {
      width: '150@s',
      height: '150@s',
      position: 'absolute',
      resizeMode: 'contain',
      zIndex: -1,
    },
    backgroundImage2: {
      position: 'absolute',
      resizeMode: 'contain',
      zIndex: -1,
      width: '150@s',
      height: '150@s',
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
      fontFamily: 'Chubby Cheeks',
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
      fontFamily: 'Chubby Cheeks',
      textShadowColor: 'black',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 1,
      color: '#fff',
    },
    skinImage: {
      width: '119%',
      height: '119%',
      resizeMode: 'contain',
      bottom: '10@s',
    },
    classe: {
      position: 'absolute',
      top: '120%',
      left: '20%',
      fontSize: 11,
      fontFamily: 'Chubby Cheeks',
      textShadowColor: 'black',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1,
      color: '#fff',
      zIndex: 1,
    },
  });
export default Skin;