//orbiz leaderboard screen

import {
  getOrbPartyResults,
  getSequenceLabResults,
} from '../[treatbrainstoragge]/leaderboardStorage';

import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useMemo, useRef, useState } from 'react';

import CustomRoundButton from '../[treatbraincmppnts]/CustomRoundButton';

const sweetOrbsBG = require('../../assets/orbizImages/orbizMainBack.png');
const sweetOrbsENTRIES_PER_PAGE = 7;

const sweetOrbsMakeFormttdDate = ts =>
  new Date(ts).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

const sweetOrbsMakeFormattedTime = ts =>
  new Date(ts).toLocaleTimeString('uk-UA', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

const LeaderboardScreen = () => {
  const navigation = useNavigation();
  const [sweetOrbsActiveTab, setActiveTab] = useState('orbParty');
  const [sweetOrbsPage, setPage] = useState(0);
  const [sweetOrbsOrbPartyRows, setOrbPartyRows] = useState([]);
  const [sweetOrbsSequenceRows, setSequenceRows] = useState([]);
  const sweetOrbsOrbTabScale = useRef(new Animated.Value(1)).current;
  const sweetOrbsSequenceTabScale = useRef(new Animated.Value(1)).current;
  const sweetOrbsPrevArrowScale = useRef(new Animated.Value(1)).current;
  const sweetOrbsNextArrowScale = useRef(new Animated.Value(1)).current;
  const sweetOrbsHomeScale = useRef(new Animated.Value(1)).current;

  const sweetOrbsGetSavedOrbsDtta = useCallback(async () => {
    const [orbData, sequenceData] = await Promise.all([
      getOrbPartyResults(),
      getSequenceLabResults(),
    ]);

    const mergedPlayers = Object.values(
      orbData.reduce((acc, row) => {
        const key = row.name.toLowerCase();
        if (!acc[key] || row.score > acc[key].score) {
          acc[key] = { name: row.name, score: row.score };
        }
        return acc;
      }, {}),
    ).sort((a, b) => b.score - a.score);

    const sequenceSorted = [...sequenceData].sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.createdAt - a.createdAt;
    });

    setOrbPartyRows(mergedPlayers);
    setSequenceRows(sequenceSorted);
    setPage(0);
  }, []);

  useFocusEffect(
    useCallback(() => {
      sweetOrbsGetSavedOrbsDtta();
    }, [sweetOrbsGetSavedOrbsDtta]),
  );

  const sweetOrbsVisibleRows = useMemo(() => {
    const rows =
      sweetOrbsActiveTab === 'orbParty'
        ? sweetOrbsOrbPartyRows
        : sweetOrbsSequenceRows;
    const start = sweetOrbsPage * sweetOrbsENTRIES_PER_PAGE;
    return rows.slice(start, start + sweetOrbsENTRIES_PER_PAGE);
  }, [
    sweetOrbsActiveTab,
    sweetOrbsOrbPartyRows,
    sweetOrbsPage,
    sweetOrbsSequenceRows,
  ]);

  const sweetOrbsTotalRows =
    sweetOrbsActiveTab === 'orbParty'
      ? sweetOrbsOrbPartyRows.length
      : sweetOrbsSequenceRows.length;
  const sweetOrbsTotalPages = Math.max(
    1,
    Math.ceil(sweetOrbsTotalRows / sweetOrbsENTRIES_PER_PAGE),
  );
  const sweetOrbsShowPager = sweetOrbsTotalRows > sweetOrbsENTRIES_PER_PAGE;

  const sweetOrbsSelectTab = tab => {
    setActiveTab(tab);
    setPage(0);
  };

  const sweetOrbsOnPrevPage = () => setPage(prev => Math.max(prev - 1, 0));
  const sweetOrbsOnNextPage = () =>
    setPage(prev => Math.min(prev + 1, sweetOrbsTotalPages - 1));

  const sweetOrbsAnimatePressIn = scaleValue => {
    Animated.spring(scaleValue, {
      toValue: 0.93,
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
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sweetOrbsRoot}>
          <Image
            source={require('../../assets/orbizImages/orbztrtleadr.png')}
            style={{ zIndex: 100 }}
          />

          <View style={styles.sweetOrbsTabsWrap}>
            <Animated.View
              style={{ transform: [{ scale: sweetOrbsOrbTabScale }] }}
            >
              <TouchableOpacity
                onPress={() => sweetOrbsSelectTab('orbParty')}
                onPressIn={() => sweetOrbsAnimatePressIn(sweetOrbsOrbTabScale)}
                onPressOut={() =>
                  sweetOrbsAnimatePressOut(sweetOrbsOrbTabScale)
                }
                activeOpacity={0.9}
                style={styles.sweetOrbsTabTouchable}
              >
                <ImageBackground
                  source={require('../../assets/orbizUi/orbizQuestBoard.png')}
                  resizeMode="stretch"
                  style={[
                    styles.sweetOrbsTabButton,
                    sweetOrbsActiveTab !== 'orbParty' &&
                      styles.sweetOrbsTabInactive,
                  ]}
                >
                  <Image
                    source={require('../../assets/orbizImages/orbztrtlsqqns.png')}
                    style={[
                      sweetOrbsActiveTab !== 'orbParty' && {
                        width: 87,
                        height: 40,
                      },
                    ]}
                  />
                </ImageBackground>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              style={{ transform: [{ scale: sweetOrbsSequenceTabScale }] }}
            >
              <TouchableOpacity
                onPress={() => sweetOrbsSelectTab('sequence')}
                onPressIn={() =>
                  sweetOrbsAnimatePressIn(sweetOrbsSequenceTabScale)
                }
                onPressOut={() =>
                  sweetOrbsAnimatePressOut(sweetOrbsSequenceTabScale)
                }
                activeOpacity={0.9}
                style={styles.sweetOrbsTabTouchable}
              >
                <ImageBackground
                  source={require('../../assets/orbizUi/orbizQuestBoard.png')}
                  resizeMode="stretch"
                  style={[
                    styles.sweetOrbsTabButton,
                    sweetOrbsActiveTab !== 'sequence' &&
                      styles.sweetOrbsTabInactive,
                  ]}
                >
                  <Image
                    source={require('../../assets/orbizImages/orbztrtpartymdd.png')}
                    style={[
                      sweetOrbsActiveTab !== 'sequence' && {
                        width: 56,
                        height: 51,
                      },
                    ]}
                  />
                </ImageBackground>
              </TouchableOpacity>
            </Animated.View>
          </View>

          <ImageBackground
            source={require('../../assets/orbizUi/orbizSetupBoard.png')}
            style={styles.sweetOrbsTableBoard}
            resizeMode="stretch"
          >
            {sweetOrbsActiveTab === 'orbParty' ? (
              <View style={styles.sweetOrbsListWrap}>
                {sweetOrbsVisibleRows.length > 0 ? (
                  sweetOrbsVisibleRows.map((row, index) => (
                    <View
                      key={`${row.name}-${index}`}
                      style={styles.sweetOrbsRowLine}
                    >
                      <Text style={styles.sweetOrbsRowName}>{row.name}</Text>
                      <Text style={styles.sweetOrbsRowScore}>{row.score}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.sweetOrbsEmptyText}>
                    No Orb Party results yet.
                  </Text>
                )}
              </View>
            ) : (
              <View style={styles.sweetOrbsListWrap}>
                <View style={styles.sweetOrbsSequenceHeader}>
                  <Text style={styles.sweetOrbsHeaderCell}>Time</Text>
                  <Text style={styles.sweetOrbsHeaderCell}>Date</Text>
                  <Text style={styles.sweetOrbsHeaderCell}>Score</Text>
                </View>
                {sweetOrbsVisibleRows.length > 0 ? (
                  sweetOrbsVisibleRows.map((row, index) => (
                    <View
                      key={`${row.id}-${index}`}
                      style={styles.sweetOrbsSequenceRow}
                    >
                      <Text style={styles.sweetOrbsSequenceCell}>
                        {sweetOrbsMakeFormattedTime(row.createdAt)}
                      </Text>
                      <Text style={styles.sweetOrbsSequenceCell}>
                        {sweetOrbsMakeFormttdDate(row.createdAt)}
                      </Text>
                      <Text style={styles.sweetOrbsSequenceCell}>
                        {row.score}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.sweetOrbsEmptyText}>
                    No Sequence Lab results yet.
                  </Text>
                )}
              </View>
            )}

            {sweetOrbsShowPager && (
              <View style={styles.sweetOrbsPagerWrap}>
                <Animated.View
                  style={{ transform: [{ scale: sweetOrbsPrevArrowScale }] }}
                >
                  <TouchableOpacity
                    onPress={sweetOrbsOnPrevPage}
                    onPressIn={() =>
                      sweetOrbsAnimatePressIn(sweetOrbsPrevArrowScale)
                    }
                    onPressOut={() =>
                      sweetOrbsAnimatePressOut(sweetOrbsPrevArrowScale)
                    }
                    disabled={sweetOrbsPage === 0}
                  >
                    <Image
                      source={require('../../assets/orbizUi/prevarr.png')}
                      style={[
                        styles.sweetOrbsArrow,
                        sweetOrbsPage === 0 && styles.sweetOrbsArrowDisabled,
                      ]}
                    />
                  </TouchableOpacity>
                </Animated.View>
                <Animated.View
                  style={{ transform: [{ scale: sweetOrbsNextArrowScale }] }}
                >
                  <TouchableOpacity
                    onPress={sweetOrbsOnNextPage}
                    onPressIn={() =>
                      sweetOrbsAnimatePressIn(sweetOrbsNextArrowScale)
                    }
                    onPressOut={() =>
                      sweetOrbsAnimatePressOut(sweetOrbsNextArrowScale)
                    }
                    disabled={sweetOrbsPage >= sweetOrbsTotalPages - 1}
                  >
                    <Image
                      source={require('../../assets/orbizUi/nextarr.png')}
                      style={[
                        styles.sweetOrbsArrow,
                        sweetOrbsPage >= sweetOrbsTotalPages - 1 &&
                          styles.sweetOrbsArrowDisabled,
                      ]}
                    />
                  </TouchableOpacity>
                </Animated.View>
              </View>
            )}
          </ImageBackground>

          <View style={styles.sweetOrbsHomeWrap}>
            <Animated.View
              style={{ transform: [{ scale: sweetOrbsHomeScale }] }}
            >
              <CustomRoundButton
                onPress={() => navigation.goBack()}
                onPressIn={() => sweetOrbsAnimatePressIn(sweetOrbsHomeScale)}
                onPressOut={() => sweetOrbsAnimatePressOut(sweetOrbsHomeScale)}
                btnImage={require('../../assets/orbizImages/homeicon.png')}
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
};

const styles = StyleSheet.create({
  sweetOrbsBg: { flex: 1 },
  sweetOrbsScrollContent: { flexGrow: 1 },
  sweetOrbsRoot: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 22,
  },
  sweetOrbsLogoText: {
    fontSize: 44,
    color: '#FFB100',
    fontFamily: 'Sansation-Bold',
    textShadowColor: '#5D0BAA',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 0,
  },
  sweetOrbsTabsWrap: {
    marginTop: 34,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
  },
  sweetOrbsTabTouchable: {
    width: 177,
    alignItems: 'center',
  },
  sweetOrbsTabButton: {
    width: 177,
    height: 85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sweetOrbsTabInactive: { opacity: 0.45 },
  sweetOrbsTabButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Sansation-Bold',
    lineHeight: 16,
  },
  sweetOrbsTableBoard: {
    width: 335,
    height: 409,
    marginTop: 26,
    paddingTop: 44,
    paddingBottom: 18,
    alignItems: 'center',
  },
  sweetOrbsListWrap: {
    width: '85%',
    minHeight: 280,
    alignItems: 'center',
  },
  sweetOrbsRowLine: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sweetOrbsRowName: {
    color: '#FFFFFF',
    fontSize: 34,
    fontFamily: 'Sansation-Bold',
  },
  sweetOrbsRowScore: {
    color: '#FFFFFF',
    fontSize: 34,
    fontFamily: 'Sansation-Bold',
  },
  sweetOrbsSequenceHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    paddingTop: 10,
  },
  sweetOrbsHeaderCell: {
    width: '33%',
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Sansation-Bold',
  },
  sweetOrbsSequenceRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  sweetOrbsSequenceCell: {
    width: '33%',
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Sansation-Bold',
    textAlign: 'center',
  },
  sweetOrbsEmptyText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 24,
    fontSize: 18,
    fontFamily: 'Sansation-Regular',
  },
  sweetOrbsPagerWrap: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 26,
    alignItems: 'center',
  },
  sweetOrbsArrow: {
    width: 26,
    height: 26,
  },
  sweetOrbsArrowDisabled: { opacity: 0.3 },
  sweetOrbsHomeWrap: {
    marginTop: 16,
  },
});

export default LeaderboardScreen;
