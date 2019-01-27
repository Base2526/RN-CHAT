import firebase from 'react-native-firebase';

import {LOGIN,
        LOGOUT,
        SEND_MESSAGE,
        UPDATE_STATUS_MESSAGE,
        } from './types'
import Constant from '../Constant'

import { upload_image, upload_video, load_messasge_more} from '../Api'

export const actionLogin = (uid, name, data, callback) => dispatch =>{
    dispatch({ type: LOGIN, uid, name, data});

    callback({'status':true})
}

export const actionLogout = (callback) => dispatch =>{
    dispatch({ type: LOGOUT});

    callback({'status':true, 'function': 'logout'})
}

export const actionSendMessage = (chatId, message, callback) => dispatch=> {
    let messageId = firebase.firestore().collection('conversation').doc(chatId).collection('messages').doc().id;
    
    let newMessage ={messageId, 
                    ...{status:Constant.MESSAGE_STATUS.SEND}, 
                    ...message}

    // console.log(newMessage)
                    
    dispatch({  type: SEND_MESSAGE, 
                chatId, 
                newMessage});

    firebase.firestore().collection('conversation').doc(chatId).collection('messages').doc(messageId).set({
        message_type: message.message_type,
        text: message.text,
        status: Constant.MESSAGE_STATUS.SEND,
        create: firebase.firestore.FieldValue.serverTimestamp(),
        update: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function() {
        dispatch({ type: UPDATE_STATUS_MESSAGE, chatId, messageId, status:Constant.MESSAGE_STATUS.COMPLETE});
    })
    .catch(function(error) {
        dispatch({ type: UPDATE_STATUS_MESSAGE, chatId, messageId, status:Constant.MESSAGE_STATUS.ERROR});
    });

    callback({'status':true})
}

export const actionSendImage = (chatId, message, callback) => dispatch=> {
    let messageId = firebase.firestore().collection('conversation').doc(chatId).collection('messages').doc().id;
    
    let newMessage ={messageId, 
                    ...{status:Constant.MESSAGE_STATUS.SEND}, 
                    ...message}
                    
    dispatch({  type: SEND_MESSAGE, 
                chatId, 
                newMessage});
    
    return upload_image(message.uid, message.uri).then(data => {
        // console.log(data)

        firebase.firestore().collection('conversation').doc(chatId).collection('messages').doc(messageId).set({
            message_type: message.message_type,
            original_url: data.original_url,
            thumbnail_url: data.thumbnail_url,
            status: Constant.MESSAGE_STATUS.SEND,
            create: firebase.firestore.FieldValue.serverTimestamp(),
            update: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function() {
            dispatch({ type: UPDATE_STATUS_MESSAGE, chatId, messageId, status:Constant.MESSAGE_STATUS.COMPLETE});
        })
        .catch(function(error) {
            dispatch({ type: UPDATE_STATUS_MESSAGE, chatId, messageId, status:Constant.MESSAGE_STATUS.ERROR});
        });
    
        callback({'status':true, 'function':'Send Image'})
    })    
}

export const actionSendVideo = (chatId, message, callback) => dispatch=> {
    let messageId = firebase.firestore().collection('conversation').doc(chatId).collection('messages').doc().id;
    
    let newMessage ={messageId, 
                    ...{status:Constant.MESSAGE_STATUS.SEND}, 
                    ...message}
                    
    dispatch({  type: SEND_MESSAGE, 
                chatId, 
                newMessage});

    return upload_video(message.uid, message.uri).then(data => {
        // console.log(data)
        firebase.firestore().collection('conversation').doc(chatId).collection('messages').doc(messageId).set({
            message_type: message.message_type,
            original_url: data.original_url,
            thumbnail_url: data.thumbnail_url,
            video_url: data.video_url,
            status: Constant.MESSAGE_STATUS.SEND,
            create: firebase.firestore.FieldValue.serverTimestamp(),
            update: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function() {
            dispatch({ type: UPDATE_STATUS_MESSAGE, chatId, messageId, status:Constant.MESSAGE_STATUS.COMPLETE});
        })
        .catch(function(error) {
            dispatch({ type: UPDATE_STATUS_MESSAGE, chatId, messageId, status:Constant.MESSAGE_STATUS.ERROR});
        });
        callback({'status':true, 'function':'Send Video'})
    })
}

export const actionLoadMessageMore = (chatId, messageIdLast, callback)=> dispatch=> {

    return load_messasge_more(chatId, messageIdLast).then(data => {
        // console.log(data)

        // Loop dispatch({ type: ADD_MESSAGE, chatId, message});
        callback({'status':true})
    })
}

export const watchTaskEvent = (chatIds) => dispatch=> {
    chatIds.forEach(function(chatId) {
        // console.log(chatId);
        // track conversation
        firebase.firestore().collection('conversation').doc(chatId).collection('messages').onSnapshot((querySnapshot) => {
            // console.log(querySnapshot)
            querySnapshot.docChanges.forEach(function(change) {
                console.log(change.type)

                // track all [add/edit/delete message]
                if (change.type === 'added') {

                }else  if (change.type === 'modified'){

                }else  if (change.type === 'removed'){

                }
            })
        })
    });

}