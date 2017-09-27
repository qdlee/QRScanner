import React, { Component } from 'react';
import { WebView, View, Text, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';

function openInBrowser(url) {
  if (!url) {
    return;
  }
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        console.log("Can't handle url: " + url);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(err => console.error('An error occurred', err));
}

export default class Web extends Component {
  constructor() {
    super();
  }
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    const uri = state.params.uri;
    return {
      title: '打开链接',
      headerRight: (
        <Menu>
          <MenuTrigger>
            <Icon
              name="ellipsis-h"
              size={30}
              color="#333"
              style={{ marginRight: 10 }}
            />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => openInBrowser(uri)} text="浏览器中打开" />
          </MenuOptions>
        </Menu>
      )
    };
  };
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={{ flex: 1 }}>
        <WebView source={{ uri: params.uri }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cm: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#fff'
  },
  cmItem: {
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
