/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from "react";
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
} from "react-native";

import { ViroARSceneNavigator } from "react-viro";

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey: "API_KEY_HERE",
};

// Sets the default scene you want for AR and VR
var InitialARScene = require("./js/HelloWorldSceneAR");

export default class ViroSample extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.flex}>
        <ViroARSceneNavigator
          style={styles.flex}
          initialScene={{ scene: InitialARScene }}
          autofocus
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttons} onPress={() => {}}>
            <Text>Button</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  buttonContainer:{
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
});

module.exports = ViroSample;
