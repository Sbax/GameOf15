/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {Node} from 'react';

import GameScreen from './src/screens/game';
import HighScoresScreen from './src/screens/high-scores';
import HomeScreen from './src/screens/home';
import {Screens} from './src/screens/screens.enum';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={Screens.home}
          component={HomeScreen}
          options={{title: 'Choose a Game Mode'}}
        />
        <Stack.Screen name={Screens.game} component={GameScreen} />
        <Stack.Screen
          name={Screens.highScores}
          component={HighScoresScreen}
          options={{title: 'High Scores'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
