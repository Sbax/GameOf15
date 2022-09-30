import {DefaultTheme} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import useHighScores from '../hooks/useHighScores';

const Item = ({name, score, position, index}) => (
  <View
    style={[styles.item, position ? styles[position] : null]}
    key={`${name}-${score}-${index}`}>
    <Text style={styles.number}>{score}</Text>
    <Text style={styles.name}>{name}</Text>
  </View>
);

function HighScoresScreen({route}) {
  const [highScores, setHighScores] = useHighScores();
  const [score, setScore] = useState(route?.params?.score);

  const NewHighScore = ({score, position, index}) => {
    const [name, setName] = useState('');

    return (
      <View
        style={[styles.item, position ? styles[position] : null]}
        key="new-score">
        <Text style={styles.number}>{score}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="New High Score!"
          placeholderTextColor={DefaultTheme.colors.background}
        />

        <Button
          title="OK"
          disabled={!name}
          onPress={() => {
            setHighScores([...highScores, {name, score}]);
            setScore(null);
          }}
        />
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    const {name, score} = item;
    const position = (() => {
      if (index === 0) {
        return 'first';
      }

      if (index === 1) {
        return 'second';
      }

      if (index === 2) {
        return 'third';
      }
    })();

    if (!name && score) {
      return <NewHighScore {...{name, score, position, index}} />;
    }

    return <Item {...{name, score, position, index}} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[...highScores, {score}]
          .filter(({score}) => score)
          .sort((a, b) => a.score - b.score)
          .slice(0, 10)}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 150,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: DefaultTheme.colors.background,
    padding: 10,
  },
  number: {
    width: '33%',
    padding: 20,
    fontWeight: 'bold',
    borderRightWidth: 5,
    borderRightColor: DefaultTheme.colors.background,
    fontSize: 32,
  },
  name: {
    padding: 20,
    fontWeight: 'medium',
    fontSize: 20,
  },
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#bbdefb',
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  first: {
    backgroundColor: '#fdd835',
  },
  second: {
    backgroundColor: '#bdbdbd',
  },
  third: {
    backgroundColor: '#ff9e80',
  },
});

export default HighScoresScreen;
