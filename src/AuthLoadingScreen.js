import React from 'react';
import {
    StatusBar,
    View,
    } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './actions'

class AuthLoadingScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._bootstrapAsync();
    }

    _bootstrapAsync = () => {
        // console.log(this.props.uid)
        if(this.props.uid === null){
            this.props.navigation.navigate('AuthStack');
        }else{
            this.props.navigation.navigate('ContactStack');
        }
    }

    render() {
        return (
            <View style={{flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',}}>
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    if(!state._persist.rehydrated){
        return {}
    }

    // if(state.auth.users !== null){
    //     return {
    //         auth:state.auth,
    //         uid:state.auth.users.user.uid
    //     }
    // }else{
    //     return {
    //         auth:state.auth
    //     }
    // }

    return {
        uid:state.chat.uid
    }
}

export default connect(mapStateToProps, actions)(AuthLoadingScreen);