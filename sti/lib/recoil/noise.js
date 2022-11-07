import { atom } from 'recoil';
import { v1 } from 'uuid';

export const noiseBEState = atom({
  key: `noiseBEState/${v1()}`,
  default: []
});
