import { atom } from 'recoil';
import { v1 } from 'uuid';

export const chatDataState = atom({
  key: `chatDataState/${v1()}`,
  default: []
});
