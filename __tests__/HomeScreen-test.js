/**
 * @format
 */

import React from 'react';
import 'react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import HomeScreen from '../src/screens/home';

it('renders correctly', () => {
  renderer.create(<HomeScreen />);
});
