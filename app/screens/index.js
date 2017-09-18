import { Navigation } from 'react-native-navigation';

import HomeScreen from './Home';
import WebViewScreen from './WebView';

export function registerScreens() {
  Navigation.registerComponent('qr.HomeScreen', () => HomeScreen);
  Navigation.registerComponent('qr.WebViewScreen', () => WebViewScreen);
}
