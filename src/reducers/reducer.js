import {LOGIN, 
        LOGOUT, 
        SEND_MESSAGE,
        UPDATE_STATUS_MESSAGE} from '../actions/types'

/*
    Example : conversations = {'chatId':[{}, {}, {}]}
*/
const INITIAL_STATE = {uid: null, name:null, data:[], conversations:{}}

export default (state= INITIAL_STATE, action)=>{
    // clear all store
    // return INITIAL_STATE; 
    switch(action.type){
        case LOGIN: {
            let newState = {...state,
                            uid:action.uid,
                            name:action.name,
                            data:action.data
                            }

            // console.log(newState)
            return newState
        }

        case LOGOUT:{
            return INITIAL_STATE; 
        }

        case SEND_MESSAGE: {        
            let messages  = []
            for (let [key, value] of Object.entries(state.conversations)) {
                if(key === action.chatId){
                    messages = value;
                    break;
                }
            }

            let newState=  {...state,
                conversations: {
                    ...state.conversations,
                    [action.chatId]: [...messages, action.newMessage]
                }
            }

            return newState
        }

        case UPDATE_STATUS_MESSAGE: {
            let messages  = []
            for (let [key, value] of Object.entries(state.conversations)) {
                if(key === action.chatId){
                    messages = value;
                    break;
                }
            }

            let v = messages.find((element) => {
                return element.messageId === action.messageId;
            })

            let index = messages.findIndex(el => el.messageId === action.messageId);
            messages[index] = {...messages[index], status: action.status};

            // Waring cloned object because redux same object not call update componentWillReceiveProps
            var clonedObjArray = [...messages];

            let newState=  {...state,
                conversations: {
                    ...state.conversations,
                    [action.chatId]: clonedObjArray
                }
            }
            return newState
        }

        default:
            return state
    }
}