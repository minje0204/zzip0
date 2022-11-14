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
import { roomInfoAPI } from '../../lib/api/room';
import { myroomState } from '../../lib/recoil/room';
import { backgroundBEState } from '../../lib/recoil/background';
import { myRoomPeopleState } from '../../lib/recoil/room';
import { chatState } from '../../lib/recoil/chat';

//component
import Background from '../../component/studyroom/Background/Background';
import Timer from '../../component/studyroom/Timer/Timer';
import TodoList from '../../component/studyroom/Todo/TodoList';
import Dday from '../../component/studyroom/Dday/Dday';
import SideBar from '../../component/studyroom/SideBar/SideBar';
import WhiteNoise from '../../component/studyroom/WhiteNoise/WhiteNoise';
import Memo from '../../component/studyroom/Memo/Memo';
import ChatWidgetView from '../../component/studyroom/SideBar/Chat/ChatWidgetView';
import { connect } from 'http2';

interface Test {}

const StudyRoom: Test = () => {
  const router = useRouter();
  const roomUrl = router.query;
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [roomInfo, setRoomInfo] = useRecoilState(myroomState);
  const [socketConnection, setSocketConnection] = useState('');
  const [backgroundBE, setBackgroundBE] = useRecoilState(backgroundBEState);
  const [onlines, setOnlines] = useRecoilState(myRoomPeopleState);
  const [datas, setDatas] = useRecoilState(chatState);

  const getUserInfo = () => {
    getUser().then((res) => {
      setUserInfo(res);
    });
  };

  const socketCallback = (message) => {
    let recv = JSON.parse(message.body);
    switch (recv.roomAction) {
      case 'ENTER':
        const enterMsg = `${recv.sender}님이 입장하셨습니다.`;
        setDatas((datas) => [...datas, enterMsg]);
        setOnlines((onlines) => [...onlines, recv.sender]);
        roomInfoAPI(roomUrl['roomUrl']).then((res) => {
          setRoomInfo(res.data);
          // console.log('진짜 info', res.data);
          setBackgroundBE(res.data.background);
        });
        break;
      case 'EXIT':
        const exitMsg = `${recv.sender}님이 퇴장하셨습니다.`;
        setDatas((datas) => [...datas, exitMsg]);
        console.log(`뾰로로롱 ${recv.sender}가 나갔다롱`);
        setOnlines((onlines) =>
          onlines.filter((online) => online !== recv.sender)
        );
        break;
      case 'CHAT':
        const chatMsg = `${recv.sender}: ${recv.message}`;
        setDatas((datas) => [...datas, chatMsg]);
        break;
      case 'BACKGROUND':
        console.log(
          `짜뽀로롱 ${recv.sender}가 ${recv.bg.bgTitle}로 배경음악을 바꿨다.`
        );
        setBackgroundBE(recv.bg);
        break;
    }
  };

  useEffect(() => {
    console.log('rrrrr', roomUrl.roomUrl);
    if (userInfo.data && !socketConnection && roomUrl.roomUrl) {
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
        console.log('짜로롱 방 나감');
      };
      connectionConst.activate();
      setSocketConnection(connectionConst);
    } else if (socketConnection) {
      console.log('소켓 연결이 존재함', socketConnection);
    }
<<<<<<< HEAD
  }, [userInfo, roomUrl]);
=======
  }, [userInfo, router.isReady]);
>>>>>>> 5ed748ba3a3662a9d2a0e14bca23b366c68a76fb

  useEffect(() => {
    console.log('ddddddddddddd', roomUrl['roomUrl']);
    getUserInfo();
<<<<<<< HEAD
    console.log('처음데이타ㅓ', datas);
  }, []);
=======
    roomInfoAPI(roomUrl['roomUrl']).then((res) => {
      if (res == true) {
        setRoomInfo(res.data);
        setBackgroundBE(res.data.background);
      }
    });
  }, [router.isReady]);
>>>>>>> 5ed748ba3a3662a9d2a0e14bca23b366c68a76fb

  useEffect(() => {
    window.addEventListener('popstate', preventGoBack);
    return () => {
      window.removeEventListener('popstate', preventGoBack);
    };
  }, [socketConnection]);

  const preventGoBack = () => {
    console.log('여기 url입니다.', roomUrl['roomUrl']);
    socketConnection.publish({
      destination: '/app/room',
      body: JSON.stringify({
        sender: userInfo.data.membername,
        roomId: roomUrl['roomUrl'],
        roomAction: 'EXIT',
        skipContentLengthHeader: true
      }),
      skipContentLengthHeader: true
    });
    socketConnection.deactivate();
  };

  useEffect(() => {
    console.log(datas);
  }, [datas]);
  return (
    <>
      <SideBar socketConnection={socketConnection} />
      <Memo />
      <ChatWidgetView socketConnection={socketConnection} />
      <WhiteNoise />
      <TodoList />
      <Timer />
      {/* <Dday /> */}
      <Background />
    </>
  );
};

export default StudyRoom;
