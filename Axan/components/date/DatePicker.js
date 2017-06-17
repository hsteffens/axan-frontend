import React, { Component } from 'react';
import { DatePickerAndroid, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import { Hoshi  } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class DatePicker extends Component {

    constructor(props) {
      super(props);
      this.state = {presetDate: new Date(2020, 4, 5), allDate: new Date(2020, 4, 5), simpleText: 'pick a date'};

    }

    showPicker = async (stateKey, options) => {
      try {
        var newState = {};
        const {action, year, month, day} = await DatePickerAndroid.open(options);
        if (action === DatePickerAndroid.dismissedAction) {
          newState[stateKey + 'Text'] = 'dismissed';
        } else {
          var date = new Date(year, month, day);
          newState[stateKey + 'Text'] = date.toLocaleDateString();
          newState[stateKey + 'Date'] = date;

          this.props.datePicker = date.toLocaleDateString();
        }
        this.setState(newState);
      } catch ({code, message}) {
        console.warn(`Error in example '${stateKey}': `, message);
      }
    };
    render() {
      return (
        <View style={{flex: 1,flexDirection: 'row'}}>
          <View style={{flex: 3}} >
              <Hoshi
                  style={{marginTop: 4,minWidth: 150}}
                  label={this.props.label} borderColor={'white'}
                  labelStyle={{ color: 'white', fontSize : 20 }}
                  inputStyle={{ color: 'white' }}
                  value={this.props.datePicker}
                  onChangeText={(event) => this.setState(date:event.nativeEvent.text)}
              />
          </View>
          <View  style={{flex: 1}}>
            <TouchableWithoutFeedback
              onPress={this.showPicker.bind(this, 'simple', {date: this.state.date})}>
              <View >
                <Text style={{padding: 20}}>
                  <Icon name="calendar" color="white" size={25}/>
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      );
    }
  }
var styles = StyleSheet.create({
  text: {
    color: 'black', },
  });
