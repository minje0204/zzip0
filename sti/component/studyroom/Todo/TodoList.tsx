// @ts-nocheck
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// css
import todo from '../../../styles/TodoList.module.css';
import widget from '../../../styles/Widget.module.css';
import styles from '../../../styles/Home.module.css';
// mui
import Draggable from 'react-draggable';
import TextField from '@mui/material/TextField';
// recoil
import { todosState } from '../../../lib/recoil/todo';
import { useRecoilState } from 'recoil';
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
  const [todoOpen, setTodoOpen] = useRecoilState(TodoModalOpen);

  return (
    <>
      {todoOpen ? (
        <Draggable nodeRef={nodeRef} defaultPosition={{ x: 350, y: 200 }}>
          <div ref={nodeRef} className={(widget.widget, todo.todoWidget)}>
            <div className={widget.widgetHeader}>
              <div className={widget.widgetTitle}>
                <TodoHeaderContainer>
                  <div id="todoHeaderImg">
                    <img
                      src={`/todo.png`}
                      style={{
                        width: '20px',
                        height: '20px',
                        marginRight: '5px'
                      }}
                    ></img>
                  </div>
                  <div id="todoHeaderContent">
                    <b>TODO</b>
                    <TodoDate />
                  </div>
                </TodoHeaderContainer>
              </div>
              <div className={widget.widgetCloseBtnContainer}>
                <button
                  id={widget.widgetCloseBtn}
                  onClick={() => {
                    setTodoOpen(false);
                  }}
                >
                  <img src="/minus.png" width="18px"></img>
                </button>
              </div>
            </div>
            <div className={(widget.widgetContent, todo.todoWidgetContent)}>
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
      ) : null}
    </>
  );
};

const TodoHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  #todoHeaderImg {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
  }
  #todoHeaderContent {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    padding-top: 6px;
  }
`;
export default TodoList;
