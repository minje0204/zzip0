// @ts-nocheck

import React from 'react';
import styled from 'styled-components';

// recoil
import { useSetRecoilState } from 'recoil';
import { todosState } from '../../recoil/todo';
import { todosubState } from '../../recoil/todosubState';

// mui
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

const TodoItem = ({ data }) => {
  const setTodos = useSetRecoilState(todosState);
  const setSub = useSetRecoilState(todosubState);

  const toggleTodo = () => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === data.id ? { ...data, completed: !data.completed } : todo
      )
    );
  };

  const removeTodo = () => {
    setTodos((todos) => todos.filter((todo) => todo.id !== data.id));
  };

  return (
    <div completed={data.completed}>
      <TodoItemsContainer>
        <div>
          <Checkbox onClick={toggleTodo} />
          {data.subject} / {data.content}
          
        </div>
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
`;

export default TodoItem;
