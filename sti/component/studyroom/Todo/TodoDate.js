import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';

import { todoGetAPI } from '../../../lib/api/todo';
import { todosState, todoDateState } from '../../../lib/recoil/todo';
import {
  useSetRecoilState,
  useRecoilState
} from 'recoil';

const TodoDate = () => {
  const setTodoDate = useSetRecoilState(todoDateState);
  const [todos, setTodos] = useRecoilState(todosState);
  const [date, setDate] = useState('');

  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const dateStr = year + '-' + month + '-' + day;

  const changeDate = (e) => {

    setTodoDate(e.target.value.replace(/-/g, ''));
    todoGetAPI(e.target.value.replace(/-/g, '')).then((res) => {
      console.log(res)
      if (res.status == 200) {
        alert(res.response.data);
      } else {
        setTodos((todos) => [res.data]);
      }
    });
  };

  return (
    <div>
      <TextField
        id="date"
        type="date"
        defaultValue={dateStr}
        onChange={(e) => changeDate(e)}
        sx={{ width: 300 }}
        InputLabelProps={{
          shrink: true
        }}
      />
    </div>
  );
};

export default TodoDate;