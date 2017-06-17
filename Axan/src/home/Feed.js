import React, { Component } from 'react';
import { StyleSheet, View, Text, ListView, Image,TouchableWithoutFeedback, Modal, RefreshControl} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import SearchBar from 'react-native-material-design-searchbar';
import DropdownAlert from 'react-native-dropdownalert';
import { Hoshi  } from 'react-native-textinput-effects';

GLOBAL = require('../Globals');
const hasError = false;

export default class Feed extends Component {

  constructor(props) {
     super(props);

     this._onPressRow = this._onPressRow.bind(this)
     this._setModalVisible = this._setModalVisible.bind(this)
     this.fetchData = this.fetchData.bind(this)
     this.closeModal = this.closeModal.bind(this)
     this._onRefresh = this._onRefresh.bind(this)
     this._onSearchChange = this._onSearchChange.bind(this)

     this.state = {
       transparent: false,
       modalVisible: false,
       selectedValue : undefined,
       quant: this.quant,
       refreshing: false,
       dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }), loaded: false,
       search: this.search};
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    var URL = GLOBAL.BASE_URL + '/api/product/search';
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
                   dataSource: this.state.dataSource.cloneWithRows(responseData.result), loaded: true, });
                 }) .done();
   }

   _onPressRow(rowID, rowData) {

     rowData.isSelect = !rowData.isSelect;
     this.setState({
        modalVisible: true,
        selectedValue: rowID.id
      });

   }

   closeModal() {
     this._setModalVisible.bind(this, false)
     this.setState({
        modalVisible: false,
        selectedValue: undefined
      });
    }

   fetchData() {
     this.setState({
        modalVisible: false
      });

     var URL = GLOBAL.BASE_URL + '/api/user/shopping-list/product/' + this.state.selectedValue + '/quantity/'+this.state.quant;

     fetch(URL,
          { method: 'POST',
           headers: {
              'token': GLOBAL.TOKEN,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
           }
         }).then(function(response) {
            if (response.status == 200) {
              this.setState({
                 modalVisible: false,
                 selectedValue: null
               });
            }else {
               hasError = true;
            }
          }).catch((error) => {
             console.error(error);
          });

          if (hasError) {
            this.dropdown.alertWithType('error', 'Item não adicionado', 'Ocorreu um erro inesperado')
          }else{
            this.dropdown.onClose();
          }
    }

   _setModalVisible = (visible) => { this.setState({modalVisible: visible}); };

    _onRefresh() {
      this.setState({refreshing: true});
      this.loadData().then(() => { this.setState({refreshing: false}); });
    }

    _onSearchChange(text) {
      this.setState({search: text});
      this.loadData();
    }

  render() {
    var activeButtonStyle = { backgroundColor: '#ddd' };
    return (
      <View style={{flex: 1, backgroundColor: 'darkslateblue'}}>

          <Modal
               animationType={"slide"} transparent={true} visible={this.state.modalVisible}
               onRequestClose={() => this._setModalVisible(false)}>
                 <View style={[styles.container]}>
                   <View style={[styles.innerContainer]}>
                     <Text>"Adicionar Produto Selecionado"</Text>
                     <Hoshi style={styles.input} label={'Quantidade do produto'}
                     onChangeText={(text) => this.quant = text}
                     borderColor={'black'} labelStyle={{ color: 'black', fontSize : 20 }} inputStyle={{ color: 'white' }}/>

                     <Button onPress={this.fetchData.bind()} style={styles.modalButton}> Confirmar </Button>
                     <Button onPress={this.closeModal.bind()} style={styles.modalButton}> Cancelar </Button>
                   </View>
                 </View>
         </Modal>

        <View style={{flex: 1, padding:20}}>
          <SearchBar
            onSearchChange={(text) => this._onSearchChange(text)}
            height={50}
            placeholder={'Search...'}
            autoCorrect={false}
            padding={5}
            inputStyle={{overflow:'hidden', borderRadius:12}}
            returnKeyType={'search'} />
        </View>
        <View style={{flex: 6}}>
            <ListView
                  dataSource={this.state.dataSource} enableEmptySections={true}
                  refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} /> }
                  renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                  renderRow={(rowData) =>
                    <View style={{height:100, padding:10, backgroundColor: 'mediumslateblue'}}>
                      <TouchableWithoutFeedback onPress={this._onPressRow.bind(this.rowID, rowData)}>
                        <View style={{flex: 1}}>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <View>
                              <Image source={{ uri: rowData.picture}} style={styles.photo} />
                            </View>
                            <View>
                              <Text style={styles.product}> {rowData.name}</Text>
                            </View>
                          </View>
                          <View>
                            <Text style={styles.price}>R$ {rowData.price}</Text>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  }
                />
        </View>
        <DropdownAlert
                ref={(ref) => this.dropdown = ref}  closeInterval={4000}  showCancel={false} />
      </View>
    )
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
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'column',
    alignItems: 'center'
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    width: 300,
    height: 300
  },
  modalButton: { marginTop: 10, },
  separator: {
    flex: 2,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'black',
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  product:{
    marginTop: 4,
    fontSize: 22,
    fontWeight: 'bold'
  },
  price:{
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red'
  },
});
