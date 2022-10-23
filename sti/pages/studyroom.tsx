// @ts-nocheck

import React from 'react';
import Timer from '../component/studyroom/Timer';
import TodoList from '../component/studyroom/TodoList';

interface Test {}

const StudyRoom: Test = () => {
  return (
    <div>
      <TodoList />
      <Timer />
      StudyRoom
    </div>
  );
};

export default StudyRoom;
