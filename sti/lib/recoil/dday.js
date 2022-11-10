import { atom } from 'recoil';
import { v1 } from 'uuid';

export const DdayUpdate = atom({
  key: `DdayState/${v1()}`,
  default: false
});
