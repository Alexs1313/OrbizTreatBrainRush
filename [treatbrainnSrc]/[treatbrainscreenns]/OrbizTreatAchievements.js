// achieves screen

import CustomRoundButton from '../[treatbraincmppnts]/CustomRoundButton';
import { useOrbizTreatStore } from '../[treatbrainstoragge]/orbizTreatContext';
import { useFocusEffect } from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';

import { getSequenceLabResults } from '../[treatbrainstoragge]/leaderboardStorage';

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
    achsbttl: 'Reach a total score of 10 points in a sequence lab.',
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
  const {
    gamesCompleted,
    consecutiveScoringRounds,
    partyRoundsPlayed,
    hardSuccessCount,
  } = useOrbizTreatStore();
  const [sequenceLabBestScore, setSequenceLabBestScore] = useState(0);
  const progressAnimations = useRef(
    orbizAchievements.map(() => new Animated.Value(0)),
  ).current;
  const homeButtonScale = useRef(new Animated.Value(1)).current;

  useFocusEffect(
    useCallback(() => {
      const loadSequenceBest = async () => {
        const sequenceResults = await getSequenceLabResults();
        const bestScore = sequenceResults.reduce(
          (max, item) => (item?.score > max ? item.score : max),
          0,
        );
        setSequenceLabBestScore(bestScore);
      };

      loadSequenceBest();
    }, []),
  );

  const progressByAchievement = useMemo(
    () => ({
      1: { current: gamesCompleted, target: 1 },
      2: { current: consecutiveScoringRounds, target: 5 },
      3: { current: sequenceLabBestScore, target: 10 },
      4: { current: partyRoundsPlayed, target: 10 },
      5: { current: hardSuccessCount, target: 1 },
      6: { current: gamesCompleted, target: 10 },
    }),
    [
      gamesCompleted,
      sequenceLabBestScore,
      consecutiveScoringRounds,
      partyRoundsPlayed,
      hardSuccessCount,
    ],
  );

  useEffect(() => {
    const anims = orbizAchievements.map((achieve, index) => {
      const progressData = progressByAchievement[achieve.id] || {
        current: 0,
        target: 1,
      };
      const normalizedProgress = Math.min(
        progressData.current / progressData.target,
        1,
      );
      return Animated.timing(progressAnimations[index], {
        toValue: normalizedProgress,
        duration: 650,
        delay: index * 70,
        useNativeDriver: false,
      });
    });

    Animated.parallel(anims).start();
  }, [progressAnimations, progressByAchievement]);

  const animateHomePressIn = () => {
    Animated.spring(homeButtonScale, {
      toValue: 0.94,
      useNativeDriver: true,
      friction: 8,
      tension: 120,
    }).start();
  };

  const animateHomePressOut = () => {
    Animated.spring(homeButtonScale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 7,
      tension: 100,
    }).start();
  };

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
            {orbizAchievements.map((achieve, index) => {
              const progressData = progressByAchievement[achieve.id] || {
                current: 0,
                target: 1,
              };
              const progressWidth = progressAnimations[index].interpolate({
                inputRange: [0, 1],
                outputRange: [0, 126],
              });
              return (
                <ImageBackground
                  key={achieve.id}
                  source={require('../../assets/orbizUi/achieveBoard.png')}
                  style={styl.achieveBoard}
                  resizeMode="stretch"
                >
                  <View key={achieve.id} style={styl.cardInner}>
                    <Image source={achieve.achicon} style={styl.icon} />

                    <Text style={styl.achTitle}>{achieve.achttl}</Text>
                    <View style={styl.progressBarTrack}>
                      <Animated.View
                        style={[styl.progressBarFill, { width: progressWidth }]}
                      />
                      <Text style={styl.progressText}>
                        {Math.min(progressData.current, progressData.target)}/
                        {progressData.target}
                      </Text>
                    </View>
                    <Text style={styl.achSub}>{achieve.achsbttl}</Text>
                  </View>
                </ImageBackground>
              );
            })}
          </View>

          <View style={styl.bottomRow}>
            <Animated.View style={{ transform: [{ scale: homeButtonScale }] }}>
              <CustomRoundButton
                onPress={() => navigation.goBack()}
                onPressIn={animateHomePressIn}
                onPressOut={animateHomePressOut}
                btnImage={require('../../assets/orbizImages/homeicon.png')}
                width={53}
                height={53}
              />
            </Animated.View>
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
  achTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Sansation-Bold',
    textAlign: 'center',
    marginTop: 7,
  },
  progressBarTrack: {
    width: 126,
    height: 14,
    borderRadius: 999,
    backgroundColor: '#F56AC4',
    marginTop: 8,
    marginBottom: 4,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#7A3CFF',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  progressText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Sansation-Bold',
    zIndex: 1,
  },
  achSub: {
    color: '#fff',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'Sansation-Regular',
    paddingHorizontal: 5,
  },
  bottomRow: {
    justifyContent: 'flex-end',
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
    flex: 1,
  },
});
