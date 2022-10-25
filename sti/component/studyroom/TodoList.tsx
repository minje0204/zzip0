// @ts-nocheck

import React, { useState } from 'react';
import Draggable from 'react-draggable';
import todo from '../../styles/TodoList.module.css';
import widget from '../../styles/Widget.module.css';
import styles from '../../styles/Home.module.css';

import TodoInput from './TodoInput'
import TodoItems from './TodoItems'

import { atom, useSetRecoilState, useRecoilValue } from 'recoil'

export const todosState = atom({
  key: 'todos',
  default: [],
})

interface Test {}


const TodoList: Test = () => {

  const todos = useRecoilValue(todosState)
  return (
    <>
      <Draggable>
        <div className={(widget.widget, todo.todoWidget)}>
          <div className={widget.widgetHeader}>
            <div className={widget.widgetTitle}>Todo</div>
            <div className={widget.widgetCloseBtnContainer}>
              <button id={widget.widgetCloseBtn}>
                <img src="minus.png" width="18px"></img>
              </button>
            </div>
          </div>
          <div className={widget.widgetContent}>content
            {todos.map(todo => (
              <TodoItems key={todo.id} data={todo} />
            ))}
            <TodoInput/>
          </div>
          <div className={widget.widgetFooter}>footer</div>
        </div>
      </Draggable>
    </>
  );
};

export default TodoList;
