// @ts-nocheck

import React, { useState, useEffect } from 'react';

// css
import todo from '../../../styles/TodoList.module.css';
import widget from '../../../styles/Widget.module.css';
import styles from '../../../styles/Home.module.css';

// mui
import Draggable from 'react-draggable';
import TextField from '@mui/material/TextField';

// recoil
import { todosState, todoDateState } from '../../../lib/recoil/todo';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { TodoModalOpen } from '../../../lib/recoil/Modal';

// component
import TodoInput from './TodoInput';
import TodoItems from './TodoItems';
import TodoDate from './TodoDate';
import TodoProgressBar from './TodoProgressBar';

interface Test {}

const TodoList: Test = () => {
  const [todos, setTodos] = useRecoilState(todosState);
  const nodeRef = React.useRef(null);
  const [todoModal, setTodoModal] = useRecoilState(TodoModalOpen);

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
              <b>TODO</b>
            </div>
            <div className={widget.widgetCloseBtnContainer}>
              <button
                id={widget.widgetCloseBtn}
                onClick={() => {
                  setTodoModal(false);
                }}
              >
                <img src="/minus.png" width="18px"></img>
              </button>
            </div>
          </div>
          <div className={(widget.widgetContent, todo.todoWidgetContent)}>
            <TodoDate />
            {console.log(todos)}
            {todos.map((todo) => (
              <TodoItems key={todo.todoItemId} data={todo} />
            ))}
            <TodoInput />
          </div>
          <div className={widget.widgetFooter}>
            <TodoProgressBar />
          </div>
        </div>
      </Draggable>
    </>
  );
};

export default TodoList;
