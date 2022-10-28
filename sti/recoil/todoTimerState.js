import { atom } from 'recoil'

export const todoTimerState = atom({
  key: 'todoTimers',
  default: [{id: 0, subject:'', content:'', time:''}]
});