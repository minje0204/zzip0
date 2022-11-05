import { atom } from 'recoil';
import { v1 } from 'uuid';

export const todosState = atom({
  key: `todosState/${v1()}`,
  default: []
});

export const todoDateState = atom({
  key: `todoDateState/${v1()}`,
  default: []
});
