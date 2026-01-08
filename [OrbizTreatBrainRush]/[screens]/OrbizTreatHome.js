import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomRoundButton from '../[components]/CustomRoundButton';
import CustomMenuButton from '../[components]/CustomMenuButton';
import { BlurView } from '@react-native-community/blur';
import { useOrbizTreatStore } from '../[storage]/orbizTreatContext';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sound from 'react-native-sound';

const OrbizTreatHome = () => {
  const [isCurrentViewIndex, setIsCurrentViewIndex] = useState(0);
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
  const orbizTracksCycle = [
    'ambient-piano-and-strings-10711.mp3',
    'ambient-piano-and-strings-10711.mp3',
  ];

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

  const onNextPress = () => {
    isCurrentViewIndex < 3
      ? setIsCurrentViewIndex(isCurrentViewIndex + 1)
      : nav.navigate('OrbizTreatHome');
  };

  return (
    <ImageBackground
      source={require('../../assets/orbizImages/orbizMainBack.png')}
      style={{ flex: 1, resizeMode: 'cover' }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={st.orbizBox}>
          <View>
            <ImageBackground
              source={require('../../assets/orbizUi/homeMenuBoard.png')}
              style={st.orbizBoard}
              resizeMode="stretch"
            >
              <View style={{ gap: 20 }}>
                <CustomMenuButton
                  onPress={() => nav.navigate('OrbizTreatGame')}
                  btnText="Play"
                />

                <CustomMenuButton
                  onPress={() => setShowRules(true)}
                  btnText="Rules"
                />

                <CustomMenuButton
                  onPress={() => nav.navigate('OrbizTreatAchievements')}
                  btnText="Achievements"
                />
              </View>
            </ImageBackground>

            <View style={st.bottomButtonsWrap}>
              <CustomRoundButton
                onPress={() => toggleSound(!isEnabledMusic)}
                btnImage={
                  isEnabledMusic
                    ? require('../../assets/orbizImages/orbizMusicOff.png')
                    : require('../../assets/orbizImages/inactiveSound.png')
                }
              />

              <CustomRoundButton
                onPress={onNextPress}
                btnImage={require('../../assets/orbizImages/orbizShare.png')}
              />

              <CustomRoundButton
                onPress={() => toggleNotifications(!isEnabledNotifications)}
                btnImage={
                  isEnabledNotifications
                    ? require('../../assets/orbizImages/orbizNotif.png')
                    : require('../../assets/orbizImages/inactivNotf.png')
                }
              />
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

        <Modal transparent={true} animationType="fade" visible={showRules}>
          <View style={st.modalBackdrop}>
            <BlurView
              blurType="dark"
              blurAmount={1}
              style={{ position: 'absolute', width: '100%', height: '100%' }}
            />
            <Image
              source={require('../../assets/orbizImages/oboardimg1.png')}
              style={{ top: 10, zIndex: 1 }}
            />

            <ImageBackground
              source={require('../../assets/orbizUi/homeMenuBoard.png')}
              style={st.orbizRulesBoard}
              resizeMode="stretch"
            >
              <TouchableOpacity
                style={{ position: 'absolute', top: 40, right: 40 }}
                onPress={() => setShowRules(false)}
              >
                <Image
                  source={require('../../assets/orbizImages/closeIcon.png')}
                />
              </TouchableOpacity>
              <View>
                <Text style={st.orbizRulesTxt}>Game Rules</Text>
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
    paddingBottom: 30,
    paddingTop: 20,
  },
  orbizBoard: {
    width: 345,
    height: 430,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonsWrap: {
    top: -40,
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
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Sansation-Regular',
    fontStyle: 'italic',
    paddingHorizontal: 25,
    lineHeight: 24,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor:
      Platform.OS === 'android' ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrbizTreatHome;
