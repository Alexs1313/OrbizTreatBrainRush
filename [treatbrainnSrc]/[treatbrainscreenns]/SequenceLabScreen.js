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

const BG = require('../../assets/orbizImages/orbizMainBack.png');
const TOTAL_TIME = 30;

const SequenceLabScreen = () => {
  const navigation = useNavigation();
  const [phase, setPhase] = useState('intro');
  const [score, setScore] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_TIME);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const startButtonScale = useRef(new Animated.Value(1)).current;
  const introHomeButtonScale = useRef(new Animated.Value(1)).current;

  const bottomHomeButtonScale = useRef(new Animated.Value(1)).current;

  const retryButtonScale = useRef(new Animated.Value(1)).current;

  const closeModalButtonScale = useRef(new Animated.Value(1)).current;

  const confirmModalButtonScale = useRef(new Animated.Value(1)).current;

  const optionPressScales = useRef([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
  ]).current;

  const currentQuestion = useMemo(
    () => sequenceLabQuestions[questionIndex],
    [questionIndex],
  );

  const pickNextQuestion = () => {
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

  const onStart = () => {
    setScore(0);
    setSecondsLeft(TOTAL_TIME);
    setSelectedIndex(null);

    setIsAnswerLocked(false);

    setShowExitConfirm(false);

    setQuestionIndex(Math.floor(Math.random() * sequenceLabQuestions.length));

    setTimerKey(prev => prev + 1);
    setPhase('playing');
  };

  const onOptionPress = optionIndex => {
    if (phase !== 'playing' || isAnswerLocked) return;

    setSelectedIndex(optionIndex);
    setIsAnswerLocked(true);

    const isCorrect = optionIndex === currentQuestion.oddIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (phase === 'playing' && secondsLeft > 0) {
        pickNextQuestion();
      }
    }, 450);
  };

  const getOptionState = optionIndex => {
    if (!isAnswerLocked || selectedIndex === null) return 'default';
    if (
      optionIndex === selectedIndex &&
      optionIndex === currentQuestion.oddIndex
    )
      return 'correct';
    if (
      optionIndex === selectedIndex &&
      optionIndex !== currentQuestion.oddIndex
    )
      return 'wrong';
    return 'default';
  };

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
    <ImageBackground source={BG} style={styles.bg}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <View style={styles.root}>
          {phase === 'intro' && (
            <View style={styles.centerArea}>
              <Image
                source={require('../../assets/orbizImages/orbztrtorseq.png')}
              />
              <ImageBackground
                source={require('../../assets/orbizUi/orbizBoard.png')}
                style={styles.orbizBoard}
              >
                <View style={styles.introTextWrap}>
                  <Text style={styles.orbizTxt}>Welcome to Sequence Lab.</Text>
                  <Text style={styles.orbizSecTxt}>
                    30 seconds.{'\n'}
                    Find the one that doesn't belong.{'\n\n'}
                    Think fast. Tap smart.{'\n'}
                    Score as high as you can.
                  </Text>
                </View>
              </ImageBackground>

              <View style={styles.introButtonsWrap}>
                <Animated.View
                  style={{ transform: [{ scale: startButtonScale }] }}
                >
                  <TouchableOpacity
                    onPress={onStart}
                    onPressIn={() => animatePressIn(startButtonScale)}
                    onPressOut={() => animatePressOut(startButtonScale)}
                    activeOpacity={0.9}
                  >
                    <ImageBackground
                      source={require('../../assets/orbizImages/orbztrtonbtn.png')}
                      style={styles.startActionButton}
                    >
                      <Text style={styles.startActionButtonTxt}>Start</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </Animated.View>
                <Animated.View
                  style={{ transform: [{ scale: introHomeButtonScale }] }}
                >
                  <CustomRoundButton
                    onPress={() => setShowExitConfirm(true)}
                    onPressIn={() => animatePressIn(introHomeButtonScale)}
                    onPressOut={() => animatePressOut(introHomeButtonScale)}
                    btnImage={require('../../assets/orbizImages/homeicon.png')}
                  />
                </Animated.View>
              </View>
              {Platform.OS === 'ios' && (
                <>
                  <Image
                    source={require('../../assets/orbizImages/gameBubble1.png')}
                    style={styles.introBubbleRight}
                  />
                  <Image
                    source={require('../../assets/orbizImages/gameBubble2.png')}
                    style={styles.introBubbleLeft}
                  />
                </>
              )}
            </View>
          )}

          {phase === 'playing' && (
            <View style={styles.playWrap}>
              <Text style={styles.scoreText}>Current Score: {score}</Text>

              <View style={styles.timerCircleWrap}>
                <CountdownCircleTimer
                  key={timerKey}
                  isPlaying={phase === 'playing' && !showExitConfirm}
                  duration={TOTAL_TIME}
                  colors={['#F252AC', '#F252AC']}
                  colorsTime={[TOTAL_TIME, 0]}
                  strokeWidth={15}
                  size={148}
                  trailColor="#6C6D72"
                  onUpdate={remainingTime => setSecondsLeft(remainingTime)}
                  onComplete={() => {
                    setSecondsLeft(0);
                    addSequenceLabResult(score).catch(() => {});
                    setPhase('result');
                    return { shouldRepeat: false };
                  }}
                >
                  {({ remainingTime }) => (
                    <Text style={styles.timerText}>{remainingTime}</Text>
                  )}
                </CountdownCircleTimer>
              </View>

              <View style={styles.optionsWrap}>
                {currentQuestion.options.map((option, index) => {
                  const optionState = getOptionState(index);
                  return (
                    <Animated.View
                      key={`${option}-${index}`}
                      style={{
                        transform: [{ scale: optionPressScales[index] }],
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() => onOptionPress(index)}
                        onPressIn={() =>
                          animatePressIn(optionPressScales[index])
                        }
                        onPressOut={() =>
                          animatePressOut(optionPressScales[index])
                        }
                        disabled={isAnswerLocked}
                      >
                        <ImageBackground
                          style={[styles.optionButton]}
                          source={
                            optionState === 'wrong'
                              ? require('../../assets/orbizImages/orbztrtorpartoptwr.png')
                              : optionState === 'correct'
                              ? require('../../assets/orbizImages/orbztrtorpartcorr.png')
                              : require('../../assets/orbizImages/orbztrtorpaopti.png')
                          }
                        >
                          <Text style={styles.optionText}>{option}</Text>
                        </ImageBackground>
                      </TouchableOpacity>
                    </Animated.View>
                  );
                })}
              </View>
            </View>
          )}

          {phase === 'result' && (
            <View style={styles.resultWrap}>
              <Image
                source={require('../../assets/orbizImages/orbztrtorres.png')}
              />
              <ImageBackground
                source={require('../../assets/orbizUi/orbizBoard.png')}
                style={styles.resultBoard}
              >
                <Text style={styles.resultTitle}>Time's up!</Text>
                <Text style={styles.resultText}>
                  Your result: {score} sequences solved{'\n'}
                  Great reflexes and sharp thinking!{'\n'}
                  Ready to beat your score?
                </Text>
              </ImageBackground>

              <View style={styles.resultButtonsWrap}>
                <Animated.View
                  style={{ transform: [{ scale: retryButtonScale }] }}
                >
                  <CustomRoundButton
                    onPress={onStart}
                    onPressIn={() => animatePressIn(retryButtonScale)}
                    onPressOut={() => animatePressOut(retryButtonScale)}
                    iconStyle={0.5}
                    btnImage={require('../../assets/orbizImages/orbztrtorest.png')}
                  />
                </Animated.View>
              </View>

              {Platform.OS === 'ios' && (
                <>
                  <Image
                    source={require('../../assets/orbizImages/gameBubble1.png')}
                    style={styles.introBubbleRight}
                  />
                  <Image
                    source={require('../../assets/orbizImages/gameBubble2.png')}
                    style={styles.introBubbleLeft}
                  />
                </>
              )}
            </View>
          )}

          {phase !== 'intro' && (
            <View style={styles.homeBtnWrap}>
              <Animated.View
                style={{ transform: [{ scale: bottomHomeButtonScale }] }}
              >
                <CustomRoundButton
                  onPress={() => setShowExitConfirm(true)}
                  onPressIn={() => animatePressIn(bottomHomeButtonScale)}
                  onPressOut={() => animatePressOut(bottomHomeButtonScale)}
                  btnImage={require('../../assets/orbizImages/homeicon.png')}
                />
              </Animated.View>
            </View>
          )}

          {showExitConfirm && (
            <View style={styles.modalOverlay}>
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
                style={styles.confirmBoard}
                resizeMode="stretch"
              >
                <Text style={styles.confirmText}>
                  Leave the game?{'\n'}
                  Your sweet progress will melt away.
                </Text>
                <View style={styles.confirmButtons}>
                  <Animated.View
                    style={{ transform: [{ scale: closeModalButtonScale }] }}
                  >
                    <CustomRoundButton
                      onPress={() => setShowExitConfirm(false)}
                      onPressIn={() => animatePressIn(closeModalButtonScale)}
                      onPressOut={() => animatePressOut(closeModalButtonScale)}
                      btnImage={require('../../assets/orbizImages/orbztrtorno.png')}
                    />
                  </Animated.View>
                  <Animated.View
                    style={{ transform: [{ scale: confirmModalButtonScale }] }}
                  >
                    <CustomRoundButton
                      onPress={() => navigation.goBack()}
                      onPressIn={() => animatePressIn(confirmModalButtonScale)}
                      onPressOut={() =>
                        animatePressOut(confirmModalButtonScale)
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
  bg: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 30,
  },
  centerArea: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  sequenceTitleWrap: {
    alignItems: 'center',
    marginBottom: 6,
  },
  titleTop: {
    fontSize: 52,
    lineHeight: 54,
    color: '#FFB100',
    fontFamily: 'Sansation-Bold',
    textShadowColor: '#5D0BAA',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 0,
  },
  titleBottom: {
    fontSize: 64,
    lineHeight: 66,
    color: '#9A4DFF',
    fontFamily: 'Sansation-Bold',
    textShadowColor: '#4F0A9D',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 0,
    marginTop: -8,
  },
  orbizBoard: {
    width: 359,
    height: 261,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 52,
  },
  introTextWrap: {
    paddingHorizontal: 20,
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
    fontFamily: 'Sansation-Regular',
    fontStyle: 'italic',
    lineHeight: 28,
    marginTop: 14,
    paddingHorizontal: 8,
  },
  introButtonsWrap: {
    gap: 15,
    marginTop: 12,
    alignItems: 'center',
  },
  startActionButton: {
    width: 152,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startActionButtonTxt: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Sansation-Bold',
  },
  introBubbleRight: { position: 'absolute', right: -20, top: 190 },
  introBubbleLeft: { position: 'absolute', left: 0, top: 0 },
  playWrap: { width: '100%', alignItems: 'center', marginTop: 10 },
  scoreText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'Sansation-Bold',
    marginBottom: 29,
  },
  timerCircleWrap: {
    width: 148,
    height: 148,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 74,
    color: '#F252AC',
    fontFamily: 'Sansation-Bold',
    lineHeight: 80,
  },
  optionsWrap: {
    width: '100%',
    marginTop: 26,
    alignItems: 'center',
    gap: 16,
  },
  optionButton: {
    width: 248,
    minHeight: 78,

    alignItems: 'center',
    justifyContent: 'center',
  },

  optionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Sansation-Bold',
    textAlign: 'center',
  },
  resultWrap: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 30,
    gap: 14,
    flex: 1,
  },
  resultBoard: {
    width: 350,
    height: 256,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  resultTitle: {
    fontSize: 22,
    color: '#FFFFFF',
    fontFamily: 'Sansation-Bold',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Sansation-Regular',
    fontStyle: 'italic',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  resultButtonsWrap: { top: -48 },
  homeBtnWrap: {
    marginTop: 14,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBoard: {
    width: 334,
    height: 194,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Sansation-Bold',
    paddingHorizontal: 42,
  },
  confirmButtons: {
    flexDirection: 'row',
    gap: 22,

    position: 'absolute',
    bottom: -20,
  },
});

export default SequenceLabScreen;
