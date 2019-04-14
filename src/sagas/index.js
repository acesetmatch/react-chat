import { takeEvery } from "redux-saga/effects";
import * as types from "../constants/ActionTypes";

// Handling new message from the server. Takes all aciton of type add message.
// When action occurs, Send message to the web socket.

const handleNewMessage = function* handleNewMessage(params) {
  yield takeEvery(types.ADD_MESSAGE, action => {
    action.author = params.username;
    params.socket.send(JSON.stringify(action));
  });
};

export default handleNewMessage;
