import { atom } from 'recoil';
import { v1 } from 'uuid';

export const socketClientState = atom({
  key: `socketClientState/${v1()}`,
  default: []
});

