import React from 'react';
import { Provider } from 'react-native-paper';
import { LogBox } from 'react-native';

import Navigator from './navigation'

LogBox.ignoreAllLogs()

//add react-native-paper's Provider to provide top-level context for modal and menu
const App = () => <Provider><Navigator></Navigator></Provider>

export default App;
