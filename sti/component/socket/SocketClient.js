import * as SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { callback } from './SocketUtils';

export const socketClient = () => {
  return new Client({
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 1000,
    heartbeatIncoming: 1000,
    heartbeatOutgoing: 1000,
    webSocketFactory: function () {
      return new SockJS('http://localhost:8000/api/ws');
      // return new SockJS('https://zzip0.com/api/ws');
    },

    onDisconnect: function () {
      console.log('소켓 연결 끊음');
    },
    onStompError: function (frame) {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    }
  });
};

export const makeSocketConnection = (client, url, userInfo) => {
  client.connectHeaders = {
    userEmail: userInfo.data.email,
    roomUrl: url
  };
  client.onConnect = function (frame) {
    client.subscribe(`/topic/room/${url}`, callback);
    client.publish({
      destination: '/app/room',
      body: JSON.stringify({
        sender: userInfo.data.membername,
        roomId: url,
        roomAction: 'ENTER',
        skipContentLengthHeader: true
      }),
      skipContentLengthHeader: true
    });
  };
};
