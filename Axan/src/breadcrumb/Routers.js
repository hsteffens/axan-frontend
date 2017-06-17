import React, { Component } from 'react';
import {
   StyleSheet,
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import Login  from '../authentication/Login';
import Registration  from '../register/Registration';
import Home from '../home/Index';
import Product from '../home/products/Product';
import ProductOwner from '../productsOwner/Index';
import Owner from '../productsOwner/ProductOwner';
import Map from '../maps/Maps';
import Preferences from '../prefs/Preferences';

export default class Routers extends Component {
  render() {
    return (
      <Router getSceneStyle={getSceneStyle}>
        <Scene key="root">
          <Scene key="home" hideNavBar={false} component={Home} title="Home">
              <Scene key="product" hideNavBar={false} component={Product} title="Produto" />
          </Scene>
          <Scene key="productOwner" hideNavBar={false} component={ProductOwner} title="Meus Produtos" >
              <Scene key="owner" hideNavBar={false} component={Owner} title="Meus Produto" />
          </Scene>
          <Scene key="register" hideNavBar={false} component={Registration} title="Registration" />
          <Scene key="preferences" hideNavBar={false} component={Preferences} title="Preferences" />
          <Scene key="authentication" hideNavBar={true} component={Login}  initial={true} />
          <Scene key="map" hideNavBar={true} component={Map} title="Opções de Compras" />
        </Scene>
      </Router>
    )
  }
}

const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 50;
  }
  return style;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center'
  },
  tabBarStyle: {
    backgroundColor: '#eee'
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd'
  },
});
