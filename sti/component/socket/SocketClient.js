import * as SockJS from 'sockjs-client';
import { callback } from './SocketUtils';

export const socketClient = () => {
  const StompJs = require('@stomp/stompjs');
  return new StompJs.Client({
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

    onDisconnect: function () {
      console.log('소켓 연결 끊음');
    },
    onStompError: function (frame) {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    }
  });
};
