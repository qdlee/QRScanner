import React, { Component } from 'react';
import { WebView, View, Text, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const myIcon = (
  <Icon
    name="ellipsis-h"
    size={30}
    color="#333"
    style={{ marginRight: 10 }}
    onPress={this.showContextMenu}
  />
);

export default class Web extends Component {
  constructor() {
    super();
    this.openInBrowser = this.openInBrowser.bind(this);
  }
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    const visible = state.params.visible;
    return {
      title: '打开链接',
      headerRight: (
        <Icon
          name="ellipsis-h"
          size={30}
          color="#333"
          style={{ marginRight: 10 }}
          onPress={() => {
            setParams({ visible: !visible });
          }}
        />
      )
    };
  };
  render() {
    const { params } = this.props.navigation.state;

    const contextMenu = (
      <View style={styles.cm}>
        <View style={styles.cmItem}>
          <Text onPress={this.openInBrowser}>浏览器中打开</Text>
        </View>
      </View>
    );

    return (
      <View style={{ flex: 1 }}>

        <WebView source={{ uri: params.uri }} />

        {params.visible ? contextMenu : <Text style={{ height: 0 }} />}

      </View>
    );
  }

  openInBrowser() {
    const url = this.props.navigation.state.params.uri;
    console.log('url:', url);
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
