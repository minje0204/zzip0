import { atom } from 'recoil';
import { v1 } from 'uuid';

export const chatState = atom({
  key: `chatState/${v1()}`,
  default: []
});
