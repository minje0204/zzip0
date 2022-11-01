import { atom } from 'recoil'

export const todosState = atom({
  key: 'todosSate',
  default: [],
})

export const todoDateState = atom({
  key: 'todoDateState',
  default: [],
})