import React from 'react'
import styled, { css } from 'styled-components'
import { useSetRecoilState } from 'recoil'
import { todosState } from '../../recoil/todo'

import Checkbox from '@mui/material/Checkbox';

const TodoItem = ({ data }) => {
  const setTodos = useSetRecoilState(todosState)

  const toggleTodo = () => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === data.id ? { ...data, completed: !data.completed } : todo
      )
    )
  }

  const removeTodo = () => {
    setTodos(todos => todos.filter(todo => todo.id !== data.id))
  }

  return (
    <div completed={data.completed}>
      <Checkbox onClick={toggleTodo} />
      {data.text}
      <button onClick={removeTodo}>X</button>
    </div>
  )
}

export default TodoItem