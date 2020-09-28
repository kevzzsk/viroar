"use strict";

import React, { Component } from "react";

import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import {
  ViroARScene,
  Viro3DObject,
  ViroConstants,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroAmbientLight,
  ViroNode,
  ViroQuad,
  ViroSpotLight,
} from "react-viro";

import dataModel from './assets/dataModel'

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      markers: ['a','b','c'],
      anchor: null,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  _onLoadStart = () => {
    console.log("OBJ loading has started");
  };
  _onLoadEnd = () => {
    console.log("OBJ loading has finished");
  };
  _onError = (event) => {
    console.log("OBJ loading failed with error: " + event.nativeEvent.error);
  };

  _onAnchorFound = (anchor) => {
    console.log("Achor Found!", anchor);
    this.setState({anchor})
  };

  _onAnchorRemoved = (anchor) => {
    console.log("Achor Removed!", anchor);
  }

  _onAnchorUpdated = (updatedAnchor) => {
    const {anchor} = this.state
    //console.log("Achor Updated!", anchor);
    if (updatedAnchor.trackingMethod !== anchor.trackingMethod){
      this.setState({anchor: updatedAnchor})
      console.log("Achor Updated!", updatedAnchor);
    }
  }

  _loadMarkers = () => {
    const {markers} = this.state;
    var views = [];

    views = markers.map((marker, i) => {
      return (
        <ViroARImageMarker target={`${i}`}
          key={marker}
          onAnchorFound={this._onAnchorFound}
          onAnchorRemoved={this._onAnchorRemoved}
          onAnchorUpdated={this._onAnchorUpdated}>
          <Viro3DObject
              position={[0, 0, 0]}
              source={ dataModel[marker].obj}
              resources={[dataModel[marker].mtl]}
              // materials="face"
              scale={[0.01,0.01,0.01]}
              type="OBJ"
              transformBehaviors={["billboardX"]}
              onLoadStart={this._onLoadStart}
              onLoadEnd={this._onLoadEnd}
              onError={this._onError}
            />
        </ViroARImageMarker>
      );
    });

    return views;
  };

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroAmbientLight color="#FFFFFF" />
        {this._loadMarkers()}
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Hello World!",
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

module.exports = HelloWorldSceneAR;
ViroARTrackingTargets.createTargets({
  "0": {
    source: require("./res/ar_marker.jpg"),
    orientation: "Up",
    physicalWidth: 0.1, // real world width in meters
  },
  "1": {
    source: require("./res/ar_marker2.jpg"),
    orientation: "Up",
    physicalWidth: 0.1, // real world width in meters
  },
  "2": {
    source: require("./res/ar_marker3.jpg"),
    orientation: "Up",
    physicalWidth: 0.1, // real world width in meters
  },
});