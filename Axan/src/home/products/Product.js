import React, { Component } from 'react';
import {
  View, Text
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Product extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Produto Selecionado: {this.props.prod}</Text>
      </View>
    );
  }
}
