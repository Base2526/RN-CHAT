import React from 'react'
import {View, 
        Text, 
        FlatList,
        TouchableOpacity,
        Image} from 'react-native' 

import { connect } from 'react-redux';
import * as actions from '../src/actions'    

class Login extends React.Component {
    constructor(props) {
      super(props);

      // 
      this.state = {
        userA:[{type:'private', 
                chatId:'cdPBIkBjwEXbGHE9iKcg',
                userId:'549000',
                profile:{
                    name:'User B',
                    image_url:'https://i.cartoonnetwork.com/prismo/props/chars/ben17_180x180_0.png'
                    }
                },
                {type:'private', 
                chatId:'cdPBIkBjwEXbGHE9iKQqq',
                userId:'549001',
                profile:{
                    name:'User C',
                    image_url:'https://previews.123rf.com/images/memoangeles/memoangeles1403/memoangeles140300023/27373437-cartoon-taco-wearing-a-sombrero-vector-clip-art-illustration-with-simple-gradients-taco-and-sombrero.jpg'
                    }
                },
                {type:'group', 
                chatId:'RadytYpBu2qdISVt4EXh',
                name_group:"# AAA",
                image_url:'https://static.thenounproject.com/png/10980-200.png',
                members:{
                    '549074':{ // userId
                        name:'User A',
                        image_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBAtm25vh_MHqOrJ_nJU_QkG4PegXubKPL28iMGI3DS805uC7F'
                    },
                    '549000':{ // userId
                        name:'User B',
                        image_url:'https://i.cartoonnetwork.com/prismo/props/chars/ben17_180x180_0.png'
                    },
                    '549001':{ // userId
                        name:'User C',
                        image_url:'https://previews.123rf.com/images/memoangeles/memoangeles1403/memoangeles140300023/27373437-cartoon-taco-wearing-a-sombrero-vector-clip-art-illustration-with-simple-gradients-taco-and-sombrero.jpg'
                    }
                }
            }], // 
            userB:[{type:'private', 
                    chatId:'cdPBIkBjwEXbGHE9iKcg',
                    userId:'549074',
                    profile:{
                        name:'User A',
                        image_url:'https://vignette.wikia.nocookie.net/justdance/images/a/a6/AC_Avatar_%28UG%29.png/revision/latest?cb=20151106005318'
                        }
                    },
                    {type:'private', 
                    chatId:'cdPBIkBjwEXbGHE9iKkk',
                    userId:'549001',
                    profile:{
                        name:'User C',
                        image_url:'https://previews.123rf.com/images/memoangeles/memoangeles1403/memoangeles140300023/27373437-cartoon-taco-wearing-a-sombrero-vector-clip-art-illustration-with-simple-gradients-taco-and-sombrero.jpg'
                        }
                    },
                    {type:'group', 
                    chatId:'RadytYpBu2qdISVt4EXh',
                    name_group:"# AAA",
                    image_url:'https://static.thenounproject.com/png/10980-200.png',
                    members:{
                        '549074':{ // userId
                            name:'User A',
                            image_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBAtm25vh_MHqOrJ_nJU_QkG4PegXubKPL28iMGI3DS805uC7F'
                        },
                        '549000':{ // userId
                            name:'User B',
                            image_url:'https://i.cartoonnetwork.com/prismo/props/chars/ben17_180x180_0.png'
                        },
                        '549001':{ // userId
                            name:'User C',
                            image_url:'https://previews.123rf.com/images/memoangeles/memoangeles1403/memoangeles140300023/27373437-cartoon-taco-wearing-a-sombrero-vector-clip-art-illustration-with-simple-gradients-taco-and-sombrero.jpg'
                        }
                    }
                }], // 
                userC:[{type:'private', 
                        chatId:'cdPBIkBjwEXbGHE9iKQqq',
                        userId:'549074',
                        profile:{
                            name:'User A',
                            image_url:'https://vignette.wikia.nocookie.net/justdance/images/a/a6/AC_Avatar_%28UG%29.png/revision/latest?cb=20151106005318'
                            }
                        },
                        {type:'private', 
                        chatId:'cdPBIkBjwEXbGHE9iKkk',
                        userId:'549000',
                        profile:{
                            name:'User B',
                            image_url:'https://i.cartoonnetwork.com/prismo/props/chars/ben17_180x180_0.png'
                            }
                        },
                        {type:'group', 
                        chatId:'RadytYpBu2qdISVt4EXh',
                        name_group:"# AAA",
                        image_url:'https://static.thenounproject.com/png/10980-200.png',
                        members:{
                            '549074':{ // userId
                                name:'User A',
                                image_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBAtm25vh_MHqOrJ_nJU_QkG4PegXubKPL28iMGI3DS805uC7F'
                            },
                            '549000':{ // userId
                                name:'User B',
                                image_url:'https://i.cartoonnetwork.com/prismo/props/chars/ben17_180x180_0.png'
                            },
                            '549001':{ // userId
                                name:'User C',
                                image_url:'https://previews.123rf.com/images/memoangeles/memoangeles1403/memoangeles140300023/27373437-cartoon-taco-wearing-a-sombrero-vector-clip-art-illustration-with-simple-gradients-taco-and-sombrero.jpg'
                            }
                        }
                    }]
        }
    }

    componentDidMount(){
        // this.props.actionLogout((result)=>{
        //     console.log(result)
        // })
    }

    render() {
      return (<View style={{flex:1}}>
                <TouchableOpacity
                    style={{borderColor:'red', borderWidth:1, padding:10, margin:10, alignItems:'center'}}
                    onPress={()=>{
                        // 
                        // this.props.watchTaskEvent(this.props.uid, this.props.dispatch)

                        this.props.actionLogin('549074', 'User A', this.state.userA, (result)=>{

                            this.props.navigation.navigate('Contact', {data: this.state.userA, title: 'userA'});

                            this.props.watchTaskEvent(['cdPBIkBjwEXbGHE9iKcg', 'cdPBIkBjwEXbGHE9iKQqq', 'RadytYpBu2qdISVt4EXh'])
                        })
                    }}>
                    <Text>User A</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{borderColor:'red', borderWidth:1, padding:10, margin:10, alignItems:'center'}}
                    onPress={()=>{
                        this.props.actionLogin('549000', 'User B', this.state.userB, (result)=>{

                            // console.log(result)
                            this.props.navigation.navigate('Contact', {data: this.state.userB, title: 'userB'});

                            this.props.watchTaskEvent(['cdPBIkBjwEXbGHE9iKcg', 'cdPBIkBjwEXbGHE9iKkk', 'RadytYpBu2qdISVt4EXh'], this.props.dispatch)
                        })
                    }}>
                    <Text>User B</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{borderColor:'red', borderWidth:1, padding:10, margin:10, alignItems:'center'}}
                    onPress={()=>{
                        this.props.actionLogin('549001', 'User C', this.state.userC, (result)=>{

                            // console.log(result)
                            this.props.navigation.navigate('Contact', {data: this.state.userC, title: 'userC'});

                            this.props.watchTaskEvent(['cdPBIkBjwEXbGHE9iKQqq', 'cdPBIkBjwEXbGHE9iKkk', 'RadytYpBu2qdISVt4EXh'], this.props.dispatch)
                        })
                    }}>
                    <Text>User C</Text>
                </TouchableOpacity>
              </View>)
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    if(!state._persist.rehydrated){
      return {}
    }
  
    return{
      // auth:state.auth
    }
}

export default connect(mapStateToProps, actions)(Login);