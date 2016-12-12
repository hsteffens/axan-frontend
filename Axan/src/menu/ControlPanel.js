import React, { Component } from 'react';
import { PropTypes, ScrollView, StyleSheet, Text, TouchableOpacity,View} from 'react-native';
import { Actions } from 'react-native-router-flux';

class Button extends Component {
  handlePress(e) {
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}
        style={this.props.style}>
        <Text>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}


export default class ControlPanel extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
      <Button style={styles.button} onPress={onFeedButtonPress}>
            <Text>Promoções</Text>
      </Button>
      <Button style={styles.button} onPress={onProductOwnerButtonPress}>
            <Text>Lista de Compras</Text>
      </Button>
      <Button style={styles.button} onPress={onLogoffButtonPress}>
            <Text>Sair</Text>
      </Button>
      </ScrollView>
    )
  }
}

const onFeedButtonPress = () => {
  Actions.home({});
};

const onProductOwnerButtonPress = () => {
  Actions.productOwner({});
};

const onLogoffButtonPress = () => {
  Actions.authentication({});
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#00ffff',
  },
  controlText: {
    color: 'white',
  },
  button: {
    backgroundColor: '#00ffff',
    borderWidth: 1,
    borderColor: 'black',
    padding: 15,
    borderRadius:4
  }
})
