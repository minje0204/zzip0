// @ts-nocheck

import React from 'react';
import Background from '../../component/studyroom/Background';
import Timer from '../../component/studyroom/Timer';
import TodoList from '../../component/studyroom/TodoList';
import SideBar from '../../component/studyroom/SideBar';
import styled from 'styled-components';

interface Test {}

const StudyRoom: Test = () => {
  return (
    <div>
      <SideBar />
      <TodoList />
      <Timer />
      <Background />
    </div>
  );
};

const SidBarContainer = styled.div`

`;

export default StudyRoom;
