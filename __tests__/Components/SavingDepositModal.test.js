import 'react-native';
import React from 'react';
import { SavingDepositModal } from '../../App/components';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', async () => {
  await renderer.create(<SavingDepositModal />);
});