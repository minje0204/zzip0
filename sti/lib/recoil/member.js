import { atom } from 'recoil';
import { v1 } from 'uuid';

export const userState = atom({
  key: `userState/${v1()}`,
  default: {}
});
