// @ts-nocheck

import React from 'react';
import Background from '../../component/studyroom/Background';
import Timer from '../../component/studyroom/Timer';
import TodoList from '../../component/studyroom/TodoList';
import SideBar from '../../component/studyroom/SideBar';

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
