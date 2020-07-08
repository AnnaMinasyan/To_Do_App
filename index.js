/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'componentWillReceiveProps is deprecated',
    'componentWillMount',
    'componentWillReceiveProps has been renamed',
    'Require cycle',
    'DrawerLayoutAndroid drawerPosition'
])
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
