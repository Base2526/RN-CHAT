import React from "react";
import {View, Text} from "react-native";
        
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'

import configureStore from './ConfigureStore'
const { persistor, store } = configureStore()

import { AppNavigator } from './AppNavigator'


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <AppNavigator />
              </PersistGate>
            </Provider>);
  }
}
