/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

//import  Login  from './src/authentication/Login';
import  Routers  from './src/breadcrumb/Routers';

export default class Axan extends Component {
  render() {
    return (
        <Routers />
    );
  }
}

AppRegistry.registerComponent('Axan', () => Axan);
