import React, {useEffect} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Wrapper from '../components/wrapper';
import {useSquares} from '../hooks/useSquares';
import {Screens} from './screens.enum';

const SQUARE_SIZE = 75;

function GameScreen({route, navigation}) {
  const {arrangement, totalMoves, winState, Square} = useSquares(SQUARE_SIZE);
  useEffect(() => {
    if (winState) {
      Alert.alert('Success!', 'Congratulations! You won!', [
        {
          text: 'OK',
          onPress: () =>
            navigation.replace(Screens.highScores, {score: totalMoves}),
        },
      ]);
    }
  }, [winState, totalMoves, navigation]);

  return (
    <Wrapper>
      <Text style={styles.counter}>Moves: {totalMoves}</Text>
      <View style={{width: SQUARE_SIZE * 4, height: SQUARE_SIZE * 4}}>
        {arrangement.map((number, position) => (
          <Square
            key={number}
            number={number}
            position={position}
            image={route?.params?.image}
          />
        ))}
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  counter: {
    padding: 20,
    fontSize: 32,
  },
});

export default GameScreen;
