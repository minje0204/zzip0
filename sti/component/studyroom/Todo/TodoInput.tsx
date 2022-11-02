// @ts-nocheck

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// recoil
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { todosState, todoDateState } from '../../../lib/recoil/todo';

// mui
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import { todoPostAPI } from '../../../lib/api/todo';
import { subjectObjectEnKey } from '../../subject';

let id = 0;
const getId = () => id++;

const TodoInput = () => {
  const setTodo = useSetRecoilState(todosState);
  const todoDate = useRecoilValue(todoDateState);
  const [text, setText] = useState('');
  const [sub, setSub] = useState('');

  const [, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSub(event.target.value);
  };

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
    setTodo((todos) =>
      todos.concat({
        id: getId(),
        content: text,
        subject: sub,
        completed: false
      })
    );
    console.log({ id: getId(), content: text, subject: sub, completed: false });
    todoPostAPI('20220110', { content: text, subject: sub });
    setText('');
    setSub('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  useEffect(() => {
    console.log(todoDate);
  }, []);

  return (
    <TodoInputContainer>
      {/* <Checkbox disabled /> *}
      {/* 
      <TextField
        variant="standard"
        value={sub}
        onChange={onChangeSub}
        onKeyDown={onKeyDown}
        placeholder="과목"
        autoFocus
        sx={{ width: '55px', paddingTop: 0.5,marginRight: 1 }}
        inputProps={{ maxLength: 4, style: { fontSize: 16, fontFamily: 'CircularStd' } }}
      />*/}
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Subject</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={sub}
          label="Age"
          onChange={handleChange}
        >
          {/* 과목 선택하는 드롭다운 */}
          {Object.entries(subjectObjectEnKey).map(([k, v]) => (
            <MenuItem key={k} value={k}>
              {v}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        variant="standard"
        value={text}
        onChange={onChangeText}
        onKeyDown={onKeyDown}
        placeholder="내용을 입력하세요"
        autoFocus
        sx={{ width: '200px', paddingTop: 1.2 }}
        inputProps={{
          maxLength: 11,
          style: { fontSize: 16, fontFamily: 'CircularStd' }
        }}
      />
      <IconButton
        aria-label="add"
        onClick={addTodo}
        size="small"
        sx={{ marginTop: 1.3, height: 30 }}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </TodoInputContainer>
  );
};

const TodoInputContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default TodoInput;
