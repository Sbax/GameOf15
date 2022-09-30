/**
 * @format
 */

import React from 'react';
import 'react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import HighScoresScreen from '../src/screens/high-scores';

it('renders correctly', () => {
  renderer.create(<HighScoresScreen />);
});
