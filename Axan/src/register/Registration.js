import React, { Component } from 'react';
import {
   StyleSheet, View, Text, Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Hoshi  } from 'react-native-textinput-effects';
import Button from 'react-native-button';
import Footer from '../footer/Footer';
import DatePicker from '../../components/date/DatePicker';
import DropdownAlert from 'react-native-dropdownalert';

GLOBAL = require('../Globals');

const hasError = false;

export default class Registration extends Component {

  constructor(props) {
    super(props);
    this.state = {hasError: false,
      email: this.email,
      password: this.password,
      name : this.name,
      cellphone : this.cellphone,
      date : this.date};
  }

  render() {
    return (
      <View style={{flex: 1}}>
         <View style={{flex: 9,justifyContent: 'space-between', backgroundColor: 'white', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flex: 4, paddingVertical: 16}}>
                  <View style={{flex: 1}}>
                    <Hoshi style={styles.input} label={'Nome'}
                    onChangeText={(text) => this.name = text} borderColor={'darkturquoise'} labelStyle={{ color: 'darkturquoise', fontSize : 20 }} inputStyle={{ color: 'darkturquoise' }} />
                  </View>
                  <View style={{flex: 1}}>
                    <DatePicker label={'Data Nascimento'} style={{height: 25}} date={this.state.date}/>
                  </View>
                  <View style={{flex: 1}}>
                    <Hoshi style={styles.input} label={'Telefone'}
                    onChangeText={(text) => this.cellphone = text} borderColor={'darkturquoise'} labelStyle={{ color: 'darkturquoise', fontSize : 20 }} inputStyle={{ color: 'darkturquoise' }} />
                  </View>
                  <View style={{flex: 1}}>
                    <Hoshi style={styles.input} label={'Email'}
                    onChangeText={(text) => this.email = text} borderColor={'darkturquoise'} labelStyle={{ color: 'darkturquoise', fontSize : 20 }} inputStyle={{ color: 'darkturquoise' }} />
                  </View>
                  <View style={{flex: 1}}>
                    <Hoshi style={styles.input} label={'Password'}
                    onChangeText={(text) => this.password = text} secureTextEntry={true} borderColor={'darkturquoise'} labelStyle={{ color: 'darkturquoise', fontSize : 20 }} inputStyle={{ color: 'darkturquoise' }}/>
                  </View>
                  <View style={{flex: 1, padding: 10, width: 250}}>
                      <Button
                      containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'darkturquoise'}}
                      style={{fontSize: 20, color: 'white'}} onPress={() => this.onRegisterButtonPress()} >
                        Registrar-se
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

  onRegisterButtonPress() {
    this.setState({hasError: false});
    fetch(GLOBAL.BASE_URL + '/api/user/sign-up/',
        { method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'user': this.name,
            'password': this.password,
            'birthday_date': "01/01/1990",
            'cellphone': this.cellphone,
            'email': this.email
          }
        })
      .then((response) =>
            response.json()) .then((responseData) => {
                var data = JSON.stringify(responseData);
                var json =  JSON.parse(data);
                if (responseData.status == 'SUCESS') {
                    GLOBAL.TOKEN = json.result[0].token;
                    Actions.preferences({});
                }else{
                    hasError = true;
                }
      }) .done();

    if (hasError) {
      this.dropdown.alertWithType('error', "Não foi possivel registrar o usuário", "erro inesperado.")
    }else{
      this.dropdown.onClose();
    }

  }

  closeAlert() {
    this.dropdown.onClose()
  }
}


const styles = StyleSheet.create({
  input:{
    marginTop: 4,
    minWidth: 250
  },
  button:{
    fontSize: 20,
    marginTop: 4
  }
});
