import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect, useState} from 'react';

const HIGH_SCORES_KEY = '@game-of-15:high-scores';

const getHighScores = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(HIGH_SCORES_KEY);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
};

const saveHighScores = async highScores => {
  try {
    const jsonValue = JSON.stringify(highScores);
    await AsyncStorage.setItem(HIGH_SCORES_KEY, jsonValue);
  } catch (e) {
    console.error(e);
  }
};

export default function useHighScores() {
  const [highScores, setHighScoresState] = useState([]);

  const setHighScores = useCallback(
    highScores => {
      setHighScoresState(
        highScores.sort((a, b) => a.score - b.score).slice(0, 10),
      );
    },
    [setHighScoresState],
  );

  useEffect(() => {
    getHighScores().then(savedHighScores =>
      setHighScores(savedHighScores || []),
    );
  }, [setHighScores]);

  useEffect(() => {
    saveHighScores(highScores);
  }, [highScores]);

  return [highScores, setHighScores];
}
