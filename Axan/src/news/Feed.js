import React, { Component } from 'react';
import { StyleSheet, View, Text, ListView, Image, TouchableWithoutFeedback} from 'react-native';
import { Actions } from 'react-native-router-flux';
import SearchBar from 'react-native-material-design-searchbar';

export default class Feed extends Component {

  async function getData() {
    try {
        let response = await fetch(GLOBAL.BASE_URL + '/product/search/');
        return response.json(); // this call is not async
    } catch(error) {
        console.error(error);
    }
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      selectProduct: {},
      dataSource: ds.cloneWithRows(getData())
    };
  }

  selectProduct = async (stateKey, options) => {
        Actions.register({});
  };

  _renderRow(rowData: string, sectionID: number, rowID: number) {
     console.log('render row ...');
     return (
          <TouchableHighlight onPress={this._onPressRow.bind(this, rowID, rowData)}>
           <View style={{flex: 1, height:100, padding:10, backgroundColor: 'mediumslateblue'}}>
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
           </TouchableHighlight>
         );
  }

  _onPressRow(rowID, rowData) {
    console.log('Finalmente aqui!!');

  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'darkslateblue'}}>
        <View style={{flex: 1, padding:20}}>
          <SearchBar
            onSearchChange={() => console.log('On Search')}
            height={50}
            onFocus={() => console.log('On Focus')}
            onBlur={() => console.log('On Blur')}
            placeholder={'Search...'}
            autoCorrect={false}
            padding={5}
            inputStyle={{overflow:'hidden', borderRadius:12}}
            returnKeyType={'search'} />
        </View>
        <View style={{flex: 6}}>
            <ListView
                  dataSource={this.state.dataSource}
                  renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                  renderRow = {this._renderRow.bind(this)}
                />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
