import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  Clipboard,
  ToastAndroid,
  TouchableNativeFeedback,
  Share,
  FlatList,
  Animated,
  PanResponder
} from 'react-native';
import Camera from 'react-native-camera';

import { get, set } from '../../utils/storage';

import AnimatedView from '../../components/AnimatedView';

import s from './styles';

export default class QRScanner extends Component {
  constructor() {
    super();
    this.state = {
      showCamera: false,
      qrContent: 'https://readhub.me/',
      active: 0,
      moveAnims: [new Animated.Value(0), new Animated.Value(0)],
      historyList: []
    };
    this.onBarCodeRead = this.onBarCodeRead.bind(this);
    this.tapHistoryItem = this.tapHistoryItem.bind(this);
    this.copyTxt = this.copyTxt.bind(this);
    this.openInBrowser = this.openInBrowser.bind(this);
    this.toggleShowCamera = this.toggleShowCamera.bind(this);
    this.share = this.share.bind(this);
    this.getHistory = this.getHistory.bind(this);
    this.setHistory = this.setHistory.bind(this);
  }
  static navigationOptions = {
    title: '扫描二维码'
  };
  render() {
    let view = null;
    let { moveAnims } = this.state;
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
          <Text style={s.instructions}>
            {this.state.qrContent}
          </Text>
          <View style={s.history}>
            <Text style={s.sectionTitle}>
              历史记录
            </Text>
            <FlatList
              style={s.historyList}
              data={this.state.historyList}
              renderItem={({ item, index }) => (
                <TouchableNativeFeedback
                  onPress={() => {
                    this.tapHistoryItem(item.key);
                  }}
                >
                  <View style={[s.historyItem]}>
                    <Animated.View
                      style={[s.historyItemInner, { left: moveAnims[index] }]}
                    >
                      <View style={s.historyText}><Text>{item.key}</Text></View>
                      <View style={s.historyOp}><Text>删除</Text></View>
                    </Animated.View>
                  </View>
                </TouchableNativeFeedback>
              )}
            />
          </View>
          <View style={{ width: '100%', height: 100, position: 'relative' }}>
            <AnimatedView
              style={{
                width: 50,
                height: 50,
                backgroundColor: '#45671e'
              }}
            />
          </View>

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
              <View style={s.btnContainer}>
                <TouchableNativeFeedback onPress={this.share}>
                  <View style={s.btn}>
                    <Text>分享</Text>
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

  componentWillMount() {
    this.getHistory();
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        console.log(gestureState);

        // The gesture has started. Show visual feedback so the user knows

        // what is happening!

        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: Animated.event(
        [null, { dx: this.state.moveAnims[0] }],
        params => {
          console.log(params);
        }
      ),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    });
  }

  getHistory() {
    get('history-list').then(value => {
      const historyList = JSON.parse(value);
      if (historyList instanceof Array) {
        this.setState({ historyList });
      }
    });
  }

  setHistory(item) {
    if (this.state.historyList.indexOf(item) !== -1) {
      return;
    }
    const historyList = this.state.historyList;
    historyList.push({ key: item });
    this.setState({ historyList });
    set('history-list', JSON.stringify(historyList)).then(params => {
      console.log(params);
    });
  }

  tapHistoryItem(item) {
    if (!item) {
      return;
    }
    this.setState({ qrContent: item });
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
    this.setHistory(this.state.qrContent);
  }

  openInBrowser() {
    if (!this.state.qrContent) {
      return;
    }
    const uri = this.state.qrContent;
    const { navigate } = this.props.navigation;
    navigate('Web', { uri, visible: true });
    this.setHistory(this.state.qrContent);
  }

  share() {
    if (!this.state.qrContent) {
      return;
    }
    const message = this.state.qrContent;
    Share.share({
      title: '分享内容',
      message
    });
    this.setHistory(this.state.qrContent);
  }
}
