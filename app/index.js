import { AppRegistry } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';

Navigation.startSingleScreenApp({
  screen: {
    screen: 'qr.HomeScreen',
    title: '扫描二维码'
  }
});
