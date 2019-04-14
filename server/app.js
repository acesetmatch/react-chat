const WebSocket = require("ws");
import * as types from "../src/constants/ActionTypes";

const wss = new WebSocket.Server({ port: 8989 });

const users = [];

// Broadcast to all connected clients
const broadcast = (data, ws) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data));
    }
  });
};

// When web socket forms a connections
wss.on("connection", ws => {
  let index;
  ws.on("message", message => {
    const data = JSON.parse(message);
    switch (data.type) {
      case "ADD_USER":
        index = users.length;
        users.push({ name: data.name, id: index + 1 });
        ws.send(
          JSON.stringify({
            type: types.USERS_LIST
          })
        );
        broadcast(
          {
            type: types.USERS_LIST,
            users
          },
          ws
        );
        break;
      case "ADD_MESSAGE":
        // Everybody connected to the server gets that message
        broadcast(
          {
            type: "ADD_MESSAGE",
            message: data.message,
            author: data.author
          },
          ws
        );
        break;
      default:
        break;
    }
  });
  // When websocket closes, it closes the user for that user list (splices to remove user).
  wss.on("close", () => {
    users.splice(index, 1);
    broadcast(
      {
        type: "USERS_LIST",
        users
      },
      ws
    );
  });
});
