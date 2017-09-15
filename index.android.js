/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Clipboard,
  ToastAndroid,
  TouchableNativeFeedback,
  Linking
} from 'react-native';
import Camera from 'react-native-camera';
import codePush from 'react-native-code-push';

export default class QRScanner extends Component {
  constructor() {
    super();
    this.state = {
      showCamera: false,
      qrContent: ''
    };
    this.onBarCodeRead = this.onBarCodeRead.bind(this);
    this.copyTxt = this.copyTxt.bind(this);
    this.openInBrowser = this.openInBrowser.bind(this);
    this.toggleShowCamera = this.toggleShowCamera.bind(this);
  }
  render() {
    let view = null;
    if (this.state.showCamera) {
      view = (
        <Camera
          style={styles.preview}
          ref={cam => {
            this.camera = cam;
          }}
          onBarCodeRead={this.onBarCodeRead}
        >
          <Text style={styles.title}>扫描二维码</Text>
          <View style={styles.frame} />
          <Text style={styles.cancel} onPress={this.toggleShowCamera}>
            取消
          </Text>
        </Camera>
      );
    } else {
      view = (
        <View style={styles.container}>
          <Text style={styles.instructions}>{this.state.qrContent}</Text>
          <View style={styles.operation}>
            <View style={styles.btnRow}>
              <View style={styles.btnContainer}>
                <TouchableNativeFeedback onPress={this.toggleShowCamera}>
                  <View style={styles.btn}>
                    <Text>扫码</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View style={styles.btnContainer}>
                <TouchableNativeFeedback onPress={this.copyTxt}>
                  <View style={styles.btn}>
                    <Text>复制文本</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View style={styles.btnContainer}>
                <TouchableNativeFeedback onPress={this.openInBrowser}>
                  <View style={styles.btn}>
                    <Text>浏览器打开</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          </View>
        </View>
      );
    }
    return <View style={styles.container}>{view}</View>;
  }

  toggleShowCamera() {
    this.setState({
      showCamera: !this.state.showCamera
    });
  }

  onBarCodeRead(res) {
    if (res.data) {
      this.setState({
        qrContent: res.data
      });
      this.toggleShowCamera();
    }
  }

  copyTxt() {
    Clipboard.setString(this.state.qrContent);
    ToastAndroid.show('已复制', ToastAndroid.SHORT);
  }

  openInBrowser() {
    const url = this.state.qrContent;
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
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    flex: 1,
    marginBottom: 5,
    paddingTop: 30,
    width: '100%',
    height: 300,
    textAlign: 'center',
    color: '#333333',
    backgroundColor: '#f5f5f5'
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  frame: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: 'green'
  },
  title: {
    marginBottom: 30,
    color: '#fff',
    fontSize: 20
  },
  cancel: {
    marginTop: 30,
    fontSize: 20,
    color: '#fff'
  },
  operation: {},
  btnRow: {
    flexDirection: 'row',
    width: '100%'
  },
  btnContainer: {
    flex: 1,
    borderColor: 'green',
    borderWidth: 1
  },
  btn: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

QRScanner = codePush(QRScanner);

AppRegistry.registerComponent('QRScanner', () => QRScanner);
