import React, { createContext, useContext, useState, useCallback } from 'react';

export const StoreContext = createContext(undefined);

export const useOrbizTreatStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({ children }) => {
  // states

  const [unlockedIds, setUnlockedIds] = useState([]);
  const [isEnabledMusic, setIsEnabledMusic] = useState(false);
  const [isEnabledNotifications, setIsEnabledNotifications] = useState(false);
  const [gamesCompleted, setGamesCompleted] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [consecutiveScoringRounds, setConsecutiveScoringRounds] = useState(0);
  const [partyRoundsPlayed, setPartyRoundsPlayed] = useState(0);
  const [hardSuccessCount, setHardSuccessCount] = useState(0);

  const unlockAchievement = useCallback(id => {
    setUnlockedIds(prev => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  }, []);

  const evaluateAchievements = useCallback(
    (stats = {}) => {
      const gcompl = stats.gamesCompleted ?? gamesCompleted;
      const tscore = stats.totalScore ?? totalScore;
      const streak = stats.consecutiveScoringRounds ?? consecutiveScoringRounds;
      const party = stats.partyRoundsPlayed ?? partyRoundsPlayed;
      const hardLvl = stats.hardSuccessCount ?? hardSuccessCount;

      // Achievements =>

      // 1: Star Winner
      if (gcompl >= 1) unlockAchievement(1);
      // 2: Sweet Bomb
      if (streak >= 5) unlockAchievement(2);
      // 3: Lollipop Pro
      if (tscore >= 50) unlockAchievement(3);
      // 4: Grape Squad
      if (party >= 10) unlockAchievement(4);
      // 5: Watermelon Brain
      if (hardLvl >= 1) unlockAchievement(5);
      // 6: Plum Veteran
      if (gcompl >= 10) unlockAchievement(6);
    },
    [
      gamesCompleted,
      totalScore,
      consecutiveScoringRounds,
      partyRoundsPlayed,
      hardSuccessCount,
      unlockAchievement,
    ],
  );

  const recordRound = useCallback(
    ({
      scored = false,
      points = 0,
      mode: roundMode = 'Manual',
      difficulty = 'easy',
    }) => {
      setTotalScore(prev => {
        const newTotal = prev + (scored ? points : 0);

        return newTotal;
      });

      setConsecutiveScoringRounds(prev => {
        const newStreak = scored ? prev + 1 : 0;

        evaluateAchievements({ consecutiveScoringRounds: newStreak });
        return newStreak;
      });

      setPartyRoundsPlayed(prev => {
        const newPartyRound =
          roundMode === 'Party' && scored
            ? prev + 1
            : roundMode === 'Party' && !scored
            ? prev + 1
            : prev;

        evaluateAchievements({ partyRoundsPlayed: newPartyRound });
        return newPartyRound;
      });

      if (scored && difficulty === 'hard') {
        setHardSuccessCount(prev => {
          const newHard = prev + 1;
          evaluateAchievements({ hardSuccessCount: newHard });
          return newHard;
        });
      } else {
        evaluateAchievements();
      }
    },
    [evaluateAchievements],
  );

  const recordGameCompleted = useCallback(() => {
    setGamesCompleted(prevState => {
      const newGc = prevState + 1;

      evaluateAchievements({ gamesCompleted: newGc });
      return newGc;
    });
  }, [evaluateAchievements]);

  const resetStore = useCallback(() => {
    setUnlockedIds([]);
    setGamesCompleted(0);
    setTotalScore(0);
    setConsecutiveScoringRounds(0);
    setPartyRoundsPlayed(0);
    setHardSuccessCount(0);
  }, []);

  const contextValues = {
    unlockedIds,
    unlockAchievement,
    gamesCompleted,
    totalScore,
    consecutiveScoringRounds,
    partyRoundsPlayed,
    hardSuccessCount,
    recordRound,
    recordGameCompleted,
    evaluateAchievements,
    resetStore,
    isEnabledMusic,
    setIsEnabledMusic,
    isEnabledNotifications,
    setIsEnabledNotifications,
  };

  return (
    <StoreContext.Provider value={contextValues}>
      {children}
    </StoreContext.Provider>
  );
};
