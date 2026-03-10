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

const sweetOrbsBG = require('../../assets/orbizImages/orbizMainBack.png');

const sweetOrbsAchievements = [
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
  const [sweetOrbsSequenceLabBestScore, setSequenceLabBestScore] = useState(0);
  const sweetOrbsProgressAnimations = useRef(
    sweetOrbsAchievements.map(() => new Animated.Value(0)),
  ).current;
  const sweetOrbsHomeButtonScale = useRef(new Animated.Value(1)).current;

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

  const sweetOrbsProgressByAchievement = useMemo(
    () => ({
      1: { current: gamesCompleted, target: 1 },
      2: { current: consecutiveScoringRounds, target: 5 },
      3: { current: sweetOrbsSequenceLabBestScore, target: 10 },
      4: { current: partyRoundsPlayed, target: 10 },
      5: { current: hardSuccessCount, target: 1 },
      6: { current: gamesCompleted, target: 10 },
    }),
    [
      gamesCompleted,
      sweetOrbsSequenceLabBestScore,
      consecutiveScoringRounds,
      partyRoundsPlayed,
      hardSuccessCount,
    ],
  );

  useEffect(() => {
    const anims = sweetOrbsAchievements.map((achieve, index) => {
      const progressData = sweetOrbsProgressByAchievement[achieve.id] || {
        current: 0,
        target: 1,
      };
      const normalizedProgress = Math.min(
        progressData.current / progressData.target,
        1,
      );
      return Animated.timing(sweetOrbsProgressAnimations[index], {
        toValue: normalizedProgress,
        duration: 650,
        delay: index * 70,
        useNativeDriver: false,
      });
    });

    Animated.parallel(anims).start();
  }, [sweetOrbsProgressAnimations, sweetOrbsProgressByAchievement]);

  const animateHomePressIn = () => {
    Animated.spring(sweetOrbsHomeButtonScale, {
      toValue: 0.94,
      useNativeDriver: true,
      friction: 8,
      tension: 120,
    }).start();
  };

  const animateHomePressOut = () => {
    Animated.spring(sweetOrbsHomeButtonScale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 7,
      tension: 100,
    }).start();
  };

  return (
    <ImageBackground source={sweetOrbsBG} style={styl.sweetOrbsBg}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styl.sweetOrbsContainer}>
          <Text style={styl.sweetOrbsTitle}>Achievements</Text>

          <View style={styl.sweetOrbsGrid}>
            {sweetOrbsAchievements.map((achieve, index) => {
              const progressData = sweetOrbsProgressByAchievement[
                achieve.id
              ] || {
                current: 0,
                target: 1,
              };
              const progressWidth = sweetOrbsProgressAnimations[
                index
              ].interpolate({
                inputRange: [0, 1],
                outputRange: [0, 126],
              });
              return (
                <ImageBackground
                  key={achieve.id}
                  source={require('../../assets/orbizUi/achieveBoard.png')}
                  style={styl.sweetOrbsAchieveBoard}
                  resizeMode="stretch"
                >
                  <View key={achieve.id} style={styl.sweetOrbsCardInner}>
                    <Image
                      source={achieve.achicon}
                      style={styl.sweetOrbsIcon}
                    />

                    <Text style={styl.sweetOrbsAchTitle}>{achieve.achttl}</Text>
                    <View style={styl.sweetOrbsProgressBarTrack}>
                      <Animated.View
                        style={[
                          styl.sweetOrbsProgressBarFill,
                          { width: progressWidth },
                        ]}
                      />
                      <Text style={styl.sweetOrbsProgressText}>
                        {Math.min(progressData.current, progressData.target)}/
                        {progressData.target}
                      </Text>
                    </View>
                    <Text style={styl.sweetOrbsAchSub}>{achieve.achsbttl}</Text>
                  </View>
                </ImageBackground>
              );
            })}
          </View>

          <View style={styl.sweetOrbsBottomRow}>
            <Animated.View
              style={{ transform: [{ scale: sweetOrbsHomeButtonScale }] }}
            >
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
  sweetOrbsBg: { flex: 1, resizeMode: 'cover' },
  sweetOrbsContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 66 : 50,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  sweetOrbsTitle: {
    marginBottom: 10,
    fontSize: 22,
    color: '#2B2B2B',
    fontFamily: 'Sansation-Bold',
  },
  sweetOrbsGrid: {
    marginTop: 18,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 8,
  },
  sweetOrbsAchieveBoard: { width: 162, height: 198, marginBottom: 12 },
  sweetOrbsCardInner: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  sweetOrbsIcon: { width: 80, height: 80, resizeMode: 'contain' },
  sweetOrbsAchTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Sansation-Bold',
    textAlign: 'center',
    marginTop: 7,
  },
  sweetOrbsProgressBarTrack: {
    width: 126,
    height: 14,
    borderRadius: 999,
    backgroundColor: '#F56AC4',
    marginTop: 8,
    marginBottom: 4,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  sweetOrbsProgressBarFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#7A3CFF',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  sweetOrbsProgressText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Sansation-Bold',
    zIndex: 1,
  },
  sweetOrbsAchSub: {
    color: '#fff',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'Sansation-Regular',
    paddingHorizontal: 5,
  },
  sweetOrbsBottomRow: {
    justifyContent: 'flex-end',
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
    flex: 1,
  },
});
