import React, { useState } from 'react'
import styled from 'styled-components'
import { useSetRecoilState } from 'recoil'
import { todosState } from '../../recoil/todo'

let id = 0
const getId = () => id++

const TodoInput = () => {
  const setTodo = useSetRecoilState(todosState)
  const [text, setText] = useState('')

  const onChange = e => {
    setText(e.target.value)
  }

  const addTodo = () => {
    if (!text) {
      alert('정확한 값을 입력해주세요!')
      return
    }

    setTodo(todos => todos.concat({ id: getId(), text, completed: false }))
    setText('')
  }

  const onKeyDown = e => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <input
      value={text}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="할일을 입력해주세요."
      autoFocus
    />
  )
}

export default TodoInput