import { atom } from 'recoil';
import { v1 } from 'uuid';

export const todoTimerState = atom({
  key: `todoTimerState/${v1()}`,
  default: []
});

export const UpdateTodoState = atom({
  key: `UpdateTodoState/${v1()}`,
  default: false
});
