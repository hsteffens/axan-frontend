import React, { Component } from 'react';
import { StyleSheet, View, Text, ListView, Image, TouchableWithoutFeedback} from 'react-native';
import { Actions } from 'react-native-router-flux';
import SearchBar from 'react-native-material-design-searchbar';

export default class Feed extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      selectProduct: {},
      dataSource: ds.cloneWithRows([
        {name:'Batata',price:'12.00', picture:'https://maxcdn.icons8.com/Share/icon/Plants//potato1600.png'},
        {name:'Arroz',price:'8.00', picture:'https://cdn1.iconfinder.com/data/icons/cooking-and-food/510/01-Rice-512.png'},
        {name:'Feijão',price:'13.50', picture:'https://cdn0.iconfinder.com/data/icons/different-types-of-legumes/32/kidney-beans-512.png'},
        {name:'Maça',price:'5.80', picture:'https://cdn1.iconfinder.com/data/icons/food-drink-5/32/apple-512.png'},
        {name:'Banana',price:'3.86', picture:'http://www.clker.com/cliparts/f/1/d/9/13683029131592382225bananas-icon-md.png'},
        {name:'Picanha',price:'38.00', picture:'https://cdn2.iconfinder.com/data/icons/food-icons-6/200/food_pork_thig-512.png'},
        {name:'Macarrão',price:'3.20', picture:'https://cdn3.iconfinder.com/data/icons/food-from-around-the-world/512/pasta-512.png'},
        {name:'Ovos',price:'4.50', picture:'https://d30y9cdsu7xlg0.cloudfront.net/png/20088-200.png'}
      ])
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
