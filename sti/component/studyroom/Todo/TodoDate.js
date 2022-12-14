import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';

import { todoGetAPI } from '../../../lib/api/todo';
import { todosState, todoDateState } from '../../../lib/recoil/todo';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { UpdateTodoState } from '../../../lib/recoil/todoTimerState';
const TodoDate = () => {
  const setTodoDate = useSetRecoilState(todoDateState);
  const [todos, setTodos] = useRecoilState(todosState);
  const [updateTodo, setUpdateTodo] = useRecoilState(UpdateTodoState);
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const dateStr = year + '-' + month + '-' + day;

  const styles = (theme) => ({
    notchedOutline: {
      borderWidth: '1px',
      borderColor: 'yellow !important'
    }
  });

  const changeDate = (clickedDate) => {
    setTodoDate(clickedDate.replace(/-/g, ''));
    todoGetAPI(clickedDate.replace(/-/g, '')).then((res) => {
      if (res.data !== '') {
        setTodos(res.data);
      } else {
        setTodos([]);
      }
    });
  };

  useEffect(() => {
    setTodoDate(dateStr.replace(/-/g, ''));
    changeDate(dateStr);
  }, [updateTodo]);

  return (
    <div>
      <TextField
        id="date"
        type="date"
        defaultValue={dateStr}
        onChange={(e) => changeDate(e.target.value)}
        sx={{
          width: 170,
          marginLeft: '20px',
          '& .MuiOutlinedInput-root': {
            '& > fieldset': { borderColor: 'transparent' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'lightgray'
            }
          },
          '& .MuiOutlinedInput-root:hover': {
            '& > fieldset': {
              borderColor: 'lightgray'
            }
          }
        }}
        InputLabelProps={{
          shrink: true
        }}
        inputProps={{
          style: {
            fontSize: '15px',
            textAlign: 'center',
            padding: 5
          }
        }}
      />
    </div>
  );
};

export default TodoDate;
