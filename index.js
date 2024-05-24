/**
 * @format
 */
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { startNetworkLogging } from 'react-native-network-logger';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

enableScreens();
startNetworkLogging();
AppRegistry.registerComponent(appName, () => App);
