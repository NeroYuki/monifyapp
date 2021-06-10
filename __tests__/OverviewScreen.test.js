import 'react-native';
import React from 'react';
import { OverviewScreen } from '../App/screen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { NavigationContainer } from '@react-navigation/native';

it('renders correctly', async () => {
    //contain timespanpicker with its own navigator, therefore need a container wrapper
    await renderer.create(<NavigationContainer><OverviewScreen /></NavigationContainer>);
});