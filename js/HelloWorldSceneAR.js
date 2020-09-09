'use strict';

import React, {Component} from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroBox,
  ViroConstants,
  ViroARPlaneSelector,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
      showBox: false,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  handlePlaneSelect = () => {
    this.setState({
      showBox: true,
    });
  };

  render() {
    return (
      <ViroARScene anchorDetectionTyes="PlanesHorizontal">
        <ViroARPlaneSelector
          minHeight={0.5}
          minWidth={0.5}
          onPlaneSelected={this.handlePlaneSelect}>
          <ViroBox position={[0, 0.25, 0]} scale={[0.5, 0.5, 0.5]} />
        </ViroARPlaneSelector>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: 'Hello World!',
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;
