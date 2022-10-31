// @ts-nocheck

import React from 'react';
import Background from '../../component/studyroom/Background/Background';
import Timer from '../../component/studyroom/Timer/Timer';
import TodoList from '../../component/studyroom/Todo/TodoList';
import SideBar from '../../component/studyroom/SideBar/SideBar';

interface Test {}

const StudyRoom: Test = () => {
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
