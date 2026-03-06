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

const BG = require('../../assets/orbizImages/orbizMainBack.png');
const ENTRIES_PER_PAGE = 7;

const makeFormttdDate = ts =>
  new Date(ts).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

const makeFormattedTime = ts =>
  new Date(ts).toLocaleTimeString('uk-UA', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

const LeaderboardScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('orbParty');
  const [page, setPage] = useState(0);
  const [orbPartyRows, setOrbPartyRows] = useState([]);
  const [sequenceRows, setSequenceRows] = useState([]);
  const orbTabScale = useRef(new Animated.Value(1)).current;
  const sequenceTabScale = useRef(new Animated.Value(1)).current;
  const prevArrowScale = useRef(new Animated.Value(1)).current;
  const nextArrowScale = useRef(new Animated.Value(1)).current;
  const homeScale = useRef(new Animated.Value(1)).current;

  const getSavedOrbsDtta = useCallback(async () => {
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
      getSavedOrbsDtta();
    }, [getSavedOrbsDtta]),
  );

  const visibleRows = useMemo(() => {
    const rows = activeTab === 'orbParty' ? orbPartyRows : sequenceRows;
    const start = page * ENTRIES_PER_PAGE;
    return rows.slice(start, start + ENTRIES_PER_PAGE);
  }, [activeTab, orbPartyRows, page, sequenceRows]);

  const totalRows =
    activeTab === 'orbParty' ? orbPartyRows.length : sequenceRows.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / ENTRIES_PER_PAGE));
  const showPager = totalRows > ENTRIES_PER_PAGE;

  const selectTab = tab => {
    setActiveTab(tab);
    setPage(0);
  };

  const onPrevPage = () => setPage(prev => Math.max(prev - 1, 0));
  const onNextPage = () => setPage(prev => Math.min(prev + 1, totalPages - 1));

  const animatePressIn = scaleValue => {
    Animated.spring(scaleValue, {
      toValue: 0.93,
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
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.root}>
          <Image
            source={require('../../assets/orbizImages/orbztrtleadr.png')}
            style={{ zIndex: 100 }}
          />

          <View style={styles.tabsWrap}>
            <Animated.View style={{ transform: [{ scale: orbTabScale }] }}>
              <TouchableOpacity
                onPress={() => selectTab('orbParty')}
                onPressIn={() => animatePressIn(orbTabScale)}
                onPressOut={() => animatePressOut(orbTabScale)}
                activeOpacity={0.9}
                style={styles.tabTouchable}
              >
                <ImageBackground
                  source={require('../../assets/orbizUi/orbizQuestBoard.png')}
                  resizeMode="stretch"
                  style={[
                    styles.tabButton,
                    activeTab !== 'orbParty' && styles.tabInactive,
                  ]}
                >
                  <Image
                    source={require('../../assets/orbizImages/orbztrtlsqqns.png')}
                    style={[
                      activeTab !== 'orbParty' && { width: 87, height: 40 },
                    ]}
                  />
                </ImageBackground>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={{ transform: [{ scale: sequenceTabScale }] }}>
              <TouchableOpacity
                onPress={() => selectTab('sequence')}
                onPressIn={() => animatePressIn(sequenceTabScale)}
                onPressOut={() => animatePressOut(sequenceTabScale)}
                activeOpacity={0.9}
                style={styles.tabTouchable}
              >
                <ImageBackground
                  source={require('../../assets/orbizUi/orbizQuestBoard.png')}
                  resizeMode="stretch"
                  style={[
                    styles.tabButton,
                    activeTab !== 'sequence' && styles.tabInactive,
                  ]}
                >
                  <Image
                    source={require('../../assets/orbizImages/orbztrtpartymdd.png')}
                    style={[
                      activeTab !== 'sequence' && { width: 56, height: 51 },
                    ]}
                  />
                </ImageBackground>
              </TouchableOpacity>
            </Animated.View>
          </View>

          <ImageBackground
            source={require('../../assets/orbizUi/orbizSetupBoard.png')}
            style={styles.tableBoard}
            resizeMode="stretch"
          >
            {activeTab === 'orbParty' ? (
              <View style={styles.listWrap}>
                {visibleRows.length > 0 ? (
                  visibleRows.map((row, index) => (
                    <View key={`${row.name}-${index}`} style={styles.rowLine}>
                      <Text style={styles.rowName}>{row.name}</Text>
                      <Text style={styles.rowScore}>{row.score}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.emptyText}>
                    No Orb Party results yet.
                  </Text>
                )}
              </View>
            ) : (
              <View style={styles.listWrap}>
                <View style={styles.sequenceHeader}>
                  <Text style={styles.headerCell}>Time</Text>
                  <Text style={styles.headerCell}>Date</Text>
                  <Text style={styles.headerCell}>Score</Text>
                </View>
                {visibleRows.length > 0 ? (
                  visibleRows.map((row, index) => (
                    <View key={`${row.id}-${index}`} style={styles.sequenceRow}>
                      <Text style={styles.sequenceCell}>
                        {makeFormattedTime(row.createdAt)}
                      </Text>
                      <Text style={styles.sequenceCell}>
                        {makeFormttdDate(row.createdAt)}
                      </Text>
                      <Text style={styles.sequenceCell}>{row.score}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.emptyText}>
                    No Sequence Lab results yet.
                  </Text>
                )}
              </View>
            )}

            {showPager && (
              <View style={styles.pagerWrap}>
                <Animated.View
                  style={{ transform: [{ scale: prevArrowScale }] }}
                >
                  <TouchableOpacity
                    onPress={onPrevPage}
                    onPressIn={() => animatePressIn(prevArrowScale)}
                    onPressOut={() => animatePressOut(prevArrowScale)}
                    disabled={page === 0}
                  >
                    <Image
                      source={require('../../assets/orbizUi/prevarr.png')}
                      style={[styles.arrow, page === 0 && styles.arrowDisabled]}
                    />
                  </TouchableOpacity>
                </Animated.View>
                <Animated.View
                  style={{ transform: [{ scale: nextArrowScale }] }}
                >
                  <TouchableOpacity
                    onPress={onNextPage}
                    onPressIn={() => animatePressIn(nextArrowScale)}
                    onPressOut={() => animatePressOut(nextArrowScale)}
                    disabled={page >= totalPages - 1}
                  >
                    <Image
                      source={require('../../assets/orbizUi/nextarr.png')}
                      style={[
                        styles.arrow,
                        page >= totalPages - 1 && styles.arrowDisabled,
                      ]}
                    />
                  </TouchableOpacity>
                </Animated.View>
              </View>
            )}
          </ImageBackground>

          <View style={styles.homeWrap}>
            <Animated.View style={{ transform: [{ scale: homeScale }] }}>
              <CustomRoundButton
                onPress={() => navigation.goBack()}
                onPressIn={() => animatePressIn(homeScale)}
                onPressOut={() => animatePressOut(homeScale)}
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
  bg: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 22,
  },
  logoText: {
    fontSize: 44,
    color: '#FFB100',
    fontFamily: 'Sansation-Bold',
    textShadowColor: '#5D0BAA',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 0,
  },
  tabsWrap: {
    marginTop: 34,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
  },
  tabTouchable: {
    width: 177,
    alignItems: 'center',
  },
  tabButton: {
    width: 177,
    height: 85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabInactive: { opacity: 0.45 },
  tabButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Sansation-Bold',
    lineHeight: 16,
  },
  tableBoard: {
    width: 335,
    height: 409,
    marginTop: 26,
    paddingTop: 44,
    paddingBottom: 18,
    alignItems: 'center',
  },
  listWrap: {
    width: '85%',
    minHeight: 280,
    alignItems: 'center',
  },
  rowLine: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  rowName: {
    color: '#FFFFFF',
    fontSize: 34,
    fontFamily: 'Sansation-Bold',
  },
  rowScore: {
    color: '#FFFFFF',
    fontSize: 34,
    fontFamily: 'Sansation-Bold',
  },
  sequenceHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    paddingTop: 10,
  },
  headerCell: {
    width: '33%',
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Sansation-Bold',
  },
  sequenceRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  sequenceCell: {
    width: '33%',
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Sansation-Bold',
    textAlign: 'center',
  },
  emptyText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 24,
    fontSize: 18,
    fontFamily: 'Sansation-Regular',
  },
  pagerWrap: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 26,
    alignItems: 'center',
  },
  arrow: {
    width: 26,
    height: 26,
  },
  arrowDisabled: { opacity: 0.3 },
  homeWrap: {
    marginTop: 16,
  },
});

export default LeaderboardScreen;
