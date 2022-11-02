// @ts-nocheck

import React, { useEffect } from 'react';
import Background from '../../component/studyroom/Background/Background';
import Timer from '../../component/studyroom/Timer/Timer';
import TodoList from '../../component/studyroom/Todo/TodoList';
import SideBar from '../../component/studyroom/SideBar/SideBar';
import { useRouter } from 'next/router';
import makeSocketConnection from '../../component/socket/SocketClient';

interface Test {}

const StudyRoom: Test = () => {
  const router = useRouter();
  const roomUrl = router.query;
  // useEffect(() => {
  //   console.log(roomUrl['roomUrl']);
  //   console.log('ddddd');
  //   const socketClient = makeSocketConnection(roomUrl['roomUrl']);
  //   socketClient.activate();
  // }, []);

  return (
    <>
      <SideBar />
      <TodoList />
      <Timer />
      <Background />
    </>
  );
};

export default StudyRoom;
