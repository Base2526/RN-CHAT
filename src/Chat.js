import React from 'react'
import {View, 
        Text, 
        TouchableOpacity, 
        Image,
        FlatList,
        Alert} from 'react-native'

import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

import * as actions from '../src/actions' 
import Constant from './Constant'

const optionsPhoto = {
  title: 'Select Avatar',
  // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  noData: true,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  mediaType    : "photo",
  quality: 0.7,
  maxWidth: 500,
  maxHeight: 500,
};

const optionsVideo = {
  title: 'Select Avatar',
  // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  noData: true,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  mediaType    : "video",
  quality: 0.7,
  maxWidth: 500,
  maxHeight: 500,
};

class Chat extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        item: null,
        messages: [],
        isFetching: false,
      }

      this.sendMessage = this.sendMessage.bind(this)
    }

    static navigationOptions = ({ navigation }) => ({
      title: `${navigation.state.params.title}`,
      headerRight: (
        <TouchableOpacity
          style={{paddingRight:10}}
          onPress={() => {
            const { params = {} } = navigation.state
            params.handleSendMessage()
          }}>
          <Text style={{fontSize:25}}>+</Text>
        </TouchableOpacity>
      ),
    });

    componentDidMount(){

      // console.log(require('./pic.jpg'))

      this.props.navigation.setParams({ handleSendMessage: this.handleSendMessage })

      // receive param from contact
      let { navigation } = this.props;
      let item = navigation.getParam('item', null);
       
      this.setState({
        item
      })
    }

    // call when data update
    componentWillReceiveProps(nextProps) {
      // console.log(nextProps)

      this.setState({
        messages:nextProps.messages
      })
    }

    onRefresh() {
      // console.log('refreshing')
      this.setState({ isFetching: true }, function() {
        this.props.actionLoadMessageMore(this.state.item.chatId, '', (result)=>{
          if(result.status){

          }
          this.setState({isFetching: false });
        })
      });
    }

    handleSendMessage = () =>{
      Alert.alert(
        'Select',
        '',
        [
          {text: 'Send Text', 
            onPress: () => {
              let message = {uid:this.props.chat.uid, message_type:'text', text:'test message'}

              // console.log(message)
              this.props.actionSendMessage(this.state.item.chatId, message, (result)=>{
                console.log(result)
              })
            }
          },
          {
            text: 'Send Image',
            onPress: () => {
              ImagePicker.showImagePicker(optionsPhoto, (response) => {
                // console.log('Response = ', response);

                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.error) {
                  console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                  console.log('User tapped custom button: ', response.customButton);
                } else {
                  let message = {uid:this.props.chat.uid, message_type:'image', uri:response.uri }
                  this.props.actionSendImage(this.state.item.chatId, message, (result)=>{
                    console.log(result)
                  })
                }
              });
            },
          },
          {text: 'Send Video', 
            onPress: () => {
            
              ImagePicker.showImagePicker(optionsVideo, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.error) {
                  console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                  console.log('User tapped custom button: ', response.customButton);
                } else {
                  let message = {uid:this.props.chat.uid, message_type:'video', uri:response.uri }
                  this.props.actionSendVideo(this.state.item.chatId, message, (result)=>{
                    console.log(result)
                  })
                }
              });
            }
          },
          {
            text: 'Close',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }

    sendMessage=(message)=>{
      this.props.actionSendMessage(this.state.item.chatId, message, (result)=>{
        console.log(result)
      })
    }

    renderItem = ({item, index}) => { 

      console.log(item)

      if(item.message_type == 'text'){
        return(<View style={{}}>
          {/* <Text>{item.messageId}</Text> */}
          <View style={{flexDirection:'row', padding:10,}}>
            <Text>Text : {item.text}</Text>
            <Text>  > Status : {item.status}</Text>
          </View>
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
      }else if(item.message_type == 'image'){

        return(<View style={{}}>
            <View style={{flexDirection:'row', padding:10,}}>
              <Text>Text : image</Text>
              <Text>  > Status : {item.status}</Text>
            </View>
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
      }else if(item.message_type == 'video'){
        return(<View style={{}}>
            {/* <Text>{item.messageId}</Text> */}
            <View style={{flexDirection:'row', padding:10,}}>
              <Text>Text : video</Text>
              <Text>  > Status : {item.status}</Text>
            </View>
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
  
    render() {
      let {messages} = this.props
      return (<View style={{flex:1}}>
                <FlatList
                  style={{flex:1}}
                  data={messages}
                  renderItem={this.renderItem.bind(this)}
                  keyExtractor={(item, index) => item.messageId}
                  extraData={messages}
                  onRefresh={() => this.onRefresh()}
                  refreshing={this.state.isFetching}
                />
              </View>)
    }
}

/*
  Track on data all and refresh
*/
const mapStateToProps = (state, ownerState) => {
  if(!state._persist.rehydrated){
    return {}
  }

  // refer ownerState
  let params = ownerState.navigation.state.params
  let messages  = []
  for (let [key, value] of Object.entries(state.chat.conversations)) {
      if(key === params.item.chatId){
          messages = value;
          break;
      }
  }

  return{
    messages,
    chat:state.chat
  }
}

export default connect(mapStateToProps, actions)(Chat);