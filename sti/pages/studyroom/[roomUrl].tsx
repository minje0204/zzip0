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

  useEffect(() => {
    if (userInfo.data && !socketConnection) {
      const connectionConst = socketClient();
      makeSocketConnection(connectionConst, roomUrl['roomUrl'], userInfo);
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
