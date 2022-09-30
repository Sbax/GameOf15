import {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const correctArrangement = [...Array.from({length: 15}, (_, i) => i + 1), null];

// Fisher-Yates algorith
const shuffleArray = input => {
  const copy = [...input];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }

  return copy;
};

const getCoordinates = position => {
  return {
    y: Math.floor(position / 4),
    x: ((position + 1) % 4 || 4) - 1,
  };
};

const checkIfMovable = (from, to) => {
  const sameRow = from.x === to.x;
  const sameColumn = from.y === to.y;

  const xDistance = Math.abs(from.x - to.x) <= 1;
  const yDistance = Math.abs(from.y - to.y) <= 1;

  return (sameColumn || sameRow) && xDistance && yDistance;
};

export function useSquares(squareSize, image, initialArrangementInput) {
  const initialArrangement =
    initialArrangementInput || shuffleArray(correctArrangement);

  const [arrangement, setArrangement] = useState(initialArrangement);
  const [winState, setWinState] = useState(false);
  const [totalMoves, setTotalMoves] = useState(0);

  useEffect(
    () =>
      setWinState(
        JSON.stringify(arrangement) === JSON.stringify(correctArrangement),
      ),
    [arrangement],
  );

  const moveItem = (number, position) => {
    const emptyPosition = arrangement.indexOf(null);
    if (
      !checkIfMovable(getCoordinates(position), getCoordinates(emptyPosition))
    ) {
      return;
    }

    const newArrangement = [...arrangement];
    newArrangement[emptyPosition] = number;
    newArrangement[position] = null;

    setTotalMoves(totalMoves + 1);
    setArrangement(newArrangement);
  };

  const Square = ({number, position, image}) => {
    const {x, y} = getCoordinates(position);
    const background = getCoordinates(number - 1);

    if (!number) {
      return;
    }

    return (
      <View
        style={[
          styles.square,
          {
            width: squareSize,
            height: squareSize,
            top: y * squareSize,
            left: x * squareSize,
            backgroundColor: Colors.light,
          },
        ]}>
        {image && (
          <ImageBackground
            source={image}
            resizeMode="center"
            style={{
              position: 'absolute',
              top: -(background.y * squareSize),
              left: -(background.x * squareSize),
              height: squareSize * 4,
              width: squareSize * 4,
            }}
          />
        )}

        <Text
          style={[
            styles.squareText,
            {
              fontSize: (squareSize * 55) / 100,
              width: squareSize,
              height: squareSize,
              color: Colors.lighter,
              textShadowColor: Colors.darker,
            },
          ]}
          onPress={() => moveItem(number, position)}>
          {number}
        </Text>
      </View>
    );
  };

  return {
    arrangement,
    winState,
    totalMoves,
    Square,
  };
}

const styles = StyleSheet.create({
  squares: {
    alignSelf: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

  square: {
    position: 'absolute',
    overflow: 'hidden',
  },

  squareText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 10,
  },
});
