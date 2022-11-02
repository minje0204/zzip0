// @ts-nocheck

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// recoil
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { todosState, todoDateState } from '../../../lib/recoil/todo';

// mui
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

import {todoPostAPI} from '../../../lib/api/todo'

let id = 0;
const getId = () => id++;

const TodoInput = () => {
  const setTodo = useSetRecoilState(todosState);
  const todoDate = useRecoilValue(todoDateState);
  const [text, setText] = useState('');
  const [sub, setSub] = useState('');


  const onChangeText = (e) => {
    setText(e.target.value);
  };
  const onChangeSub = (e) => {
    setSub(e.target.value);
  };

  const addTodo = () => {
    if (!text) {
      alert('할 일을 입력해주세요 !');
      return;
    }
    if (!sub) {
      alert('과목명을 입력해주세요 !');
      return;
    }
    setTodo((todos) => todos.concat({ id: getId(), content: text, subject: sub, completed:false }));
    console.log({ id: getId(), content: text, subject: sub, completed: false })
    todoPostAPI('20220110', {content: text, subject: sub})
    setText('');
    setSub('');

  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  useEffect(() => {console.log(todoDate)}, [])


  return (
    <TodoInputContainer>
      <Checkbox disabled   />
      <TextField
        variant="standard"
        value={sub}
        onChange={onChangeSub}
        onKeyDown={onKeyDown}
        placeholder="과목"
        autoFocus
        sx={{ width: '55px', paddingTop: 0.5,marginRight: 1 }}
        inputProps={{ maxLength: 4, style: { fontSize: 16, fontFamily: 'CircularStd' } }}
      />
      <TextField
        variant="standard"
        value={text}
        onChange={onChangeText}
        onKeyDown={onKeyDown}
        placeholder="내용을 입력하세요"
        autoFocus
        sx={{ width: '200px', paddingTop: 0.5 }}
        inputProps={{ maxLength: 11, style: { fontSize: 16, fontFamily: 'CircularStd' } }}
      />
    </TodoInputContainer>
  );
};

const TodoInputContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default TodoInput;
