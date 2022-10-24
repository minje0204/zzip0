// @ts-nocheck

import React from 'react';
import Background from '../component/studyroom/Background';
import Timer from '../component/studyroom/Timer';
import TodoList from '../component/studyroom/TodoList';
import styled from 'styled-components';

interface Test {}

const StudyRoom: Test = () => {
  return (
    <div>
      StudyRoom
      <TodoList />
      <Timer />
      <Background />
    </div>
  );
};

export default StudyRoom;
