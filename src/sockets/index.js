import * types from '../constants/ActionTypes'

import { addUser, messageReceived, populateUserList } from '../actions/index';
import { dispatch } from 'rxjs/internal/observable/pairs';

const setupSocket = (dispatch, username) => {
    const socket = new WebSocket('ws://localhost:8989')
    // event handler that's called when web socket is open
    socket.onopen = () => {
        // Sends a default user
        socket.send(JSON.stringify({
            type: types.ADD_USER,
            name: username
        }))
        console.log("Web socket is open now")
    }

    // receiving message from the server
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        switch (data.type) {
            case types.ADD_MESSAGE:
                dispatch(messageReceived(data.message, data.author))
                break
            case types.ADD_USER:
                dispatch(addUser(data.name))
            case types.USERS_LIST:
                dispatch(populateUserList(data.users))
            default:
                break      
        }

        console.log("Web socket is open now")
    }

    return socket
}

export default setupSocket