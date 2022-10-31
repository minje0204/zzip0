// @ts-nocheck

import React, { useState } from 'react';

// css
import todo from '../../../styles/TodoList.module.css';
import widget from '../../../styles/Widget.module.css';
import styles from '../../../styles/Home.module.css';

// mui
import Draggable from 'react-draggable';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

// recoil
import { todosState } from '../../../recoil/todo';
import { atom, useSetRecoilState, useRecoilValue } from 'recoil';

// component
import TodoInput from './TodoInput';
import TodoItems from './TodoItems';

interface Test {}

const TodoList: Test = () => {
  const todos = useRecoilValue(todosState);
  const nodeRef = React.useRef(null);
  return (
    <>
      <Draggable nodeRef={nodeRef} defaultPosition={{ x: 300, y: 300 }}>
        <div ref={nodeRef} className={(widget.widget, todo.todoWidget)}>
          <div className={widget.widgetHeader}>
            <div className={widget.widgetTitle}>
              <img
                src={`/todo.png`}
                style={{ width: '20px', height: '20px', marginRight: '5px' }}
              ></img>
              <b> TODO</b>
            </div>
            <div className={widget.widgetCloseBtnContainer}>
              <button id={widget.widgetCloseBtn}>
                <img src="/minus.png" width="18px"></img>
              </button>
            </div>
          </div>
          <div className={(widget.widgetContent, todo.todoWidgetContent)}>
            {todos.map((todo) => (
              <TodoItems key={todo.id} data={todo} />
            ))}
            <TodoInput />
          </div>
          <div className={widget.widgetFooter}>
            <Box sx={{ width: '80%' }}>
              <LinearProgress
                variant="determinate"
                value={50}
                sx={{ height: 10, margin: 0.5 }}
              />
            </Box>
          </div>
        </div>
      </Draggable>
    </>
  );
};

export default TodoList;
