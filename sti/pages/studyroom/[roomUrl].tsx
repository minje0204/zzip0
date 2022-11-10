// @ts-nocheck

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  makeSocketConnection,
  socketClient
} from '../../component/socket/SocketClient';
import { callback } from '../../component/socket/SocketUtils';
//recoil
import { userState } from '../../lib/recoil/member';
import { useRecoilState } from 'recoil';
import { getUser } from '../../lib/api/member';
import { myroomState } from '../../lib/recoil/room';
//component
import Background from '../../component/studyroom/Background/Background';
import Timer from '../../component/studyroom/Timer/Timer';
import TodoList from '../../component/studyroom/Todo/TodoList';
import Dday from '../../component/studyroom/Dday/Dday';
import SideBar from '../../component/studyroom/SideBar/SideBar';
import WhiteNoise from '../../component/studyroom/WhiteNoise/WhiteNoise';
import Memo from '../../component/studyroom/Memo/Memo';
import ChatBtn from '../../component/studyroom/Chat/ChatBtn';
import { connect } from 'http2';

interface Test {}

const StudyRoom: Test = () => {
  const router = useRouter();
  const roomUrl = router.query;
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [roomInfo, setRoomInfo] = useRecoilState(myroomState);
  const [socketConnection, setSocketConnection] = useState('');

  const getUserInfo = () => {
    getUser().then((res) => {
      setUserInfo(res);
    });
  };

  const socketCallback = (message) => {
    let recv = JSON.parse(message.body);
    switch (recv.roomAction) {
      case 'ENTER':
        console.log(`쨔로로롱 ${recv.sender}가 들어왔지롱`);
        break;
      case 'EXIT':
        console.log(`뾰로로롱 ${recv.sender}가 나갔다롱`);
        break;
      case 'CHAT':
        console.log('채팅을 쳤다.');
        break;
    }
  };
  useEffect(() => {
    if (userInfo.data && !socketConnection) {
      const connectionConst = socketClient();
      connectionConst.connectHeaders = {
        userEmail: userInfo.data.email,
        roomUrl: roomUrl['roomUrl']
      };
      connectionConst.onConnect = function (frame) {
        connectionConst.subscribe(
          `/topic/room/${roomUrl['roomUrl']}`,
          socketCallback
        );
        connectionConst.publish({
          destination: '/app/room',
          body: JSON.stringify({
            sender: userInfo.data.membername,
            roomId: roomUrl['roomUrl'],
            roomAction: 'ENTER',
            skipContentLengthHeader: true
          }),
          skipContentLengthHeader: true
        });
      };
      connectionConst.onDisconnect = function (frame) {
        connectionConst.unsubscribe();
        connectionConst.publish({
          destination: '/app/room',
          body: JSON.stringify({
            sender: userInfo.data.membername,
            roomId: roomUrl['roomUrl'],
            roomAction: 'EXIT',
            skipContentLengthHeader: true
          }),
          skipContentLengthHeader: true
        });
      };
      // makeSocketConnection(connectionConst, roomUrl['roomUrl'], userInfo);
      connectionConst.activate();
      setSocketConnection(connectionConst);
    } else if (socketConnection) {
      console.log('소켓 연결이 존재함', socketConnection);
    }
  }, [userInfo]);

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', preventGoBack);

    return () => {
      window.removeEventListener('popstate', preventGoBack);
    };
  }, [socketConnection]);

  const preventGoBack = () => {
    socketConnection.deactivate();
  };

  // useEffect(() => {}, []);
  return (
    <>
      <SideBar socketConnection={socketConnection} />
      <ChatBtn />
      <Memo />
      <WhiteNoise />
      <TodoList />
      <Timer />
      <Dday />
      <Background />
    </>
  );
};

export default StudyRoom;
