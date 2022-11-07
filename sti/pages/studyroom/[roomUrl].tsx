// @ts-nocheck

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import makeSocketConnection from '../../component/socket/SocketClient';
//recoil
import { userState } from '../../lib/recoil/member';
import { useRecoilState } from 'recoil';
import { getUser } from '../../lib/api/member';
import { myroomState } from '../../lib/recoil/room';
import { socketClientState } from '../../lib/recoil/socketState';
//component
import Background from '../../component/studyroom/Background/Background';
import Timer from '../../component/studyroom/Timer/Timer';
import TodoList from '../../component/studyroom/Todo/TodoList';
import Dday from '../../component/studyroom/Dday/Dday';
import SideBar from '../../component/studyroom/SideBar/SideBar';
import WhiteNoise from '../../component/studyroom/WhiteNoise/WhiteNoise';
import Memo from '../../component/studyroom/Memo/Memo';

interface Test {}

const StudyRoom: Test = () => {
  const router = useRouter();
  const roomUrl = router.query;
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [roomInfo, setRoomInfo] = useRecoilState(myroomState);
  const [socketConnection, setSocketConnection] = useRecoilState(socketClientState);
  const [socketClient, setSocketClient] = useState({});

  const getUserInfo = () => {
    getUser().then((res) => {
      setUserInfo(res);
    });
  };

  useEffect(() => {
    if (userInfo.data) {
      setSocketClient(makeSocketConnection(roomUrl['roomUrl'], userInfo))
      
    }
  }, [userInfo]);

  useEffect(() => {
    // socketClient.activate();
    console.log('log client', socketClient)
    setSocketConnection(socketClient)
  }, [socketClient])

  useEffect(() => {
    console.log('save socket', socketConnection)
  }, [socketConnection])

  useEffect(() => {
    getUserInfo();
    console.log('roominfo here', roomInfo.id)
  }, []);
  return (
    <>
      <SideBar />
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
