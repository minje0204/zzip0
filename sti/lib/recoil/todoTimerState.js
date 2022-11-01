import { atom } from 'recoil'

export const todoTimerState = atom({
  key: 'todoTimers',
  default: [{id: 0, subject:'과학', content:'노잼', time:'00'}]
});