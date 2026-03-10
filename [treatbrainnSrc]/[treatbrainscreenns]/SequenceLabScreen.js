// sequence lab screen

import { addSequenceLabResult } from '../[treatbrainstoragge]/leaderboardStorage';
import { BlurView } from '@react-native-community/blur';

import { useNavigation } from '@react-navigation/native';

import { useMemo, useRef, useState } from 'react';
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
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import CustomRoundButton from '../[treatbraincmppnts]/CustomRoundButton';

import { sequenceLabQuestions } from '../../sequenceLabQuestions';

const sweetOrbsBG = require('../../assets/orbizImages/orbizMainBack.png');
const sweetOrbsTOTAL_TIME = 30;

const SequenceLabScreen = () => {
  const navigation = useNavigation();
  const [sweetOrbsPhase, setPhase] = useState('intro');
  const [sweetOrbsScore, setScore] = useState(0);
  const [sweetOrbsSecondsLeft, setSecondsLeft] = useState(sweetOrbsTOTAL_TIME);
  const [sweetOrbsQuestionIndex, setQuestionIndex] = useState(0);
  const [sweetOrbsSelectedIndex, setSelectedIndex] = useState(null);
  const [sweetOrbsIsAnswerLocked, setIsAnswerLocked] = useState(false);
  const [sweetOrbsShowExitConfirm, setShowExitConfirm] = useState(false);
  const [sweetOrbsTimerKey, setTimerKey] = useState(0);
  const sweetOrbsStartButtonScale = useRef(new Animated.Value(1)).current;
  const sweetOrbsIntroHomeButtonScale = useRef(new Animated.Value(1)).current;

  const sweetOrbsBottomHomeButtonScale = useRef(new Animated.Value(1)).current;

  const sweetOrbsRetryButtonScale = useRef(new Animated.Value(1)).current;

  const sweetOrbsCloseModalButtonScale = useRef(new Animated.Value(1)).current;

  const sweetOrbsConfirmModalButtonScale = useRef(
    new Animated.Value(1),
  ).current;

  const sweetOrbsOptionPressScales = useRef([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
  ]).current;

  const sweetOrbsCurrentQuestion = useMemo(
    () => sequenceLabQuestions[sweetOrbsQuestionIndex],
    [sweetOrbsQuestionIndex],
  );

  const sweetOrbsPickNextQuestion = () => {
    setQuestionIndex(prev => {
      if (sequenceLabQuestions.length <= 1) return prev;
      let next = prev;
      while (next === prev) {
        next = Math.floor(Math.random() * sequenceLabQuestions.length);
      }
      return next;
    });
    setSelectedIndex(null);
    setIsAnswerLocked(false);
  };

  const sweetOrbsOnStart = () => {
    setScore(0);
    setSecondsLeft(sweetOrbsTOTAL_TIME);
    setSelectedIndex(null);

    setIsAnswerLocked(false);

    setShowExitConfirm(false);

    setQuestionIndex(Math.floor(Math.random() * sequenceLabQuestions.length));

    setTimerKey(prev => prev + 1);
    setPhase('playing');
  };

  const sweetOrbsOnOptionPress = optionIndex => {
    if (sweetOrbsPhase !== 'playing' || sweetOrbsIsAnswerLocked) return;

    setSelectedIndex(optionIndex);
    setIsAnswerLocked(true);

    const isCorrect = optionIndex === sweetOrbsCurrentQuestion.oddIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (sweetOrbsPhase === 'playing' && sweetOrbsSecondsLeft > 0) {
        sweetOrbsPickNextQuestion();
      }
    }, 450);
  };

  const sweetOrbsGetOptionState = optionIndex => {
    if (!sweetOrbsIsAnswerLocked || sweetOrbsSelectedIndex === null)
      return 'default';
    if (
      optionIndex === sweetOrbsSelectedIndex &&
      optionIndex === sweetOrbsCurrentQuestion.oddIndex
    )
      return 'correct';
    if (
      optionIndex === sweetOrbsSelectedIndex &&
      optionIndex !== sweetOrbsCurrentQuestion.oddIndex
    )
      return 'wrong';
    return 'default';
  };

  const sweetOrbsAnimatePressIn = scaleValue => {
    Animated.spring(scaleValue, {
      toValue: 0.94,
      useNativeDriver: true,
      friction: 8,

      tension: 120,
    }).start();
  };

  const sweetOrbsAnimatePressOut = scaleValue => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      friction: 7,
      tension: 100,
    }).start();
  };

  return (
    <ImageBackground source={sweetOrbsBG} style={styles.sweetOrbsBg}>
      <ScrollView
        contentContainerStyle={styles.sweetOrbsScrollContent}
        bounces={false}
      >
        <View style={styles.sweetOrbsRoot}>
          {sweetOrbsPhase === 'intro' && (
            <View style={styles.sweetOrbsCenterArea}>
              <Image
                source={require('../../assets/orbizImages/orbztrtorseq.png')}
              />
              <ImageBackground
                source={require('../../assets/orbizUi/orbizBoard.png')}
                style={styles.sweetOrbsOrbizBoard}
              >
                <View style={styles.sweetOrbsIntroTextWrap}>
                  <Text style={styles.sweetOrbsOrbizTxt}>
                    Welcome to Sequence Lab.
                  </Text>
                  <Text style={styles.sweetOrbsOrbizSecTxt}>
                    30 seconds.{'\n'}
                    Find the one that doesn't belong.{'\n\n'}
                    Think fast. Tap smart.{'\n'}
                    Score as high as you can.
                  </Text>
                </View>
              </ImageBackground>

              <View style={styles.sweetOrbsIntroButtonsWrap}>
                <Animated.View
                  style={{ transform: [{ scale: sweetOrbsStartButtonScale }] }}
                >
                  <TouchableOpacity
                    onPress={sweetOrbsOnStart}
                    onPressIn={() =>
                      sweetOrbsAnimatePressIn(sweetOrbsStartButtonScale)
                    }
                    onPressOut={() =>
                      sweetOrbsAnimatePressOut(sweetOrbsStartButtonScale)
                    }
                    activeOpacity={0.9}
                  >
                    <ImageBackground
                      source={require('../../assets/orbizImages/orbztrtonbtn.png')}
                      style={styles.sweetOrbsStartActionButton}
                    >
                      <Text style={styles.sweetOrbsStartActionButtonTxt}>
                        Start
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </Animated.View>
                <Animated.View
                  style={{
                    transform: [{ scale: sweetOrbsIntroHomeButtonScale }],
                  }}
                >
                  <CustomRoundButton
                    onPress={() => setShowExitConfirm(true)}
                    onPressIn={() =>
                      sweetOrbsAnimatePressIn(sweetOrbsIntroHomeButtonScale)
                    }
                    onPressOut={() =>
                      sweetOrbsAnimatePressOut(sweetOrbsIntroHomeButtonScale)
                    }
                    btnImage={require('../../assets/orbizImages/homeicon.png')}
                  />
                </Animated.View>
              </View>
              {Platform.OS === 'ios' && (
                <>
                  <Image
                    source={require('../../assets/orbizImages/gameBubble1.png')}
                    style={styles.sweetOrbsIntroBubbleRight}
                  />
                  <Image
                    source={require('../../assets/orbizImages/gameBubble2.png')}
                    style={styles.sweetOrbsIntroBubbleLeft}
                  />
                </>
              )}
            </View>
          )}

          {sweetOrbsPhase === 'playing' && (
            <View style={styles.sweetOrbsPlayWrap}>
              <Text style={styles.sweetOrbsScoreText}>
                Current Score: {sweetOrbsScore}
              </Text>

              <View style={styles.sweetOrbsTimerCircleWrap}>
                <CountdownCircleTimer
                  key={sweetOrbsTimerKey}
                  isPlaying={
                    sweetOrbsPhase === 'playing' && !sweetOrbsShowExitConfirm
                  }
                  duration={sweetOrbsTOTAL_TIME}
                  colors={['#F252AC', '#F252AC']}
                  colorsTime={[sweetOrbsTOTAL_TIME, 0]}
                  strokeWidth={15}
                  size={148}
                  trailColor="#6C6D72"
                  onUpdate={remainingTime => setSecondsLeft(remainingTime)}
                  onComplete={() => {
                    setSecondsLeft(0);
                    addSequenceLabResult(sweetOrbsScore).catch(() => {});
                    setPhase('result');
                    return { shouldRepeat: false };
                  }}
                >
                  {({ remainingTime }) => (
                    <Text style={styles.sweetOrbsTimerText}>
                      {remainingTime}
                    </Text>
                  )}
                </CountdownCircleTimer>
              </View>

              <View style={styles.sweetOrbsOptionsWrap}>
                {sweetOrbsCurrentQuestion.options.map((option, index) => {
                  const optionState = sweetOrbsGetOptionState(index);
                  return (
                    <Animated.View
                      key={`${option}-${index}`}
                      style={{
                        transform: [
                          { scale: sweetOrbsOptionPressScales[index] },
                        ],
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() => sweetOrbsOnOptionPress(index)}
                        onPressIn={() =>
                          sweetOrbsAnimatePressIn(
                            sweetOrbsOptionPressScales[index],
                          )
                        }
                        onPressOut={() =>
                          sweetOrbsAnimatePressOut(
                            sweetOrbsOptionPressScales[index],
                          )
                        }
                        disabled={sweetOrbsIsAnswerLocked}
                      >
                        <ImageBackground
                          style={[styles.sweetOrbsOptionButton]}
                          source={
                            optionState === 'wrong'
                              ? require('../../assets/orbizImages/orbztrtorpartoptwr.png')
                              : optionState === 'correct'
                              ? require('../../assets/orbizImages/orbztrtorpartcorr.png')
                              : require('../../assets/orbizImages/orbztrtorpaopti.png')
                          }
                        >
                          <Text style={styles.sweetOrbsOptionText}>
                            {option}
                          </Text>
                        </ImageBackground>
                      </TouchableOpacity>
                    </Animated.View>
                  );
                })}
              </View>
            </View>
          )}

          {sweetOrbsPhase === 'result' && (
            <View style={styles.sweetOrbsResultWrap}>
              <Image
                source={require('../../assets/orbizImages/orbztrtorres.png')}
              />
              <ImageBackground
                source={require('../../assets/orbizUi/orbizBoard.png')}
                style={styles.sweetOrbsResultBoard}
              >
                <Text style={styles.sweetOrbsResultTitle}>Time's up!</Text>
                <Text style={styles.sweetOrbsResultText}>
                  Your result: {sweetOrbsScore} sequences solved{'\n'}
                  Great reflexes and sharp thinking!{'\n'}
                  Ready to beat your score?
                </Text>
              </ImageBackground>

              <View style={styles.sweetOrbsResultButtonsWrap}>
                <Animated.View
                  style={{ transform: [{ scale: sweetOrbsRetryButtonScale }] }}
                >
                  <CustomRoundButton
                    onPress={sweetOrbsOnStart}
                    onPressIn={() =>
                      sweetOrbsAnimatePressIn(sweetOrbsRetryButtonScale)
                    }
                    onPressOut={() =>
                      sweetOrbsAnimatePressOut(sweetOrbsRetryButtonScale)
                    }
                    iconStyle={0.5}
                    btnImage={require('../../assets/orbizImages/orbztrtorest.png')}
                  />
                </Animated.View>
              </View>

              {Platform.OS === 'ios' && (
                <>
                  <Image
                    source={require('../../assets/orbizImages/gameBubble1.png')}
                    style={styles.sweetOrbsIntroBubbleRight}
                  />
                  <Image
                    source={require('../../assets/orbizImages/gameBubble2.png')}
                    style={styles.sweetOrbsIntroBubbleLeft}
                  />
                </>
              )}
            </View>
          )}

          {sweetOrbsPhase !== 'intro' && (
            <View style={styles.sweetOrbsHomeBtnWrap}>
              <Animated.View
                style={{
                  transform: [{ scale: sweetOrbsBottomHomeButtonScale }],
                }}
              >
                <CustomRoundButton
                  onPress={() => setShowExitConfirm(true)}
                  onPressIn={() =>
                    sweetOrbsAnimatePressIn(sweetOrbsBottomHomeButtonScale)
                  }
                  onPressOut={() =>
                    sweetOrbsAnimatePressOut(sweetOrbsBottomHomeButtonScale)
                  }
                  btnImage={require('../../assets/orbizImages/homeicon.png')}
                />
              </Animated.View>
            </View>
          )}

          {sweetOrbsShowExitConfirm && (
            <View style={styles.sweetOrbsModalOverlay}>
              <BlurView
                blurType="light"
                blurAmount={1}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                }}
              />
              <ImageBackground
                source={require('../../assets/orbizUi/orbizQuestBoard.png')}
                style={styles.sweetOrbsConfirmBoard}
                resizeMode="stretch"
              >
                <Text style={styles.sweetOrbsConfirmText}>
                  Leave the game?{'\n'}
                  Your sweet progress will melt away.
                </Text>
                <View style={styles.sweetOrbsConfirmButtons}>
                  <Animated.View
                    style={{
                      transform: [{ scale: sweetOrbsCloseModalButtonScale }],
                    }}
                  >
                    <CustomRoundButton
                      onPress={() => setShowExitConfirm(false)}
                      onPressIn={() =>
                        sweetOrbsAnimatePressIn(sweetOrbsCloseModalButtonScale)
                      }
                      onPressOut={() =>
                        sweetOrbsAnimatePressOut(sweetOrbsCloseModalButtonScale)
                      }
                      btnImage={require('../../assets/orbizImages/orbztrtorno.png')}
                    />
                  </Animated.View>
                  <Animated.View
                    style={{
                      transform: [{ scale: sweetOrbsConfirmModalButtonScale }],
                    }}
                  >
                    <CustomRoundButton
                      onPress={() => navigation.goBack()}
                      onPressIn={() =>
                        sweetOrbsAnimatePressIn(
                          sweetOrbsConfirmModalButtonScale,
                        )
                      }
                      onPressOut={() =>
                        sweetOrbsAnimatePressOut(
                          sweetOrbsConfirmModalButtonScale,
                        )
                      }
                      btnImage={require('../../assets/orbizImages/orbztrtoyes.png')}
                    />
                  </Animated.View>
                </View>
              </ImageBackground>
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  sweetOrbsBg: { flex: 1 },
  sweetOrbsScrollContent: { flexGrow: 1 },
  sweetOrbsRoot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 30,
  },
  sweetOrbsCenterArea: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  sweetOrbsSequenceTitleWrap: {
    alignItems: 'center',
    marginBottom: 6,
  },
  sweetOrbsTitleTop: {
    fontSize: 52,
    lineHeight: 54,
    color: '#FFB100',
    fontFamily: 'Sansation-Bold',
    textShadowColor: '#5D0BAA',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 0,
  },
  sweetOrbsTitleBottom: {
    fontSize: 64,
    lineHeight: 66,
    color: '#9A4DFF',
    fontFamily: 'Sansation-Bold',
    textShadowColor: '#4F0A9D',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 0,
    marginTop: -8,
  },
  sweetOrbsOrbizBoard: {
    width: 359,
    height: 261,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 52,
  },
  sweetOrbsIntroTextWrap: {
    paddingHorizontal: 20,
  },
  sweetOrbsOrbizTxt: {
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Sansation-Bold',
  },
  sweetOrbsOrbizSecTxt: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Sansation-Regular',
    fontStyle: 'italic',
    lineHeight: 28,
    marginTop: 14,
    paddingHorizontal: 8,
  },
  sweetOrbsIntroButtonsWrap: {
    gap: 15,
    marginTop: 12,
    alignItems: 'center',
  },
  sweetOrbsStartActionButton: {
    width: 152,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sweetOrbsStartActionButtonTxt: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Sansation-Bold',
  },
  sweetOrbsIntroBubbleRight: { position: 'absolute', right: -20, top: 190 },
  sweetOrbsIntroBubbleLeft: { position: 'absolute', left: 0, top: 0 },
  sweetOrbsPlayWrap: { width: '100%', alignItems: 'center', marginTop: 10 },
  sweetOrbsScoreText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'Sansation-Bold',
    marginBottom: 29,
  },
  sweetOrbsTimerCircleWrap: {
    width: 148,
    height: 148,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  sweetOrbsTimerText: {
    fontSize: 74,
    color: '#F252AC',
    fontFamily: 'Sansation-Bold',
    lineHeight: 80,
  },
  sweetOrbsOptionsWrap: {
    width: '100%',
    marginTop: 26,
    alignItems: 'center',
    gap: 16,
  },
  sweetOrbsOptionButton: {
    width: 248,
    minHeight: 78,

    alignItems: 'center',
    justifyContent: 'center',
  },

  sweetOrbsOptionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Sansation-Bold',
    textAlign: 'center',
  },
  sweetOrbsResultWrap: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 30,
    gap: 14,
    flex: 1,
  },
  sweetOrbsResultBoard: {
    width: 350,
    height: 256,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  sweetOrbsResultTitle: {
    fontSize: 22,
    color: '#FFFFFF',
    fontFamily: 'Sansation-Bold',
    marginBottom: 20,
  },
  sweetOrbsResultText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Sansation-Regular',
    fontStyle: 'italic',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  sweetOrbsResultButtonsWrap: { top: -48 },
  sweetOrbsHomeBtnWrap: {
    marginTop: 14,
  },
  sweetOrbsModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sweetOrbsConfirmBoard: {
    width: 334,
    height: 194,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sweetOrbsConfirmText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Sansation-Bold',
    paddingHorizontal: 42,
  },
  sweetOrbsConfirmButtons: {
    flexDirection: 'row',
    gap: 22,

    position: 'absolute',
    bottom: -20,
  },
});

export default SequenceLabScreen;
