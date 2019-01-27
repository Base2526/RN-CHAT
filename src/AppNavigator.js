import React from 'react'
import {createStackNavigator, 
        createSwitchNavigator, 
        createAppContainer } from 'react-navigation';

import AuthLoading from './AuthLoadingScreen'
import Login from './Login'
import Contact from './Contact'
import Chat from './Chat'

export const AuthStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            title: "Login"
        }
    }
});

export const ContactStack = createStackNavigator({
    Contact: {
        screen: Contact,
        navigationOptions: {
            title: "Contact"
        }
    },
    Chat: {
        screen: Chat,
        navigationOptions: {
            // title: "Chat"
        }
    },
});

export const AppNavigator = createAppContainer(createSwitchNavigator(
    {
        AuthLoading,
        AuthStack,
        ContactStack
    },
    {
        initialRouteName: 'AuthLoading',
    }
));