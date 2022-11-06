import { atom } from 'recoil';
import { v1 } from 'uuid';

export const memoBEState = atom({
  key: `memoBEState/${v1()}`,
  default: {}
});
