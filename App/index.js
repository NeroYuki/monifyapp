import React from 'react';
import { Provider } from 'react-native-paper';

import Navigator from './navigation'

//add react-native-paper's Provider to provide top-level context for modal and menu
const App = () => <Provider><Navigator></Navigator></Provider>

export default App;
