// @ts-nocheck

import React, { useState, useEffect } from 'react';

// css
import todo from '../../../styles/TodoList.module.css';
import widget from '../../../styles/Widget.module.css';
import styles from '../../../styles/Home.module.css';

// mui
import Draggable from 'react-draggable';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';

// recoil
import { todosState } from '../../../lib/recoil/todo';
import { atom, useSetRecoilState, useRecoilValue } from 'recoil';

// component
import TodoInput from './TodoInput';
import TodoItems from './TodoItems';

interface Test {}

const TodoList: Test = () => {
  const todos = useRecoilValue(todosState);
  const [date, setDate] = useState('');
  const nodeRef = React.useRef(null);

  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const dateStr = year + '-' + month + '-' + day;

  useEffect(() =>{
    console.log(dateStr)
  }, [])


  const changeDate = (e) => {
    console.log(e.target.value);
    setDate(e.target.value);
  };

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

          {/* widget content */}
          <div className={(widget.widgetContent, todo.todoWidgetContent)}>
            <div>
              <TextField
                id="date"
                type="date"
                defaultValue={dateStr}
                sx={{ width: 220 }}
                onChange={(e) => changeDate(e)}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
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
