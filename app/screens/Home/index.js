import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  Clipboard,
  ToastAndroid,
  TouchableNativeFeedback
} from 'react-native';
import Camera from 'react-native-camera';

import s from './styles';

export default class QRScanner extends Component {
  constructor() {
    super();
    this.state = {
      showCamera: false,
      qrContent: 'https://www.baidu.com'
    };
    this.onBarCodeRead = this.onBarCodeRead.bind(this);
    this.copyTxt = this.copyTxt.bind(this);
    this.openInBrowser = this.openInBrowser.bind(this);
    this.toggleShowCamera = this.toggleShowCamera.bind(this);
  }
  static navigationOptions = {
    title: '扫描二维码'
  };
  render() {
    let view = null;

    if (this.state.showCamera) {
      view = (
        <Camera
          style={s.preview}
          ref={cam => {
            this.camera = cam;
          }}
          onBarCodeRead={this.onBarCodeRead}
        >
          <Text style={s.title}>扫描二维码</Text>
          <View style={s.frame} />
          <Text style={s.cancel} onPress={this.toggleShowCamera}>
            取消
          </Text>
        </Camera>
      );
    } else {
      view = (
        <View style={s.container}>
          <Text style={s.instructions}>{this.state.qrContent}</Text>
          <View style={s.operation}>
            <View style={s.btnRow}>
              <View style={s.btnContainer}>
                <TouchableNativeFeedback onPress={this.toggleShowCamera}>
                  <View style={s.btn}>
                    <Text>扫码</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View style={s.btnContainer}>
                <TouchableNativeFeedback onPress={this.copyTxt}>
                  <View style={s.btn}>
                    <Text>复制文本</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View style={s.btnContainer}>
                <TouchableNativeFeedback onPress={this.openInBrowser}>
                  <View style={s.btn}>
                    <Text>打开链接</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          </View>
        </View>
      );
    }
    return <View style={s.container}>{view}</View>;
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
    if (!this.state.qrContent) {
      return;
    }
    Clipboard.setString(this.state.qrContent);
    ToastAndroid.show('已复制', ToastAndroid.SHORT);
  }

  openInBrowser() {
    if (!this.state.qrContent) {
      return;
    }
    const uri = this.state.qrContent;
    const { navigate } = this.props.navigation;
    navigate('Web', { uri, visible: true });
  }
}
