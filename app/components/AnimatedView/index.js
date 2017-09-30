import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';

export default class AnimatedView extends Component {
  state = {
    fadeAnim: new Animated.Value(0),
    xPos: new Animated.Value(100),
    twirl: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.sequence([
      Animated.timing(this.state.xPos, {
        toValue: 50,
        easing: Easing.ease,
        duration: 1000
      }),

      Animated.parallel([
        Animated.spring(this.state.xPos, { toValue: 200 }),
        Animated.timing(this.state.twirl, { toValue: 1 })
      ])
    ]).start();
  }

  render() {
    let { fadeAnim, xPos } = this.state;
    const twirl = this.state.twirl.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <Animated.View
        style={{
          ...this.props.style,
          position: 'absolute',
          left: xPos,
          transform: [{ rotate: twirl }]
        }}
      />
    );
  }
}
