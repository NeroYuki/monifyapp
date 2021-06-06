import 'react-native';
import React from 'react';
import { RecurringBillManager } from '../App/screen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', async () => {
  await renderer.create(<RecurringBillManager />);
});