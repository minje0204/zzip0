import { atom } from 'recoil';
import { v1 } from 'uuid';

export const roomsState = atom({
  key: `roomsState/${v1()}`,
  default: []
});
