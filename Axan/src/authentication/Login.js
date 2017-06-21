import React, { Component } from 'react';
import {
   StyleSheet, View, Text, Image,TouchableHighlight, AppRegistry
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Hoshi  } from 'react-native-textinput-effects';
import Button from 'react-native-button';
import Footer from '../footer/Footer';
import DropdownAlert from 'react-native-dropdownalert';

GLOBAL = require('../Globals');

const hasError = false;
const msg = 'undefined';

export default class Login extends Component {

 constructor(props) {
   super(props);
   this.state = {hasError: false, email: this.email, password: this.password};
 }

  render() {
    return (
      <View style={{flex: 1}}>
         <View style={{flex: 9,justifyContent: 'space-between', backgroundColor: 'white', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={{uri: 'https://raw.githubusercontent.com/JoaoPauloZ/axan-backend/master/axan%20logo.PNG'}} style={{width: 250, height: 100}}/>
              </View>
              <View style={{flex: 2, paddingVertical: 16}}>
                  <Hoshi style={styles.input} label={'Email'}
                  onChangeText={(text) => this.email = text} borderColor={'darkturquoise'} labelStyle={{ color: 'darkturquoise', fontSize : 20 }} inputStyle={{ color: 'darkturquoise' }} />
                  <Hoshi style={styles.input} label={'Password'}
                  onChangeText={(text) => this.password = text} secureTextEntry={true} borderColor={'darkturquoise'} labelStyle={{ color: 'darkturquoise', fontSize : 20 }} inputStyle={{ color: 'darkturquoise' }}/>
                  <View style={{padding: 10, width: 250}}>
                      <Button
                      containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'darkturquoise'}}
                      style={{fontSize: 20, color: 'black'}} onPress={() => this.onLoginButtonPress()}>
                        Entrar
                      </Button>
                  </View>
                  <View style={{padding: 10}}>
                      <Button
                        containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'darkturquoise'}}
                        style={{fontSize: 20, color: 'black'}} onPress={onRegisterButtonPress} >
                            Cadastrar-se
                      </Button>
                  </View>
              </View>
         </View>
         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'paleturquoise'}} >
            <Text  style={styles.textFooter}> © 2017 Produced for the class Projeto de Software II</Text>
         </View>
         <DropdownAlert
                 ref={(ref) => this.dropdown = ref}  closeInterval={4000}  showCancel={false} />
      </View>
    );
  }


  onLoginButtonPress(){
  this.setState({hasError: false});

    msg = 'json.message';

    fetch(GLOBAL.BASE_URL + '/api/security/logon',
        { method: 'POST',
          headers: {
            'contentType': 'application/json; charset=utf-8',
            'user': this.email,
            'password': this.password
          }
        })
      .then((response) =>
          response.json()) .then((responseData) => {
              var data = JSON.stringify(responseData);
              var json =  JSON.parse(data);
              if (responseData.status == 'SUCESS') {
                  GLOBAL.TOKEN = json.result[0].token;
                  Actions.home({});
              }else{
                  hasError = true;
              }
          }) .done();

      if (hasError) {
        this.dropdown.alertWithType('error', 'Login não autorizado', 'Email ou senha inválidos!')
      }else{
        this.dropdown.onClose();
      }
  }

    closeAlert() {
      this.dropdown.onClose()
    }
}

const onRegisterButtonPress = () => {
  Actions.register({});
};

const styles = StyleSheet.create({
  input:{
    marginTop: 4,
    minWidth: 250
  },
  button:{
    fontSize: 20,
    marginTop: 4
  },
  textFooter:{
    fontSize: 12,
    color: "black"
  }
});
