import * as SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { callback } from './SocketUtils';
import { useEffect } from 'react';

export default function stompClient() {
  const [connectedClient, setConnectedClient] = useState('');

  useEffect(() => {
    setConnectedClient(
      new Client({
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
      })
    );
  }, []);

  const getClient = () => {
    return connectedClient;
  };

  const getConnection = (url, userInfo) => {
    connectedClient.connectHeaders = {
      userEmail: userInfo.data.email,
      roomUrl: url
    };
    connectedClient.onConnect = function (frame) {
      console.log('클라이언트 ㅋㅋ', client);
      // client.subscribe(`/topic/room/${url}`, callback);
      // client.publish({
      //   destination: '/app/room',
      //   body: JSON.stringify({
      //     sender: userInfo.data.membername,
      //     roomId: url,
      //     roomAction: 'ENTER',
      //     skipContentLengthHeader: true
      //   }),
      //   skipContentLengthHeader: true
      // });
    };
    connectedClient.onConnect();
    connectedClient.activate();

    // client.subscribe(`/topic/room/${url}`, callback);
    // client.publish({
    //   destination: '/app/room',
    //   body: JSON.stringify({
    //     sender: userInfo.data.membername,
    //     roomId: url,
    //     roomAction: 'ENTER',
    //     skipContentLengthHeader: true
    //   }),
    //   skipContentLengthHeader: true
    // });
  };
}
