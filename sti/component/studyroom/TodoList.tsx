// @ts-nocheck

import React from 'react';
import Draggable from 'react-draggable';
import todo from '../../styles/TodoList.module.css';
import widget from '../../styles/Widget.module.css';
import styles from '../../styles/Home.module.css';

interface Test {}

const TodoList: Test = () => {
  return (
    <>
      <Draggable>
        <div className={(widget.widget, todo.todoWidget)}>
          <div className={(widget.widgetHeader, todo.todoHeader)}>
            Todo
            <span className={widget.CloseWidgetBtn}>
              <div className={(styles.stiButton, styles.light)}>
                <button type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="2"
                    fill="none"
                    class="minus-icon light"
                  >
                    <path d="M0 0h12v2H0V0z"></path>
                  </svg>
                </button>
              </div>
            </span>
          </div>
          <div className={widget.widgetContent}>content</div>
          <div className={widget.widgetFooter}>footer</div>
        </div>
      </Draggable>
    </>
  );
};

export default TodoList;
