import { atom } from 'recoil';
import { v1 } from 'uuid';

export const todoTimerState = atom({
  key: `todoTimers/${v1()}`,
  default: [{ id: 0, subject: '과학', content: '노잼', time: '00' }]
});
