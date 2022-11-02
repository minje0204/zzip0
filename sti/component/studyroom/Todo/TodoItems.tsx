// @ts-nocheck

import React, { useState } from 'react';
import styled from 'styled-components';

// recoil
import { useSetRecoilState, useRecoilState } from 'recoil';
import { todosState } from '../../../lib/recoil/todo';

// mui
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

import { todoDeleteAPI } from '../../../lib/recoil/todo'

const TodoItem = ({ data }) => {
  const [todos, setTodos] = useRecoilState(todosState);
  // const setTodoItems = useSetRecoilState(todoTimerState);
  const [complete, setComplete] = useState(false);

  const handleCheck = (e) => {
    setComplete(e.target.checked);
  };

  const removeTodo = () => {
    setTodos((todos) => todos.filter((todo) => todo.todoItemId !== data.todoItemId));
    todoDeleteAPI(todos.todoItemId)
  };


  return (
    <div>
      <TodoItemsContainer>
        <div>
          <Checkbox onChange={(e) => handleCheck(e)} />
        </div>
          <TodoDataContainer>
            <div id="todoSubjectContainer">
              {data.subject}
            </div>
            <div id="todoContentContainer">
              {data.content}
            </div>
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

  #todoSubjectContainer{
    width: 50%;
  }
  #todoContentContainer{
    width:50%;
    text-overflow: ellipsis;
  }

`;

export default TodoItem;
