// @ts-nocheck

import React from 'react';
import Draggable from 'react-draggable';
import todo from '../../styles/TodoList.module.css';
import widget from '../../styles/Widget.module.css';
import styles from '../../styles/Home.module.css';


import { useRecoilState } from 'recoil';

import { nameState } from '../states'

interface Test {}

const TodoList: Test = () => {

  const [name, setNameState] = useRecoilState(nameState);

  const updateName = e => {
    setNameState(e.target.value);
  };
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
            <h1>Profile</h1>
            <p>Hello, {name}</p>
            <input
              type="text"
              name="name"
              id="input_name"
              onChange={updateName}
              placeholder="Enter your name"
            />
          </div>
          <div className={widget.widgetFooter}>footer</div>
        </div>
      </Draggable>
    </>
  );
};

export default TodoList;
