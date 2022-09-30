/**
 * @format
 */

import React from 'react';
import 'react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import GameScreen from '../src/screens/game';
import {render, fireEvent, screen} from '@testing-library/react-native';

it('renders correctly', () => {
  renderer.create(<GameScreen />);
});
