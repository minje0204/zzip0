// @ts-nocheck

import React, { useState } from 'react';

// css
import todo from '../../styles/TodoList.module.css';
import widget from '../../styles/Widget.module.css';
import styles from '../../styles/Home.module.css';

// mui
import Draggable from 'react-draggable';

// recoil
import { todosState } from '../../recoil/todo';
import { atom, useSetRecoilState, useRecoilValue } from 'recoil';

// component
import TodoInput from './TodoInput';
import TodoItems from './TodoItems';


interface Test {}

const TodoList: Test = () => {
  const todos = useRecoilValue(todosState);

  return (
    <>
      <Draggable defaultPosition={{ x: 300, y: 300 }}>
        <div className={(widget.widget, todo.todoWidget)}>
          <div className={widget.widgetHeader}>
            <div className={widget.widgetTitle}>Todo</div>
            <div className={widget.widgetCloseBtnContainer}>
              <button id={widget.widgetCloseBtn}>
                <img src="minus.png" width="18px"></img>
              </button>
            </div>
          </div>
          <div className={widget.widgetContent}>
            {todos.map((todo) => (
              <TodoItems key={todo.id} data={todo} />
            ))}
            <TodoInput />
          </div>
        </div>
      </Draggable>
    </>
  );
};

export default TodoList;
