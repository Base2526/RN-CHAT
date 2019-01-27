import React from 'react'
import {View, 
        Text, 
        FlatList,
        TouchableOpacity,
        Image} from 'react-native'

import { connect } from 'react-redux';
import * as actions from '../src/actions'    

class Contact extends React.Component {
    static navigationOptions = ({ navigation }) => ({
      // title: `${navigation.state.params.title}`,
      headerRight: (
        <TouchableOpacity
          style={{paddingRight:10}}
          onPress={() => {
            const { params = {} } = navigation.state
            params.handleLogout()
          }}>
          <Text style={{color:'red'}}>Logout</Text>
        </TouchableOpacity>
      ),
    });

    constructor(props) {
      super(props);

      this.state = {
        data:[]
      }
    }

    componentWillMount(){
      this.props.navigation.setParams({ handleLogout: this.handleLogout })
  
      this.setState({
        data:this.props.chat.data
      })
    }

    handleLogout = () =>{
      this.props.actionLogout((result)=>{
        // console.log(result)
        this.props.navigation.navigate('AuthStack');
      })
    }

    renderItem = ({item, index}) => { 
      
      if(item.type == 'private'){

        return(
          <View
            style={{
              height:80,
              justifyContent:'center',
            }}>
            <TouchableOpacity 
              onPress={()=>{
                // console.log(item)
                this.props.navigation.navigate("Chat", {'item': item, title: 'Private :' + item.profile.name})
              }}>
                  <View style={{flexDirection:'row'}}>
                        <Image
                          style={{width:40, height:40}}
                          source={{uri:item.profile.image_url}}
                        />
                    <View style={{flex:1, justifyContent:'center'}}>
                      <Text style={{fontSize:22}}>{item.profile.name}</Text>
                    </View>
                  </View>
            </TouchableOpacity>
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#CED0CE",
                // backgroundColor:'green',
                position:'absolute',
                bottom:0
              }}/>
          </View>)
 
      }else if(item.type == 'group'){
        return(
          <View
            style={{
              height:80,
              justifyContent:'center',
            }}>
            <TouchableOpacity 
              onPress={()=>{
                console.log(item)
                this.props.navigation.navigate("Chat", {'item': item,  title: 'Group :' + item.name_group})
              }}>
                  <View style={{flexDirection:'row'}}>
                        <Image
                          style={{width:40, height:40}}
                          source={{uri:item.image_url}}
                        />
                    <View style={{flex:1, justifyContent:'center'}}>
                      <Text style={{fontSize:22}}>{item.name_group}</Text>
                    </View>
                  </View>
            </TouchableOpacity>
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#CED0CE",
                // backgroundColor:'green',
                position:'absolute',
                bottom:0
              }}/>
          </View>)
      }
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        data:nextProps.chat.data
      })
    }
  
    render() {
      return (<View style={{flex:1}}>
                <FlatList
                  data={this.state.data}
                  renderItem={this.renderItem.bind(this)}
                />
              </View>)
    }
}

const mapStateToProps = (state) => {
  // console.log(state)
  if(!state._persist.rehydrated){
    return {}
  }

  return{
    chat:state.chat
  }
}

export default connect(mapStateToProps, actions)(Contact);