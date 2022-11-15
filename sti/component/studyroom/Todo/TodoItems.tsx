// @ts-nocheck
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// recoil
import { useSetRecoilState, useRecoilState } from 'recoil';
import { todosState } from '../../../lib/recoil/todo';
import { UpdateTodoState } from '../../../lib/recoil/todoTimerState';
// mui
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

import { todoDeleteAPI } from '../../../lib/api/todo';
import { subjectObjectEnKey } from '../../subject';

const TodoItem = ({ data }) => {
  const [todos, setTodos] = useRecoilState(todosState);
  const [updateTodo, setUpdateTodo] = useRecoilState(UpdateTodoState);
  const [complete, setComplete] = useState(false);
  const [koSub, setKoSub] = useState('');

  const handleCheck = (e) => {
    setComplete(e.target.checked);
  };

  // todo 지우기
  const removeTodo = () => {
    todoDeleteAPI(data.todoItemId);
    setTodos((todos) =>
      todos.filter((todo) => todo.todoItemId !== data.todoItemId)
    );
    setUpdateTodo(!updateTodo);
  };

  // 과목명 한글로 바꾸기
  useEffect(() => {
    Object.entries(subjectObjectEnKey).forEach((k, v) => {
      if (k[0] === data.subject) {
        setKoSub(k[1]);
      }
    });
    console.log(todos);
  }, [todos]);

  return (
    <div>
      <TodoItemsContainer>
        <div>
          <Checkbox onChange={(e) => handleCheck(e)} />
        </div>
        <TodoDataContainer>
          <div id="todoSubjectContainer">{koSub}</div>
          <div id="todoContentContainer">{data.content}</div>
        </TodoDataContainer>

        <div>
          <IconButton
            aria-label="delete"
            onClick={removeTodo}
            size="small"
            sx={{ marginTop: 0.7 }}
          >
            <DeleteForeverIcon fontSize="small" />
          </IconButton>
        </div>
      </TodoItemsContainer>
    </div>
  );
};

const TodoItemsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 360px;
`;

const TodoDataContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  font-size: 16px;

  #todoSubjectContainer {
    width: 30%;
  }
  #todoContentContainer {
    width: 70%;
    text-overflow: ellipsis;
  }
`;

export default TodoItem;
