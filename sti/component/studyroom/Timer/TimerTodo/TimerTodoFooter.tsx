// @ts-nocheck
import React, { useState, useEffect } from 'react';
// mui
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import RadioGroup from '@mui/joy/RadioGroup';
// recoil
import { useRecoilState } from 'recoil';
import { todoTimerState } from '../../../../lib/recoil/todoTimerState';
import { todoGetAPI } from '../../../../lib/api/todo';
import { todosState } from '../../../../lib/recoil/todo';
// component
interface Test {}

const TimerTodoFooter: Test = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const dateStr = year + '-' + month + '-' + day;

  const [todoList, setTodoList] = useRecoilState(todoTimerState);

  const getTodayTodos = () => {
    todoGetAPI(dateStr.replace(/-/g, '')).then((res) => {
      console.log(res);
      if (res.data !== '') {
        setTodoList(res.data);
      } else {
        setTodoList([]);
      }
    });
  };

  useEffect(() => {
    getTodayTodos();
  }, []);

  return (

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {todoList.map((todo) => (
          <div>{todo.subject} : {todo.content} : 시간</div>
        ))}
      </List> 

  );
};

export default TimerTodoFooter;
