import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

// my local imports ---------------------------------->

import CustomRoundButton from '../components/CustomRoundButton';
import { useOrbizTreatStore } from '../storage/orbizTreatContext';
import { orbizGameTasks } from '../data/orbizGameTasks';

const gameOrbs = {
  easy: {
    label: 'Easy',
    points: 1,
    img: require('../../assets/orbizImages/easyOrb.png'),
  },
  medium: {
    label: 'Medium',
    points: 2,
    img: require('../../assets/orbizImages/mediumOrb.png'),
  },
  hard: {
    label: 'Hard',
    points: 3,
    img: require('../../assets/orbizImages/hardOrb.png'),
  },
};

const DEFAULT_PLAYERS = 2;
const MAX_PLAYERS = 7;
const ALLOWED_ROUNDS = [5, 10, 15, 20];
const MODES = ['Manual', 'Mystery Orb'];

export default function OrbizTreatGame() {
  // nav
  const navigation = useNavigation();

  // states

  const [phase, setPhase] = useState('start');
  const [playerCount, setPlayerCount] = useState(DEFAULT_PLAYERS);
  const [rounds, setRounds] = useState(ALLOWED_ROUNDS[0]);
  const [mode, setMode] = useState(MODES[0]);
  const [players, setPlayers] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [chosenOrb, setChosenOrb] = useState(null);
  const [revealSelected, setRevealSelected] = useState(false);
  const [showQuestionSection, setShowQuestionSection] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(10);
  const [timerRunning, setTimerRunning] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [spinAnimating, setSpinAnimating] = useState(false);
  const [spinPreview, setSpinPreview] = useState('easy');
  const [confettiVisible, setConfettiVisible] = useState(false);
  const [winVisible, setWinVisible] = useState(false);
  const [nameErrors, setNameErrors] = useState({});

  // refs
  const delayRef = useRef(null);
  const timerRef = useRef(null);
  const spinIntervalRef = useRef(null);
  const confettiTimeoutRef = useRef(null);
  const winTimeoutRef = useRef(null);

  // store
  const { recordRound, recordGameCompleted, isEnabledNotifications } =
    useOrbizTreatStore();

  // did mount

  useEffect(() => {
    return () => clearGameTimers();
  }, []);

  useEffect(() => {
    if (!players || players.length === 0) return;
    const errors = {};

    const playersNames = players.map(p => p.name.trim());

    const counts = {};
    playersNames.forEach(n => {
      if (!n) return;
      counts[n] = (counts[n] || 0) + 1;
    });

    setNameErrors(errors);
  }, [players]);

  const pickRandomTask = different => {
    const tasksList = orbizGameTasks[different];
    return tasksList[Math.floor(Math.random() * tasksList.length)];
  };

  const clearGameTimers = () => {
    if (delayRef.current) {
      clearTimeout(delayRef.current);
      delayRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (spinIntervalRef.current) {
      clearInterval(spinIntervalRef.current);
      spinIntervalRef.current = null;
    }
    if (confettiTimeoutRef.current) {
      clearTimeout(confettiTimeoutRef.current);
      confettiTimeoutRef.current = null;
    }
    if (winTimeoutRef.current) {
      clearTimeout(winTimeoutRef.current);
      winTimeoutRef.current = null;
    }
  };

  const goToNames = () => {
    const playersNames = Array.from(
      { length: playerCount },
      (_, playerIndex) => ({
        id: playerIndex + 1,
        name: '',
        score: 0,
      }),
    );
    setPlayers(playersNames);
    setPhase('names');
    if (isEnabledNotifications) Toast.show({ text1: 'Enter player names.' });
  };

  const canProceedFromNames = () =>
    Object.keys(nameErrors).length === 0 &&
    players.length >= 2 &&
    players.every(player => player.name.trim() !== '');

  const handlePlayOrbizGame = () => {
    if (!canProceedFromNames()) {
      Toast.show({ text1: 'Fill all player names first.' });
      return;
    }
    setPlayers(prevPlayers =>
      prevPlayers.map(player => ({ ...player, score: 0 })),
    );
    setCurrentRound(1);
    setCurrentPlayerIndex(0);
    setPhase('playing');
    resetTurnState();
  };

  const resetTurnState = () => {
    setChosenOrb(null);
    setRevealSelected(false);
    setShowQuestionSection(false);
    setCurrentTask(null);
    setTimerSeconds(10);
    setTimerRunning(false);
    setOptionsVisible(false);
    clearGameTimers();
  };

  const startTimer = () => {
    setTimerRunning(true);
    setTimerSeconds(10);
    let seconds = 10;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      seconds -= 1;
      setTimerSeconds(seconds);
      if (seconds <= 0) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setTimerRunning(false);

        setOptionsVisible(true);

        if (isEnabledNotifications)
          Toast.show({ text1: 'Time is up! Make your choice.' });
      }
    }, 980);
  };

  const handleSpin = () => {
    if (spinAnimating || timerRunning || showQuestionSection) return;
    setSpinAnimating(true);
    const diffs = ['easy', 'medium', 'hard'];
    let idx = 0;
    spinIntervalRef.current = setInterval(() => {
      setSpinPreview(diffs[idx % 3]);
      idx++;
    }, 80);
    setTimeout(() => {
      if (spinIntervalRef.current) {
        clearInterval(spinIntervalRef.current);
        spinIntervalRef.current = null;
      }
      const final = diffs[Math.floor(Math.random() * 3)];
      setSpinPreview(final);
      setSpinAnimating(false);
      selectOrb(final);
    }, 1200);
  };

  const handleDecision = accepted => {
    setOptionsVisible(false);
    clearGameTimers();
    if (accepted && chosenOrb) {
      const pts = gameOrbs[chosenOrb].points;
      setPlayers(prev =>
        prev.map((p, i) =>
          i === currentPlayerIndex ? { ...p, score: p.score + pts } : p,
        ),
      );
      if (recordRound) {
        recordRound({ scored: true, points: pts, mode, difficulty: chosenOrb });
      }

      console.log('confetti!!');

      setConfettiVisible(true);
      if (confettiTimeoutRef.current) clearTimeout(confettiTimeoutRef.current);
      confettiTimeoutRef.current = setTimeout(() => {
        setConfettiVisible(false);
        confettiTimeoutRef.current = null;
        advanceTurn();
      }, 1800);
    } else {
      if (recordRound) {
        recordRound({
          scored: false,
          points: 0,
          mode,
          difficulty: chosenOrb || 'none',
        });
      }
      advanceTurn();
    }
  };

  const advanceTurn = () => {
    resetTurnState();
    const nextPlayer = currentPlayerIndex + 1;
    if (nextPlayer >= players.length) {
      if (currentRound >= rounds) {
        if (recordGameCompleted) recordGameCompleted();
        setPhase('results');
      } else {
        setPhase('intermediate');
      }
    } else {
      setCurrentPlayerIndex(nextPlayer);
    }
  };

  const onNextRound = () => {
    setCurrentRound(round => round + 1);
    setCurrentPlayerIndex(0);
    setPhase('playing');
    resetTurnState();

    console.log('next round =>');
  };

  useEffect(() => {
    if (phase === 'results') {
      setWinVisible(true);
      if (winTimeoutRef.current) clearTimeout(winTimeoutRef.current);
      winTimeoutRef.current = setTimeout(() => {
        setWinVisible(false);
        winTimeoutRef.current = null;
      }, 4000);
    } else {
      if (winTimeoutRef.current) {
        clearTimeout(winTimeoutRef.current);
        winTimeoutRef.current = null;
      }
      setWinVisible(false);
    }
    return () => {
      if (winTimeoutRef.current) {
        clearTimeout(winTimeoutRef.current);
        winTimeoutRef.current = null;
      }
    };
  }, [phase]);

  const changePlayerCount = delta =>
    setPlayerCount(prevCount =>
      Math.max(2, Math.min(MAX_PLAYERS, prevCount + delta)),
    );

  const changeRounds = delta => {
    const idx = ALLOWED_ROUNDS.indexOf(rounds);
    const newIdx = Math.max(
      0,
      Math.min(ALLOWED_ROUNDS.length - 1, idx + delta),
    );
    setRounds(ALLOWED_ROUNDS[newIdx]);
  };

  const changeMode = delta => {
    const idx = MODES.indexOf(mode);
    const newIdx = Math.max(0, Math.min(MODES.length - 1, idx + delta));
    setMode(MODES[newIdx]);
  };

  const selectOrb = diff => {
    if (timerRunning || showQuestionSection || spinAnimating) return;
    setChosenOrb(diff);
    setRevealSelected(true);
    setShowQuestionSection(false);
    setCurrentTask(null);
    setOptionsVisible(false);
    if (delayRef.current) {
      clearTimeout(delayRef.current);
      delayRef.current = null;
    }
    delayRef.current = setTimeout(() => {
      setRevealSelected(false);
      const task = pickRandomTask(diff);
      setCurrentTask(task);
      setShowQuestionSection(true);
      setOptionsVisible(false);
      startTimer();
      delayRef.current = null;
    }, 2500);
  };

  const currentPlayer = players[currentPlayerIndex] || { name: '' };

  const ResultsOrbizGameCard = ({ title, showTrophy }) => {
    // Create a sorted copy so original players state is not mutated
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

    return (
      <View style={styles.centerArea}>
        {showTrophy && (
          <Image
            source={require('../../assets/orbizImages/orbizTrophy.png')}
            style={{
              width: 120,
              height: 120,
              marginBottom: -20,
              marginTop: 10,
            }}
          />
        )}
        <ImageBackground
          source={require('../../assets/orbizUi/orbizSetupBoard.png')}
          style={styles.orbizSetupBoard}
          resizeMode="contain"
        >
          <View
            style={{
              paddingHorizontal: 35,
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Text style={styles.cardTitle}>{title}</Text>
            <View style={{ width: '100%', marginTop: 6 }}>
              {sortedPlayers.map(p => (
                <View key={p.id} style={styles.scoreRow}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Sansation-Bold',
                      fontSize: 18,
                    }}
                  >
                    {p.name}
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Sansation-Bold',
                      fontSize: 18,
                    }}
                  >
                    {p.score}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ImageBackground>
        <View style={{ alignItems: 'center', marginTop: 12 }}>
          {phase === 'intermediate' ? (
            <View style={{ gap: 15, top: -40 }}>
              <CustomRoundButton
                onPress={onNextRound}
                btnImage={require('../../assets/orbizImages/orbizPlay.png')}
              />
              <CustomRoundButton
                onPress={() => navigation.goBack()}
                btnImage={require('../../assets/orbizImages/homeicon.png')}
              />
            </View>
          ) : (
            <View style={{ top: -40 }}>
              <CustomRoundButton
                onPress={() => navigation.goBack()}
                btnImage={require('../../assets/orbizImages/homeicon.png')}
              />
            </View>
          )}
        </View>
      </View>
    );
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
        <View
          style={[
            styles.startWrap,
            phase === 'playing' && { justifyContent: 'flex-start' },
            (phase === 'results' || phase === 'intermediate') && {
              justifyContent: 'flex-end',
              flex: 1,
            },
          ]}
        >
          {phase === 'start' && (
            <View style={styles.centerArea}>
              <Image
                source={require('../../assets/orbizImages/oboardimg1.png')}
              />
              <ImageBackground
                source={require('../../assets/orbizUi/orbizBoard.png')}
                style={styles.orbizBoard}
              >
                <View style={{ paddingHorizontal: 20 }}>
                  <Text style={styles.orbizTxt}>Ready to Start?</Text>
                  <Text style={styles.orbizSecTxt}>
                    A fast, sweet brain-challenge game you play in seconds. Pick
                    a mode, beat the task, and race your friends for the highest
                    score.
                  </Text>
                </View>
              </ImageBackground>
              <View style={{ gap: 15, top: -40 }}>
                <CustomRoundButton
                  onPress={() => {
                    setPhase('setup');
                    if (isEnabledNotifications)
                      Toast.show({
                        text1: 'Game setup started! Choose your settings.',
                      });
                  }}
                  btnImage={require('../../assets/orbizImages/orbizPlay.png')}
                />
                <CustomRoundButton
                  onPress={() => navigation.goBack()}
                  btnImage={require('../../assets/orbizImages/homeicon.png')}
                />
              </View>
              <Image
                source={require('../../assets/orbizImages/gameBubble1.png')}
                style={{ position: 'absolute', right: 0, top: 90 }}
              />
              <Image
                source={require('../../assets/orbizImages/gameBubble2.png')}
                style={{ position: 'absolute', left: 0, top: 0 }}
              />
            </View>
          )}

          {phase === 'setup' && (
            <View style={styles.centerArea}>
              <View style={styles.topBubble}>
                <Image
                  source={require('../../assets/orbizImages/settingsBubble.png')}
                  style={{ marginTop: 30 }}
                />
              </View>
              <ImageBackground
                source={require('../../assets/orbizUi/orbizSetupBoard.png')}
                style={styles.orbizSetupBoard}
                resizeMode="contain"
              >
                <View style={{ paddingHorizontal: 20, alignItems: 'center' }}>
                  <Text style={[styles.orbizTxt, { marginBottom: 20 }]}>
                    Game Setup
                  </Text>
                  <View style={styles.settingRow}>
                    <Text style={styles.settingLabel}>Players:</Text>
                    <View style={styles.chevRow}>
                      <TouchableOpacity
                        style={styles.chevBtn}
                        onPress={() => changePlayerCount(-1)}
                      >
                        <Image
                          source={require('../../assets/orbizUi/prevarr.png')}
                        />
                      </TouchableOpacity>
                      <Text style={styles.settingValue}>{playerCount}</Text>
                      <TouchableOpacity
                        style={styles.chevBtn}
                        onPress={() => changePlayerCount(1)}
                      >
                        <Image
                          source={require('../../assets/orbizUi/nextarr.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.settingRow}>
                    <Text style={styles.settingLabel}>Rounds:</Text>
                    <View style={styles.chevRow}>
                      <TouchableOpacity
                        style={styles.chevBtn}
                        onPress={() => changeRounds(-1)}
                      >
                        <Image
                          source={require('../../assets/orbizUi/prevarr.png')}
                        />
                      </TouchableOpacity>
                      <Text style={styles.settingValue}>{rounds}</Text>
                      <TouchableOpacity
                        style={styles.chevBtn}
                        onPress={() => changeRounds(1)}
                      >
                        <Image
                          source={require('../../assets/orbizUi/nextarr.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.settingRow}>
                    <Text style={styles.settingLabel}>Mode:</Text>
                    <View style={styles.chevRow}>
                      <TouchableOpacity
                        style={styles.chevBtn}
                        onPress={() => changeMode(-1)}
                      >
                        <Image
                          source={require('../../assets/orbizUi/prevarr.png')}
                        />
                      </TouchableOpacity>
                      <Text style={styles.settingValue}>{mode}</Text>
                      <TouchableOpacity
                        style={styles.chevBtn}
                        onPress={() => changeMode(1)}
                      >
                        <Image
                          source={require('../../assets/orbizUi/nextarr.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ImageBackground>
              <View style={{ gap: 15, top: -40 }}>
                <CustomRoundButton
                  onPress={goToNames}
                  btnImage={require('../../assets/orbizImages/orbizPlay.png')}
                />
                <CustomRoundButton
                  onPress={() => navigation.goBack()}
                  btnImage={require('../../assets/orbizImages/homeicon.png')}
                />
              </View>
            </View>
          )}

          {phase === 'names' && (
            <View style={styles.centerArea}>
              <View style={styles.topBubble}>
                <Image
                  source={require('../../assets/orbizImages/settingsBubble.png')}
                  style={{ marginTop: 30 }}
                />
              </View>
              <ImageBackground
                source={require('../../assets/orbizUi/orbizSetupBoard.png')}
                style={styles.orbizSetupBoard}
                resizeMode="contain"
              >
                <View
                  style={{
                    paddingHorizontal: 25,
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Text style={styles.cardTitle}>Players Names</Text>
                  <View style={{ width: '100%', marginTop: 6 }}>
                    {players.map((player, idx) => (
                      <View key={player.id} style={styles.playerRow}>
                        <Text style={styles.playerLabel}>
                          Player {idx + 1}:
                        </Text>
                        <TextInput
                          value={player.name}
                          maxLength={20}
                          onChangeText={t =>
                            setPlayers(prev =>
                              prev.map(pplayer =>
                                pplayer.id === player.id
                                  ? { ...pplayer, name: t }
                                  : pplayer,
                              ),
                            )
                          }
                          style={[
                            styles.nameInput,
                            nameErrors[player.id] ? styles.inputError : null,
                          ]}
                        />
                      </View>
                    ))}
                  </View>
                </View>
              </ImageBackground>
              <View style={{ gap: 15, top: -40 }}>
                <CustomRoundButton
                  onPress={handlePlayOrbizGame}
                  btnImage={require('../../assets/orbizImages/orbizPlay.png')}
                  isDisabled={!canProceedFromNames()}
                  width={53}
                  height={53}
                />
                <CustomRoundButton
                  onPress={() => navigation.goBack()}
                  btnImage={require('../../assets/orbizImages/homeicon.png')}
                  width={53}
                  height={53}
                />
              </View>
            </View>
          )}

          {phase === 'playing' && (
            <View style={styles.playArea}>
              <Text style={styles.playerNameTitle}>
                {currentPlayer.name || 'Player'}
              </Text>
              {!showQuestionSection &&
                !currentTask &&
                mode !== 'Mystery Orb' && (
                  <Text
                    style={{
                      color: '#2B2B2B',
                      fontSize: 20,
                      fontFamily: 'Sansation-Bold',
                      marginBottom: 120,
                    }}
                  >
                    Tap Category once you are ready
                  </Text>
                )}
              <View style={styles.orbRow}>
                {!chosenOrb ? (
                  <>
                    <View style={styles.orbColumn}>
                      <TouchableOpacity
                        onPress={() => selectOrb('easy')}
                        style={styles.smallOrbWrap}
                        disabled={mode === 'Mystery Orb'}
                      >
                        <Image
                          source={gameOrbs.easy.img}
                          style={styles.centerOrbImg}
                        />
                      </TouchableOpacity>
                      {mode !== 'Mystery Orb' && (
                        <Text style={styles.orbLabel}>Easy</Text>
                      )}
                    </View>
                    <View style={styles.orbColumn}>
                      <TouchableOpacity
                        onPress={() => selectOrb('medium')}
                        style={styles.centerOrbWrap}
                        disabled={mode === 'Mystery Orb'}
                      >
                        <Image
                          source={gameOrbs.medium.img}
                          style={styles.centerOrbImg}
                        />
                      </TouchableOpacity>
                      {mode !== 'Mystery Orb' && (
                        <Text style={styles.orbLabel}>Medium</Text>
                      )}
                    </View>
                    <View style={styles.orbColumn}>
                      <TouchableOpacity
                        onPress={() => selectOrb('hard')}
                        style={styles.smallOrbWrap}
                        disabled={mode === 'Mystery Orb'}
                      >
                        <Image
                          source={gameOrbs.hard.img}
                          style={styles.centerOrbImg}
                        />
                      </TouchableOpacity>
                      {mode !== 'Mystery Orb' && (
                        <Text style={styles.orbLabel}>Hard</Text>
                      )}
                    </View>
                  </>
                ) : (
                  !showQuestionSection && <View />
                )}
              </View>

              <View style={styles.taskAreaPlaying}>
                {showQuestionSection && currentTask ? (
                  <>
                    <View>
                      <ImageBackground
                        source={require('../../assets/orbizUi/orbizQuestBoard.png')}
                        style={styles.orbizQuestBoard}
                        resizeMode="contain"
                      >
                        <View
                          style={{
                            paddingHorizontal: 25,
                            alignItems: 'center',
                            width: '100%',
                          }}
                        >
                          <Text style={styles.taskTextPlaying}>
                            {currentTask}
                          </Text>
                        </View>
                      </ImageBackground>

                      {optionsVisible && (
                        <View
                          style={{
                            gap: 25,
                            top: -40,
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}
                        >
                          <CustomRoundButton
                            onPress={() => handleDecision(false)}
                            btnImage={require('../../assets/orbizImages/noIcon.png')}
                          />
                          <CustomRoundButton
                            onPress={() => handleDecision(true)}
                            btnImage={require('../../assets/orbizImages/yesIcon.png')}
                          />
                        </View>
                      )}
                    </View>

                    {timerSeconds >= 1 && (
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Image
                          source={require('../../assets/orbizImages/timer.gif')}
                          style={{
                            width: 150,
                            height: 150,
                            marginTop: 30,
                            marginBottom: 30,
                          }}
                        />

                        <Text style={styles.timerTx}>{timerSeconds}</Text>
                      </View>
                    )}
                  </>
                ) : (
                  <Text style={styles.helperText} />
                )}
              </View>

              <View style={{ flex: 1, justifyContent: 'flex-end', gap: 15 }}>
                {!chosenOrb && mode === 'Mystery Orb' && (
                  <CustomRoundButton
                    onPress={handleSpin}
                    width={53}
                    height={53}
                    btnImage={require('../../assets/orbizImages/orbizPlay.png')}
                    isDisabled={spinAnimating || timerRunning}
                  />
                )}
                <CustomRoundButton
                  onPress={() => navigation.goBack()}
                  width={53}
                  height={53}
                  btnImage={require('../../assets/orbizImages/homeicon.png')}
                />
              </View>
            </View>
          )}

          {phase === 'intermediate' && (
            <ResultsOrbizGameCard title="Current Results" showTrophy={false} />
          )}

          {phase === 'results' && (
            <View>
              <ResultsOrbizGameCard title="Final Results" showTrophy={true} />
              {winVisible && (
                <Image
                  source={require('../../assets/orbizImages/win.gif')}
                  style={{
                    width: 380,
                    height: 380,
                    position: 'absolute',
                    top: 50,
                    left: -20,
                  }}
                />
              )}
            </View>
          )}

          {confettiVisible && (
            <View style={styles.confetti}>
              <Image
                source={require('../../assets/orbizImages/confetti.gif')}
                style={{ width: 380, height: 380 }}
              />
            </View>
          )}

          {revealSelected && chosenOrb && (
            <View style={styles.revealOverlay} pointerEvents="none">
              <Image
                source={gameOrbs[chosenOrb].img}
                style={styles.revealOrbImg}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  rootWrap: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 36 : 18,
    paddingBottom: 60,
  },
  startWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
    flex: 1,
  },
  orbizSetupBoard: {
    width: 335,
    height: 409,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
  orbLabel: {
    color: '#2B2B2B',
    fontSize: 20,
    fontFamily: 'Sansation-Bold',
    textAlign: 'center',
    marginTop: 12,
  },
  timerTx: {
    color: '#f461beff',
    fontSize: 56,
    textAlign: 'center',
    position: 'absolute',
    fontFamily: 'Sansation-Bold',
    zIndex: 120,
  },
  revealOrbImg: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  orbColumn: { alignItems: 'center', marginTop: 90 },
  orbizBoard: {
    width: 359,
    height: 261,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  header: {
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  statusTitle: { color: '#fff', fontSize: 14 },
  centerArea: { width: '100%', alignItems: 'center' },
  bigTitle: {
    textAlign: 'center',
    color: '#ffb703',
    fontSize: 42,
    fontWeight: '900',
    lineHeight: 44,
  },
  orbizQuestBoard: {
    width: 337,
    minHeight: 194,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Sansation-Bold',
  },
  cardText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 6,
  },
  topBubble: { marginTop: 6, marginBottom: 6, alignItems: 'center' },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    gap: 12,
    justifyContent: 'center',
  },
  playerLabel: {
    color: '#fff',
    width: 72,
    fontFamily: 'Sansation-Bold',
    fontSize: 18,
  },
  nameInput: {
    backgroundColor: '#D9D9D9',
    width: 150,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 5 : 5,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    fontSize: 16,
    fontFamily: 'Sansation-Bold',
    color: '#333333',
  },
  inputError: { borderColor: '#FF0707', borderWidth: 2 },
  settingRow: { width: '100%', alignItems: 'center', marginTop: 10 },
  settingLabel: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Sansation-Bold',
    marginBottom: 3,
  },
  settingValue: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Sansation-Bold',
    marginHorizontal: 12,
  },
  chevRow: { flexDirection: 'row', alignItems: 'center' },
  chevBtn: { padding: 8, borderRadius: 8 },
  playArea: { width: '100%', alignItems: 'center', paddingTop: 80, flex: 1 },
  playerNameTitle: {
    color: '#2B2B2B',
    fontSize: 22,
    fontFamily: 'Sansation-Bold',
    marginBottom: 18,
  },
  orbRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 18,
  },
  smallOrbWrap: { alignItems: 'center' },
  smallOrbImg: { width: 64, height: 64, resizeMode: 'contain' },
  centerOrbWrap: { alignItems: 'center' },
  centerOrbImg: { width: 110, height: 110, resizeMode: 'contain' },
  spinBtnMain: {
    backgroundColor: '#264653',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginTop: 12,
  },
  taskAreaPlaying: { marginTop: 18, width: '86%', alignItems: 'center' },
  taskTextPlaying: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Sansation-Bold',
  },
  timerText: { color: '#f4a261', fontSize: 16, fontWeight: '700' },
  helperText: { color: '#bdbdbd', fontStyle: 'italic' },
  homeBtnBelow: { marginTop: 26 },
  resultsBox: {
    width: '100%',
    backgroundColor: 'transparent',
    padding: 16,
    alignItems: 'center',
  },
  scoreRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  confetti: {
    position: 'absolute',
    top: '12%',
    alignSelf: 'center',
    zIndex: 1000,
  },
  revealOverlay: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2000,
  },
  revealOrbImg: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginTop: 180,
  },
});
