//orbiz main intro screen

import Sound from 'react-native-sound';

import CustomRoundButton from '../[treatbraincmppnts]/CustomRoundButton';
import CustomMenuButton from '../[treatbraincmppnts]/CustomMenuButton';
import { BlurView } from '@react-native-community/blur';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useOrbizTreatStore } from '../[treatbrainstoragge]/orbizTreatContext';
import Toast from 'react-native-toast-message';
import {
  Animated,
  Image,
  ImageBackground,
  Linking,
  Modal,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Orientation from 'react-native-orientation-locker';

const BG = require('../../assets/orbizImages/orbizMainBack.png');

const MainScreen = () => {
  const [showRules, setShowRules] = useState(false);
  const nav = useNavigation();
  const {
    isEnabledMusic,
    setIsEnabledMusic,
    isEnabledNotifications,
    setIsEnabledNotifications,
  } = useOrbizTreatStore();

  const [orbizMusIdx, setOrbizMusIdx] = useState(0);
  const [sound, setSound] = useState(null);
  const orbPartyBtnScale = useRef(new Animated.Value(1)).current;
  const sequenceLabBtnScale = useRef(new Animated.Value(1)).current;
  const achievementsBtnScale = useRef(new Animated.Value(1)).current;
  const leadersBtnScale = useRef(new Animated.Value(1)).current;
  const rulesBtnScale = useRef(new Animated.Value(1)).current;
  const soundBtnScale = useRef(new Animated.Value(1)).current;
  const shareBtnScale = useRef(new Animated.Value(1)).current;
  const notifBtnScale = useRef(new Animated.Value(1)).current;
  const closeRulesBtnScale = useRef(new Animated.Value(1)).current;
  const orbizTracksCycle = [
    'ambient-piano-and-strings-10711.mp3',
    'ambient-piano-and-strings-10711.mp3',
  ];

  useFocusEffect(
    useCallback(() => {
      Platform.OS === 'android' && Orientation.lockToPortrait();
      return () => Orientation.unlockAllOrientations();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      loadOrbizMusic();
      loadOrbizNotifications();
    }, []),
  );

  useEffect(() => {
    playOrbizMusic(orbizMusIdx);

    return () => {
      if (sound) {
        sound.stop(() => {
          sound.release();

          console.log('sound release!');
        });
      }
    };
  }, [orbizMusIdx]);

  const playOrbizMusic = index => {
    if (sound) {
      sound.stop(() => {
        sound.release();
      });
    }

    const orbizTrackPath = orbizTracksCycle[index];

    const newOrbizGameSound = new Sound(
      orbizTrackPath,

      Sound.MAIN_BUNDLE,

      error => {
        if (error) {
          console.log('Error =>', error);
          return;
        }

        newOrbizGameSound.play(success => {
          if (success) {
            setOrbizMusIdx(
              prevIndex => (prevIndex + 1) % orbizTracksCycle.length,
            );
          } else {
            console.log('Error =>');
          }
        });
        setSound(newOrbizGameSound);
      },
    );
  };

  useEffect(() => {
    const setVolumeGameMusic = async () => {
      try {
        const orbizMusicValue = await AsyncStorage.getItem('toggleOrbizSound');

        const isOrbizMusicOn = JSON.parse(orbizMusicValue);
        setIsEnabledMusic(isOrbizMusicOn);
        if (sound) {
          sound.setVolume(isOrbizMusicOn ? 1 : 0);
        }
      } catch (error) {
        console.error('Error =>', error);
      }
    };

    setVolumeGameMusic();
  }, [sound]);

  useEffect(() => {
    if (sound) {
      sound.setVolume(isEnabledMusic ? 1 : 0);
    }
  }, [isEnabledMusic]);

  const loadOrbizMusic = async () => {
    try {
      const orbizMusicValue = await AsyncStorage.getItem('toggleOrbizSound');
      const isOrbizMusicOn = JSON.parse(orbizMusicValue);
      setIsEnabledMusic(isOrbizMusicOn);

      console.log('success!');
    } catch (error) {
      console.error('Error loading settings =>', error);
    }
  };

  const loadOrbizNotifications = async () => {
    try {
      const orbizNotificationValue = await AsyncStorage.getItem(
        'toggleOrbizNotifications',
      );
      if (orbizNotificationValue !== null) {
        const isOrbizNotificationOn = JSON.parse(orbizNotificationValue);
        setIsEnabledNotifications(isOrbizNotificationOn);

        console.log('success!');
      }
    } catch (error) {
      console.error('Error!', error);
    }
  };

  const toggleNotifications = async notifValue => {
    Toast.show({
      text1: !isEnabledNotifications
        ? 'Notifications turned on!'
        : 'Notifications turned off!',
    });

    try {
      await AsyncStorage.setItem(
        'toggleOrbizNotifications',
        JSON.stringify(notifValue),
      );
      setIsEnabledNotifications(notifValue);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const toggleSound = async soundValue => {
    isEnabledNotifications &&
      Toast.show({
        text1: !isEnabledMusic
          ? 'Background music turned on!'
          : 'Background music turned off!',
      });

    try {
      await AsyncStorage.setItem(
        'toggleOrbizSound',
        JSON.stringify(soundValue),
      );

      setIsEnabledMusic(soundValue);
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  const handleShare = () => {
    Share.share({
      message:
        'Check out Orbiz Treat Brain Rush! A fun and fast-paced word challenge game. Download it now!',
    });
  };

  const shareApp = () => {
    Linking.openURL(
      'https://apps.apple.com/us/app/sweet-brain-rush-orbiz/id6760341621',
    );
  };

  const openLeaders = () => nav.navigate('LeaderboardScreen');

  const animatePressIn = scaleValue => {
    Animated.spring(scaleValue, {
      toValue: 0.94,
      useNativeDriver: true,
      friction: 8,
      tension: 120,
    }).start();
  };

  const animatePressOut = scaleValue => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      friction: 7,
      tension: 100,
    }).start();
  };

  return (
    <ImageBackground source={BG} style={{ flex: 1, resizeMode: 'cover' }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={st.orbizBox}>
          <View>
            <Image
              source={require('../../assets/orbizImages/orbztrtohomel.png')}
              style={{
                marginBottom: 20,
                alignSelf: 'center',
                width: 290,
                height: 160,
              }}
            />

            <ImageBackground
              source={require('../../assets/orbizUi/homeMenuBoard.png')}
              style={st.orbizBoard}
              resizeMode="stretch"
            >
              <View style={st.mainButtonsWrap}>
                <Animated.View
                  style={{ transform: [{ scale: orbPartyBtnScale }] }}
                >
                  <CustomMenuButton
                    onPress={() => nav.navigate('OrbizTreatGame')}
                    onPressIn={() => animatePressIn(orbPartyBtnScale)}
                    onPressOut={() => animatePressOut(orbPartyBtnScale)}
                    btnText="Orb Party Mode"
                    width={169}
                    height={53}
                  />
                </Animated.View>

                <Animated.View
                  style={{ transform: [{ scale: sequenceLabBtnScale }] }}
                >
                  <CustomMenuButton
                    onPress={() => nav.navigate('SequenceLabScreen')}
                    onPressIn={() => animatePressIn(sequenceLabBtnScale)}
                    onPressOut={() => animatePressOut(sequenceLabBtnScale)}
                    btnText="Sequence Lab"
                    width={169}
                    height={53}
                  />
                </Animated.View>

                <Animated.View
                  style={{ transform: [{ scale: achievementsBtnScale }] }}
                >
                  <CustomMenuButton
                    onPress={() => nav.navigate('OrbizTreatAchievements')}
                    onPressIn={() => animatePressIn(achievementsBtnScale)}
                    onPressOut={() => animatePressOut(achievementsBtnScale)}
                    btnText="Achievements"
                    width={128}
                    height={40}
                    textSize={15}
                  />
                </Animated.View>

                <Animated.View
                  style={{ transform: [{ scale: leadersBtnScale }] }}
                >
                  <CustomMenuButton
                    onPress={openLeaders}
                    onPressIn={() => animatePressIn(leadersBtnScale)}
                    onPressOut={() => animatePressOut(leadersBtnScale)}
                    btnText="Leaders"
                    width={128}
                    height={40}
                    textSize={15}
                  />
                </Animated.View>

                <Animated.View
                  style={{ transform: [{ scale: rulesBtnScale }] }}
                >
                  <CustomMenuButton
                    onPress={() => setShowRules(true)}
                    onPressIn={() => animatePressIn(rulesBtnScale)}
                    onPressOut={() => animatePressOut(rulesBtnScale)}
                    btnText="Orb Party Rules"
                    width={128}
                    height={40}
                    textSize={15}
                  />
                </Animated.View>
              </View>
            </ImageBackground>

            <View style={st.bottomButtonsWrap}>
              {Platform.OS !== 'android' && (
                <Animated.View
                  style={{ transform: [{ scale: soundBtnScale }] }}
                >
                  <CustomRoundButton
                    onPress={() => toggleSound(!isEnabledMusic)}
                    onPressIn={() => animatePressIn(soundBtnScale)}
                    onPressOut={() => animatePressOut(soundBtnScale)}
                    btnImage={
                      isEnabledMusic
                        ? require('../../assets/orbizImages/orbizMusicOff.png')
                        : require('../../assets/orbizImages/inactiveSound.png')
                    }
                  />
                </Animated.View>
              )}

              <Animated.View style={{ transform: [{ scale: shareBtnScale }] }}>
                <CustomRoundButton
                  onPress={Platform.OS === 'ios' ? shareApp : handleShare}
                  onPressIn={() => animatePressIn(shareBtnScale)}
                  onPressOut={() => animatePressOut(shareBtnScale)}
                  btnImage={require('../../assets/orbizImages/orbizShare.png')}
                />
              </Animated.View>

              <Animated.View style={{ transform: [{ scale: notifBtnScale }] }}>
                <CustomRoundButton
                  onPress={() => toggleNotifications(!isEnabledNotifications)}
                  onPressIn={() => animatePressIn(notifBtnScale)}
                  onPressOut={() => animatePressOut(notifBtnScale)}
                  btnImage={
                    isEnabledNotifications
                      ? require('../../assets/orbizImages/orbizNotif.png')
                      : require('../../assets/orbizImages/inactivNotf.png')
                  }
                />
              </Animated.View>
            </View>
          </View>
        </View>

        <Image
          source={require('../../assets/orbizImages/homeBubble1.png')}
          style={{ position: 'absolute', left: 0, top: 0 }}
        />
        <Image
          source={require('../../assets/orbizImages/homeBubble2.png')}
          style={{ position: 'absolute', right: 0, top: 90 }}
        />
        <Image
          source={require('../../assets/orbizImages/homeBubble3.png')}
          style={{ position: 'absolute', left: 0, top: 290 }}
        />
        <Image
          source={require('../../assets/orbizImages/homeBubble4.png')}
          style={{ position: 'absolute', right: 30, bottom: 30 }}
        />

        <Modal
          transparent={true}
          animationType="fade"
          visible={showRules}
          statusBarTranslucent={Platform.OS === 'android'}
        >
          <View style={st.modalBackdrop}>
            <BlurView
              blurType="light"
              blurAmount={1}
              style={{ position: 'absolute', width: '100%', height: '100%' }}
            />
            {Platform.OS === 'android' ? null : (
              <Image
                source={require('../../assets/orbizImages/orbztrtoruls.png')}
                style={{ top: 10, zIndex: 1 }}
              />
            )}

            <ImageBackground
              source={require('../../assets/orbizUi/homeMenuBoard.png')}
              style={st.orbizRulesBoard}
              resizeMode="stretch"
            >
              <Animated.View
                style={[
                  { position: 'absolute', top: 40, right: 40 },
                  { transform: [{ scale: closeRulesBtnScale }] },
                ]}
              >
                <TouchableOpacity
                  onPress={() => setShowRules(false)}
                  onPressIn={() => animatePressIn(closeRulesBtnScale)}
                  onPressOut={() => animatePressOut(closeRulesBtnScale)}
                >
                  <Image
                    source={require('../../assets/orbizImages/closeIcon.png')}
                  />
                </TouchableOpacity>
              </Animated.View>
              <View>
                <Text style={st.orbizRulesTxt}>Orb Party Rules</Text>
                <Text style={st.orbizRulesSub}>
                  This is a fast party word-challenge game. You get a task and
                  must name 3, 4, or 5 things depending on the difficulty. Easy
                  gives 1 point, Medium gives 2 points, Hard gives 3 points.
                  Play in two modes: choose the difficulty yourself or let the
                  random mode pick it for you. Score points, compete with
                  friends, and see who wins.
                </Text>
              </View>
            </ImageBackground>
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
  );
};

const st = StyleSheet.create({
  orbizBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 16,
    paddingTop: Platform.OS === 'ios' ? 42 : 26,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 14,
  },
  logoTextTop: {
    fontSize: 56,
    lineHeight: 58,
    color: '#FFB100',
    textAlign: 'center',
    fontFamily: 'Sansation-Bold',
    textShadowColor: '#5D0BAA',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 0,
  },
  logoTextMid: {
    fontSize: 54,
    lineHeight: 56,
    color: '#7A2BFF',
    textAlign: 'center',
    fontFamily: 'Sansation-Bold',
    textShadowColor: '#4F0A9D',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 0,
  },
  logoTextBottom: {
    fontSize: 50,
    lineHeight: 52,
    color: '#FF9C00',
    textAlign: 'center',
    fontFamily: 'Sansation-Bold',
    textShadowColor: '#57118F',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 0,
  },
  orbizBoard: {
    width: 335,
    height: 430,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainButtonsWrap: {
    gap: 16,
    alignItems: 'center',
  },
  bottomButtonsWrap: {
    top: -34,
    gap: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  orbizRulesBoard: {
    width: 381,
    height: 457,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbizRulesTxt: {
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Sansation-Bold',
    marginBottom: 20,
  },
  orbizRulesSub: {
    fontSize: 17,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Sansation-Regular',
    fontStyle: 'italic',
    paddingHorizontal: 42,
    lineHeight: 25,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainScreen;
