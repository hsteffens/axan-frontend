import React, { Component } from 'react';
import { StyleSheet, View, Text, ListView, Image,TouchableWithoutFeedback} from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import SearchBar from 'react-native-material-design-searchbar';
import Map from '../maps/Maps';

export default class Feed extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        {name:'Banana',price:'3.86', picture:'http://www.clker.com/cliparts/f/1/d/9/13683029131592382225bananas-icon-md.png'},
        {name:'Picanha',price:'38.00', picture:'https://cdn2.iconfinder.com/data/icons/food-icons-6/200/food_pork_thig-512.png'},
        {name:'Macarrão',price:'3.20', picture:'https://cdn3.iconfinder.com/data/icons/food-from-around-the-world/512/pasta-512.png'},
        {name:'Ovos',price:'4.50', picture:'https://d30y9cdsu7xlg0.cloudfront.net/png/20088-200.png'}
      ])
    };
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'darkslateblue'}}>
        <View style={{flex: 2, padding:20, justifyContent: 'space-between'}}>
            <Text style={styles.title}>R$ 138,2O</Text>
            <Button
              containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#6a5acd'}}
              style={{fontSize: 18, color: 'white'}} onPress={onMapButtonPress} >
                Consultar local Indicado
            </Button>
        </View>
        <View style={{flex: 6}}>
            <ListView
                  dataSource={this.state.dataSource}
                  renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                  renderRow={(rowData) =>
                    <View style={{height:100, padding:10, backgroundColor: 'mediumslateblue'}}>
                      <TouchableWithoutFeedback>
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
      </View>
    )
  }
}

const onMapButtonPress = () => {
  Actions.map({});
};
const onFeedButtonPress = () => {
  Actions.home({});
};

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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00ff7f'
  }
});
