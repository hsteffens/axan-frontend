import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Footer extends Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'paleturquoise'}} >
         <Text  style={styles.textFooter}> © 2017 Produced for the class Projeto de Software II</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textFooter:{
    fontSize: 12,
    color: "lightslategrey"
  }
});
