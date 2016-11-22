import React, { Component } from 'react';
import {
   StyleSheet, View, Text, Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Hoshi  } from 'react-native-textinput-effects';
import Button from 'react-native-button';
import Footer from '../footer/Footer';


export default class Login extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
         <View style={{flex: 9,justifyContent: 'space-between', backgroundColor: 'slateblue', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} style={{width: 250, height: 100}}/>
              </View>
              <View style={{flex: 2, paddingVertical: 16}}>
                  <Hoshi style={styles.input} label={'Email'} borderColor={'white'} labelStyle={{ color: 'white', fontSize : 20 }} inputStyle={{ color: 'white' }} />
                  <Hoshi style={styles.input} label={'Password'} secureTextEntry={true} borderColor={'white'} labelStyle={{ color: 'white', fontSize : 20 }} inputStyle={{ color: 'white' }}/>
                  <View style={{padding: 10, width: 250}}>
                      <Button
                      containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'darkturquoise'}}
                      style={{fontSize: 20, color: 'white'}} onPress={onLoginButtonPress}>
                        Entrar
                      </Button>
                  </View>
                  <View style={{padding: 10}}>
                      <Button
                        containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
                        style={{fontSize: 20, color: 'black'}} onPress={onRegisterButtonPress} >
                            Cadastrar-se
                      </Button>
                  </View>
              </View>
         </View>
         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'paleturquoise'}} >
            <Text  style={styles.textFooter}> © 2016 Produced for the class Projeto de Software I</Text>
         </View>
      </View>
    );
  }
}



const onLoginButtonPress = () => {
  Actions.home({});
};

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
    color: "lightslategrey"
  }
});
