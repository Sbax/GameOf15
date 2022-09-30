/**
 * @format
 */

import React from 'react';
import 'react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {render, fireEvent, screen} from '@testing-library/react-native';
import {useSquares} from '../src/hooks/useSquares';
import {Text, View} from 'react-native';

export default function UseSquaresTest({initialArrangement}) {
  const {arrangement, totalMoves, winState, Square} = useSquares(
    null,
    null,
    initialArrangement,
  );

  return (
    <View>
      <Text testID="arrangementValue">{JSON.stringify(arrangement)}</Text>
      <Text testID="totalMovesValue">{totalMoves.toString()}</Text>
      <Text testID="winStateValue">{winState.toString()}</Text>
      <View testID="squares">
        {arrangement.map((number, position) => (
          <Square key={number} number={number} position={position} />
        ))}
      </View>
    </View>
  );
}

it('useSquares starts with 0 moves and winState false', () => {
  render(<UseSquaresTest />);

  const totalMovesValue = screen.getByTestId('totalMovesValue');
  const winStateValue = screen.getByTestId('winStateValue');

  expect(totalMovesValue).toHaveTextContent('0');
  expect(winStateValue).toHaveTextContent('false');
});

it('Squares react to presses and can win the game', async () => {
  render(
    <UseSquaresTest
      initialArrangement={[
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        null,
        15,
      ]}
    />,
  );

  const totalMovesValue = screen.getByTestId('totalMovesValue');
  const winStateValue = screen.getByTestId('winStateValue');
  const arrangementValue = screen.getByTestId('arrangementValue');

  const squares = screen.getByTestId('squares').children;
  const lastSquare = squares[squares.length - 1];
  const text = await lastSquare.findByType(Text);
  fireEvent.press(text);

  expect(totalMovesValue).toHaveTextContent('1');
  expect(winStateValue).toHaveTextContent('true');
});
