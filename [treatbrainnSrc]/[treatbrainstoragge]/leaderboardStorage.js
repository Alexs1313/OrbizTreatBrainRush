import AsyncStorage from '@react-native-async-storage/async-storage';

const ORB_PARTY_KEY = 'orbizLeaderboardOrbParty';
const SEQUENCE_LAB_KEY = 'orbizLeaderboardSequenceLab';
const MAX_RECORDS = 120;

const safeRead = async key => {
  try {
    const raw = await AsyncStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

const safeWrite = async (key, records) => {
  await AsyncStorage.setItem(key, JSON.stringify(records));
};

export const getOrbPartyResults = async () => safeRead(ORB_PARTY_KEY);

export const getSequenceLabResults = async () => safeRead(SEQUENCE_LAB_KEY);

export const addOrbPartyResults = async players => {
  if (!Array.isArray(players) || players.length === 0) return;

  const existing = await safeRead(ORB_PARTY_KEY);
  const createdAt = Date.now();
  const nextBatch = players
    .filter(player => typeof player?.score === 'number')
    .map(player => ({
      id: `${createdAt}-${player.id ?? player.name ?? Math.random()}`,
      name: (player?.name || 'Player').trim() || 'Player',
      score: player.score,
      createdAt,
    }));

  if (nextBatch.length === 0) return;

  const merged = [...nextBatch, ...existing]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, MAX_RECORDS);

  await safeWrite(ORB_PARTY_KEY, merged);
};

export const addSequenceLabResult = async score => {
  if (typeof score !== 'number') return;

  const existing = await safeRead(SEQUENCE_LAB_KEY);
  const createdAt = Date.now();
  const nextRecord = {
    id: `${createdAt}-${Math.random()}`,
    score,
    createdAt,
  };

  const merged = [nextRecord, ...existing]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, MAX_RECORDS);

  await safeWrite(SEQUENCE_LAB_KEY, merged);
};
