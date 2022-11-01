import { atom } from 'recoil'

export const todosState = atom({
  key: 'todos',
  default: [],
})

export const todoDateState = atom({
  key: 'todoDate',
  default: [],
})