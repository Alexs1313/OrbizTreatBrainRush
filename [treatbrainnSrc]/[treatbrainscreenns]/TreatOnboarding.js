// onboarding screen

import {
  Animated,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';

const TreatOnboarding = () => {
  const [isCurrentViewIndex, setIsCurrentViewIndex] = useState(0);
  const nav = useNavigation();
  const buttonScale = useRef(new Animated.Value(1)).current;

  const BG = require('../../assets/orbizImages/orbizMainBack.png');

  const orbizViews = [
    {
      orbizttl: 'Orb Party Mode — Play Together',
      orbizdesc:
        'Challenge your friends in fast rounds where everyone thinks quickly and votes for the correct answer.',
      orbizimg:
        Platform.OS === 'ios'
          ? require('../../assets/orbizImages/oboardimg2.png')
          : require('../../assets/orbizImages/icon.png'),
    },
    {
      orbizttl: 'Sequence Lab — Solo Mode',
      orbizdesc:
        'Test your logic and focus by finding the odd item in each sequence before time runs out.',
      orbizimg: require('../../assets/orbizImages/oboardimg1.png'),
    },
    {
      orbizttl: 'Every Round Is Timed',
      orbizdesc:
        'Both modes are fast-paced, giving you only a limited time to think and answer.',
      orbizimg: require('../../assets/orbizImages/oboardimg3.png'),
    },
    {
      orbizttl: 'Unlock Achievements',
      orbizdesc:
        'A system of achievements with progress bars helps you track your progress as you play.',
      orbizimg: require('../../assets/orbizImages/oboardimg4.png'),
    },
    {
      orbizttl: 'Climb the Leaderboard',
      orbizdesc:
        'Track the best scores in Party Mode and Sequence Lab and see how high you can climb.',
      orbizimg: require('../../assets/orbizImages/oboardimg5.png'),
    },
  ];

  const onNextPress = () => {
    isCurrentViewIndex < 4
      ? setIsCurrentViewIndex(isCurrentViewIndex + 1)
      : nav.navigate('MainScreen');
  };

  const animateButtonPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
      friction: 8,
      tension: 120,
    }).start();
  };

  const animateButtonPressOut = () => {
    Animated.spring(buttonScale, {
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
      >
        <View style={st.orbizBox}>
          <View>
            <Image
              source={orbizViews[isCurrentViewIndex].orbizimg}
              resizeMode="contain"
              style={[
                isCurrentViewIndex === 0 && { marginBottom: 30 },
                isCurrentViewIndex === 1 && { marginBottom: 50 },
                isCurrentViewIndex === 3 && { marginBottom: 30 },
                isCurrentViewIndex === 4 && { marginBottom: 20 },
                Platform.OS === 'android' && {
                  width: 240,
                  height: 240,
                  borderRadius: 70,
                },
              ]}
            />
            {isCurrentViewIndex === 1 && (
              <>
                <Image
                  source={require('../../assets/orbizImages/bubble1.png')}
                  style={{ position: 'absolute', right: -140, top: 100 }}
                />
                <Image
                  source={require('../../assets/orbizImages/bubble2.png')}
                  style={{ position: 'absolute', left: -50, top: -80 }}
                />
              </>
            )}
          </View>
          <View>
            <ImageBackground
              source={require('../../assets/orbizUi/orbizBoard.png')}
              style={st.orbizBoard}
            >
              <View style={{ paddingHorizontal: 20 }}>
                <Text style={st.orbizTxt}>
                  {orbizViews[isCurrentViewIndex].orbizttl}
                </Text>
                <Text style={st.orbizSecTxt}>
                  {orbizViews[isCurrentViewIndex].orbizdesc}
                </Text>
              </View>
            </ImageBackground>

            <Animated.View
              style={{
                alignSelf: 'center',
                marginTop: 22,
                transform: [{ scale: buttonScale }],
              }}
            >
              <TouchableOpacity
                onPress={onNextPress}
                onPressIn={animateButtonPressIn}
                onPressOut={animateButtonPressOut}
                activeOpacity={0.9}
              >
                <ImageBackground
                  source={require('../../assets/orbizImages/orbztrtonbtn.png')}
                  style={st.orbizButton}
                >
                  <Text style={st.orbizButtonTxt}>
                    {isCurrentViewIndex === 4 ? 'Start' : 'Next'}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const st = StyleSheet.create({
  orbizBox: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    paddingBottom: 45,
  },
  orbizTxt: {
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Sansation-Bold',
  },
  orbizSecTxt: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 18,
    fontFamily: 'Sansation-Regular',
    fontStyle: 'italic',
    paddingHorizontal: 15,
  },
  orbizBoard: {
    width: 359,
    height: 261,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  orbizButton: {
    width: 152,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbizButtonTxt: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Sansation-Bold',
  },
});

export default TreatOnboarding;
