/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App/index';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', async () => {
  await renderer.create(<App />);
});
