import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import CustomRoundButton from '../[components]/CustomRoundButton';
import { useOrbizTreatStore } from '../[storage]/orbizTreatContext';

const BG = require('../../assets/orbizImages/orbizMainBack.png');

const orbizAchievements = [
  {
    id: 1,
    achttl: 'Star Winner',
    achsbttl: 'Complete your first full game.',
    achicon: require('../../assets/orbizImages/star.png'),
  },
  {
    id: 2,
    achttl: 'Sweet Bomb',
    achsbttl: 'Score points in 5 rounds in a row.',
    achicon: require('../../assets/orbizImages/rainbow_bomb.png'),
  },
  {
    id: 3,
    achttl: 'Lollipop Pro',
    achsbttl: 'Reach a total score of 50 points.',
    achicon: require('../../assets/orbizImages/lollipop.png'),
  },
  {
    id: 4,
    achttl: 'Grape Squad',
    achsbttl: 'Play 10 rounds in Party Mode.',
    achicon: require('../../assets/orbizImages/grape.png'),
  },
  {
    id: 5,
    achttl: 'Watermelon Brain',
    achsbttl: 'Complete a Hard-level task.',
    achicon: require('../../assets/orbizImages/watermelon.png'),
  },
  {
    id: 6,
    achttl: 'Plum Veteran',
    achsbttl: 'Complete 10 full games.',
    achicon: require('../../assets/orbizImages/plum.png'),
  },
];

export default function AchievementsScreen({ navigation }) {
  const { unlockedIds } = useOrbizTreatStore();

  const isUnlocked = id => unlockedIds.includes(id);

  return (
    <ImageBackground source={BG} style={styl.bg}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styl.container}>
          <Text style={styl.title}>Achievements</Text>

          <View style={styl.grid}>
            {orbizAchievements.map(achieve => {
              const unlocked = isUnlocked(achieve.id);
              return (
                <ImageBackground
                  key={achieve.id}
                  source={require('../../assets/orbizUi/achieveBoard.png')}
                  style={styl.achieveBoard}
                  resizeMode="stretch"
                >
                  <View key={achieve.id} style={styl.cardInner}>
                    <Image
                      source={achieve.achicon}
                      style={[styl.icon, !unlocked && styl.iconLocked]}
                    />

                    <Text style={styl.achTitle}>{achieve.achttl}</Text>
                    <Text style={styl.achSub}>{achieve.achsbttl}</Text>
                  </View>
                </ImageBackground>
              );
            })}
          </View>

          <View style={styl.bottomRow}>
            <CustomRoundButton
              onPress={() => navigation.goBack()}
              btnImage={require('../../assets/orbizImages/homeicon.png')}
              width={53}
              height={53}
            />
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
      </ScrollView>
    </ImageBackground>
  );
}

const styl = StyleSheet.create({
  bg: { flex: 1, resizeMode: 'cover' },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 66 : 50,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    marginBottom: 10,
    fontSize: 22,
    color: '#2B2B2B',
    fontFamily: 'Sansation-Bold',
  },
  grid: {
    marginTop: 18,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 8,
  },
  achieveBoard: { width: 162, height: 198, marginBottom: 12 },
  cardInner: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  icon: { width: 80, height: 80, resizeMode: 'contain' },
  iconLocked: { tintColor: 'rgba(0,0,0,0.55)' },
  achTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Sansation-Bold',
    textAlign: 'center',
    marginTop: 6,
  },
  achSub: {
    color: '#fff',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'Sansation-Regular',
  },
  bottomRow: {
    justifyContent: 'flex-end',
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
    flex: 1,
  },
});
