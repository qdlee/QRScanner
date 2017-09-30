import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import codePush from 'react-native-code-push';
import { MenuContext } from 'react-native-popup-menu';

import HomeScreen from './screens/Home';
import WebScreen from './screens/Web';

// const SimpleApp = codePush(
//   StackNavigator({
//     Home: { screen: HomeScreen },
//     Web: { screen: WebScreen }
//   })
// );

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Web: { screen: WebScreen }
});

export default class App extends Component {
  render() {
    return (
      <MenuContext>
        <SimpleApp />
      </MenuContext>
    );
  }
}

AppRegistry.registerComponent('QRScanner', () => App);
