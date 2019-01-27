import Constant from './Constant'

export const upload_image = (uid, uri) =>{
    var data = new FormData();
    data.append('idna', {
        uri: uri, 
        name: 'imageName.png',
        type: 'image/png'
    })

    data.append("uid", uid)

    return fetch(Constant.URI_API + 'chat_upload_picture', {
        headers: {'Accept': 'application/json','Content-Type': 'application/json'},
        method: 'POST',
        body: data
      }).then((response) => {
          return response.json()
      }).then((responseJson) => {
          return responseJson;
      }).catch((error) => {
        return {'status': false, 'message': error}
      })
}

/*
Format support : "image/mp4", "video/mp4", "application/mp4"
Limit file : 50M
*/ 
export const upload_video = (uid, uri) =>{
    var data = new FormData();
    data.append('idna', {
        uri: uri, // your file path string
        name: 'video.mp4',
        type: 'image/mp4'
    })

    data.append("uid", uid)

    return fetch(Constant.URI_API + 'chat_upload_video', {
        headers: {'Content-Type': 'multipart/form-data', 'Accept': 'application/json'},
        method: 'POST',
        body: data
      }).then((response) => {
        return response.json()
      }).then((responseJson) => {
        return responseJson;
      }).catch((error) => {
        return {'status': false, 'message': error}
      })
}

export const load_messasge_more = (chatId, messageIdLast) => {
    let data = {
        method: 'POST',
        body: JSON.stringify({
            'chatId': chatId,
            'messageIdLast': messageIdLast
        }),
        headers: {'Accept': 'application/json','Content-Type': 'application/json'},
    }

    return fetch(Constant.URI_API + 'chat_messasge_more', data)
        .then((response) =>{
            return response.json()
        })
        .then((responseJson) => {
            return responseJson;
        }).catch((error) => {
            console.error(error);
        });
};