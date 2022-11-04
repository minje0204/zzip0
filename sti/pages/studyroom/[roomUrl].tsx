// @ts-nocheck

import React, { useEffect } from 'react';
import Background from '../../component/studyroom/Background/Background';
import Timer from '../../component/studyroom/Timer/Timer';
import TodoList from '../../component/studyroom/Todo/TodoList';
import Dday from '../../component/studyroom/Dday/Dday';
import SideBar from '../../component/studyroom/SideBar/SideBar';
import { useRouter } from 'next/router';
import makeSocketConnection from '../../component/socket/SocketClient';
import { userState } from '../../lib/recoil/member';
import { useRecoilState } from 'recoil';
import { getUser } from '../../lib/api/member';

interface Test {}

const StudyRoom: Test = () => {
  const router = useRouter();
  const roomUrl = router.query;
  const [userInfo, setUserInfo] = useRecoilState(userState);

  const getUserInfo = () => {
    getUser().then((res) => {
      setUserInfo(res);
    });
  };

  useEffect(() => {
    getUserInfo();
    const socketClient = makeSocketConnection(roomUrl['roomUrl']);
    socketClient.activate();
  }, []);

  useEffect(() => {
    if (userInfo.data) {
      console.log('user 받아오기', userInfo);
      console.log('username', userInfo.data.membername);
    }
  }, [userInfo]);
  return (
    <>
      <SideBar />
      <TodoList />
      <Timer />
      <Dday />
      <Background />
    </>
  );
};

export default StudyRoom;
