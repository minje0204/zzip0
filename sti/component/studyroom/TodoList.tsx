// @ts-nocheck

import React from 'react';
import Draggable from 'react-draggable';

interface Test {}

const TodoList: Test = () => {
  return (
    <>
      <Draggable>
        <div>Todo</div>
      </Draggable>
    </>
  );
};

export default TodoList;
