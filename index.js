/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import Navi from './navigation/Navi';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Navi);
