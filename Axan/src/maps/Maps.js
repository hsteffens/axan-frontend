import React, { Component } from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';
import DropdownAlert from 'react-native-dropdownalert';

GLOBAL = require('../Globals');
const hasError = false;

export default class Map extends Component {

  constructor(props) {
     super(props);

     this.state = {
        latlng: [],
        latitude: undefined,
        longitude: undefined
      };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    var URL = GLOBAL.BASE_URL + '/api/user/shopping-list/place';
    if (this.state.search != undefined) {
      URL = URL + '?q=' + this.state.search;
    }
    fetch(URL,
        { method: 'GET',
          headers: {
             'token': GLOBAL.TOKEN
          }
        })
        .then((response) =>
               response.json()) .then((responseData) => {
                 this.setState({
                   latitude:  responseData.result[0].latitude,
                   longitude: responseData.result[0].longitude,
                   latlng: {
                     latitude: responseData.result[0].latitude,
                     longitude: responseData.result[0].longitude
                   } });
                 }) .done();
   }


  render() {
    return (
      <View style ={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}

        >
        <MapView.Marker
          coordinate={this.state.latlng}
        />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
