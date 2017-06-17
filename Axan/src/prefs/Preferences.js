import React, { Component } from 'react';
import {  StyleSheet, View, Text, Picker, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Hoshi  } from 'react-native-textinput-effects';
import Button from 'react-native-button';
import Footer from '../footer/Footer';
import DropdownAlert from 'react-native-dropdownalert';

GLOBAL = require('../Globals');

const Item = Picker.Item;
const hasError = false;

export default class Preferences extends Component {

  constructor(props) {
    super(props);

    this.onValueChange = this.onValueChange.bind(this)

    this.freqMarket = 1;
    this.freqButchery = 1;
    this.freqFruit = 1;
    this.freqBakery = 1;

    this.state = {
        hasError: false,
        freqMarket: this.freqMarket,
        freqButchery: this.freqButchery,
        freqFruit : this.freqFruit,
        freqBakery : this.freqBakery
    };
  }

  render() {

    return (
      <View style={{flex: 1}}>
      <View style={{flex: 9,justifyContent: 'space-between', backgroundColor: 'slateblue', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
           <View style={{flex: 4, paddingVertical: 16}}>
               <View style={{flex: 1}}>
                 <Text> Frequência de ida ao supermercado</Text>
                 <Picker style={styles.picker}
                         selectedValue={this.state.freqMarket}
                         onValueChange={this.onValueChange.bind(this, 'freqMarket')}
                         mode="dropdown">
                   <Picker.Item label="Um vez por semana" value="1" />
                   <Picker.Item label="Um vez por mês" value="2" />
                   <Picker.Item label="Um vez a cada três meses" value="3" />
                 </Picker>
               </View>
               <View style={{flex: 1}}>
                 <Text>Frequência de compras no açougue</Text>
                 <Picker style={styles.picker}
                         selectedValue={this.state.freqButchery}
                         onValueChange={this.onValueChange.bind(this, 'freqButchery')}
                         mode="dropdown">
                   <Picker.Item label="Toda vez" value="1" />
                   <Picker.Item label="Vez sim, vez não" value="2" />
                   <Picker.Item label="Raramente" value="3" />
                 </Picker>
                </View>
                <View style={{flex: 1}}>
                  <Text>Frequência de compras na padaria</Text>
                  <Picker style={styles.picker}
                          selectedValue={this.state.freqBakery}
                          onValueChange={this.onValueChange.bind(this, 'freqBakery')}
                          mode="dropdown">
                    <Picker.Item label="Toda vez" value="1" />
                    <Picker.Item label="Vez sim, vez não" value="2" />
                    <Picker.Item label="Raramente" value="3" />
                  </Picker>
                 </View>
                 <View style={{flex: 1}}>
                   <Text>Frequência de compras de hortaliças</Text>
                   <Picker style={styles.picker}
                           selectedValue={this.state.freqFruit}
                           onValueChange={this.onValueChange.bind(this, 'freqFruit')}
                           mode="dropdown">
                     <Picker.Item label="Toda vez" value="1" />
                     <Picker.Item label="Vez sim, vez não" value="2" />
                     <Picker.Item label="Raramente" value="3" />
                   </Picker>
                  </View>
                  <View style={{flex: 1, padding: 10, width: 250}}>
                      <Button
                      containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'darkturquoise'}}
                      style={{fontSize: 20, color: 'white'}} onPress={() => this.onRegisterButtonPress()} >
                        Confirmar
                      </Button>
                  </View>
           </View>
      </View>

        <Footer/>
        <DropdownAlert
                ref={(ref) => this.dropdown = ref}  closeInterval={4000}  showCancel={false} />
      </View>
    );
  }

   onValueChange = (key: string, value: string) => {
     const newState = {};
     newState[key] = value;
     this.setState(newState);
   };

   onRegisterButtonPress() {

     var URL = GLOBAL.BASE_URL + '/api/user/preferences?';

     if (this.state.freqMarket != undefined) {
       URL = URL + 'freq=' + this.state.freqMarket;
     }

     if (this.state.freqButchery != undefined) {
       URL = URL + '&butchery=' + this.state.freqButchery;
     }

     if (this.state.freqFruit != undefined) {
       URL = URL + '&fruit=' + this.state.freqFruit;
     }

     if (this.state.freqBakery != undefined) {
       URL = URL + '&bakery=' + this.state.freqBakery;
     }

     this.setState({hasError: false});
     fetch(URL,
         { method: 'POST',
           headers: {
             'token': GLOBAL.TOKEN,
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           }
         })
       .then(function(response) {
         if (response.status == 200) {
           Actions.home({});
         }else {
           hasError = true;
         }
       }).catch((error) => {
         console.error(error);
       });

     if (hasError) {
       this.dropdown.alertWithType('error', 'Erro', 'Erro ao inserir as preferências')
     }else{
       this.dropdown.onClose();
     }

   }

}
const styles = StyleSheet.create({
  button:{
    fontSize: 20,
    marginTop: 4
  },
  picker: {
    marginTop: 4,
    minWidth: 250,
    color: 'white',
    backgroundColor: '#333' },
});
