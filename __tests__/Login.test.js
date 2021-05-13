/**
 * @format
 */

import 'react-native';
import React from 'react';
import { Login } from '../App/screen/Login';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', async () => {
  await renderer.create(<Login />);
});