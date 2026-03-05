import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const TreatOnboarding = () => {
  const [isCurrentViewIndex, setIsCurrentViewIndex] = useState(0);
  const nav = useNavigation();

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

            <TouchableOpacity
              style={{ top: -40, alignSelf: 'center' }}
              onPress={onNextPress}
              activeOpacity={0.8}
            >
              <ImageBackground
                source={require('../../assets/orbizUi/orbizNextButton.png')}
                style={st.orbizButton}
              >
                <Image
                  source={require('../../assets/orbizImages/orbizPlay.png')}
                  style={{ left: 2, bottom: 1 }}
                />
              </ImageBackground>
            </TouchableOpacity>
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
    paddingBottom: 30,
  },
  orbizTxt: {
    fontSize: 19,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Sansation-Bold',
  },
  orbizSecTxt: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'Sansation-Regular',
    fontStyle: 'italic',
    paddingHorizontal: 2,
  },
  orbizBoard: {
    width: 359,
    height: 261,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  orbizButton: {
    width: 53,
    height: 53,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TreatOnboarding;
