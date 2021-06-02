import 'react-native';
import React from 'react';
import { TimespanDefaultFragment, TimespanPicker } from '../../App/components';
import { NavigationContainer } from '@react-navigation/native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


it('renders correctly', async () => {
    //contain separate navigator, therefore need container wrapper
  await renderer.create(<NavigationContainer><TimespanPicker /></NavigationContainer>);
});