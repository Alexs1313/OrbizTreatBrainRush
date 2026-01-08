import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const OrbizTreatOnboard = () => {
  const [isCurrentViewIndex, setIsCurrentViewIndex] = useState(0);
  const nav = useNavigation();

  const orbizViews = [
    {
      orbizttl: 'Welcome to Orbiz Treat BrainRush',
      orbizdesc:
        'A fast and fun party game where every challenge lasts just 10 seconds. Get ready to think quick and play even quicker.',
      orbizimg: require('../../assets/orbizImages/oboardimg1.png'),
    },
    {
      orbizttl: 'Play Your Way',
      orbizdesc:
        'Pick a difficulty manually or let the Random Orb choose for you. Every round feels different, surprising, and exciting.',
      orbizimg: require('../../assets/orbizImages/oboardimg2.png'),
    },
    {
      orbizttl: 'Complete the Challenge in 10 Seconds',
      orbizdesc:
        'Answer fast, vote as a group, and earn points each round. Easy, Medium, or Hard — the tougher the task, the more points you get.',
      orbizimg: require('../../assets/orbizImages/oboardimg3.png'),
    },
    {
      orbizttl: 'Climb the Scoreboard and Unlock Orbiz',
      orbizdesc:
        'Finish all rounds to see the final results and unlock special achievement orbs as you progress through the game.',
      orbizimg: require('../../assets/orbizImages/oboardimg4.png'),
    },
  ];

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
            <Image
              source={orbizViews[isCurrentViewIndex].orbizimg}
              style={isCurrentViewIndex === 0 && { marginBottom: 30 }}
            />
            {isCurrentViewIndex === 0 && (
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
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Sansation-Bold',
  },
  orbizSecTxt: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 15,
    fontFamily: 'Sansation-Regular',
    fontStyle: 'italic',
    paddingHorizontal: 5,
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

export default OrbizTreatOnboard;
