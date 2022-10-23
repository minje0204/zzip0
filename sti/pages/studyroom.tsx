// @ts-nocheck

import React from 'react';
import Background from '../component/studyroom/Background';
import Timer from '../component/studyroom/Timer';
import TodoList from '../component/studyroom/TodoList';

interface Test {}

const StudyRoom: Test = () => {
  return (
    <div>
      <Background />
      <TodoList />
      <Timer />
      StudyRoom
    </div>
  );
};

export default StudyRoom;
