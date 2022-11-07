import * as SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { callback } from './SocketUtils';

function makeSocketConnection(url, userInfo) {
  const socketClient = new Client({
    connectHeaders: {
      userEmail: userInfo.data.email,
      roomUrl: url
    },
    debug: function (str) {
      // console.log(str);
    },
    reconnectDelay: 1000,
    heartbeatIncoming: 1000,
    heartbeatOutgoing: 1000,
    webSocketFactory: function () {
      // return new SockJS('http://localhost:8000/api/ws');
      return new SockJS('https://zzip0.com/api/ws');
    },
    onConnect: function (frame) {
      socketClient.subscribe(`/topic/room/${url}`, callback);
      socketClient.publish({
        destination: '/app/room',
        body: JSON.stringify({
          sender: userInfo.data.membername,
          roomId: url,
          roomAction: 'ENTER',
          skipContentLengthHeader: true
        }),
        skipContentLengthHeader: true
      });
    },
    onDisconnect: function () {
      console.log('소켓 연결 끊음');
    },
    onStompError: function (frame) {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    }
  });
  return socketClient;
}

export default makeSocketConnection;
