import React, { Component } from 'react';
import { StyleSheet, View, Text, ListView, Image,TouchableWithoutFeedback, Modal, RefreshControl} from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import SearchBar from 'react-native-material-design-searchbar';
import Map from '../maps/Maps';
import DropdownAlert from 'react-native-dropdownalert';

GLOBAL = require('../Globals');
const hasError = false;

export default class ProductOwner extends Component {

  constructor(props) {
    super(props);

    this._onPressRow = this._onPressRow.bind(this)
    this._setModalVisible = this._setModalVisible.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.closeModal = this.closeModal.bind(this)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      transparent: false,
      modalVisible: false,
      selectedValue : null,
      refreshing: false,
      valueShoppingList: '0,00',
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }), loaded: false,
    };
  }

  componentDidMount() {
      this.loadData();
      this.loadValueShoppingList();
  }

   loadData() {
     var URL = GLOBAL.BASE_URL + '/api/user/shopping-list';
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
                    dataSource: this.state.dataSource.cloneWithRows(responseData.result), loaded: true });
                  }) .done();
    }

 _onPressRow(rowID, rowData) {

   rowData.isSelect = !rowData.isSelect;
   this.setState({
      modalVisible: true,
      selectedValue: rowID.cod
    });

 }

 fetchData() {
   this._setModalVisible.bind(this, false)
   var URL = GLOBAL.BASE_URL + '/api/user/shopping-list/product/' + this.state.selectedValue;

   fetch(URL,
        { method: 'DELETE',
         headers: {
            'token': GLOBAL.TOKEN,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         }
       }).then(function(response) {
          if (response.status == 200) {
            hasError = false;
          }else {
             hasError = true;
          }
        }).catch((error) => {
           console.error(error);
        });

        if (hasError) {
          this.dropdown.alertWithType('error', 'Item não removido', 'Ocorreu um erro inesperado')
        }else{
          this.loadData();
          this.loadValueShoppingList();
          this.dropdown.onClose();
        }
  }

  closeModal() {
    this._setModalVisible.bind(this, false)
    this.setState({
       modalVisible: false,
       selectedValue: undefined
     });
   }

  _onRefresh() {
    this.setState({refreshing: true});
    this.loadData().then(() => { this.setState({refreshing: false}); });
  }

_setModalVisible = (visible) => { this.setState({modalVisible: visible}); };

  loadValueShoppingList() {
   var URL = GLOBAL.BASE_URL + '/api/user/shopping-list/price';

    fetch(URL,
        { method: 'GET',
          headers: {
             'token': GLOBAL.TOKEN
          }
        })
        .then((response) =>
              response.json()) .then((responseData) => {
                if (responseData.result != undefined) {
                    this.setState({ valueShoppingList: responseData.result[0].price});
                }

              }) .done();
   }

  render() {
    var activeButtonStyle = { backgroundColor: '#ddd' };
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>

         <Modal
              animationType={"slide"} transparent={true} visible={this.state.modalVisible}
              onRequestClose={() => this._setModalVisible(false)}>
                <View style={[styles.container]}>
                  <View style={[styles.innerContainer]}>
                    <Text>Remover o item selecionado</Text>
                    <Button onPress={this.fetchData.bind()} style={styles.modalButton}> Confirmar </Button>
                    <Button onPress={this.closeModal.bind()} style={styles.modalButton}> Cancelar </Button>
                  </View>
                </View>
        </Modal>

        <View style={{flex: 2, padding:20, justifyContent: 'space-between'}}>
            <Text style={styles.title}>R$ {this.state.valueShoppingList}</Text>
            <Button
              containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#6a5acd'}}
              style={{fontSize: 18, color: 'white'}} onPress={onMapButtonPress} >
                Consultar local Indicado
            </Button>
        </View>
        <View style={{flex: 6}}>
            <ListView
                  dataSource={this.state.dataSource} enableEmptySections={true}
                  refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} /> }
                  renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                  renderRow={(rowData) =>
                    <View style={{height:100, padding:10, backgroundColor: 'white'}}>
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
        <View style={{flex: 1, padding:20, justifyContent: 'space-between'}}>
            <Button
              containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#7b68ee'}}
              style={{fontSize: 18, color: 'white'}} onPress={onFeedButtonPress} >
                Adicionar Produtos
            </Button>
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


const onMapButtonPress = () => {
  Actions.map({});
};
const onFeedButtonPress = () => {
  Actions.home({});
};

const styles = StyleSheet.create({
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
    width: 250,
    height: 150
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00ff7f'
  }
});
