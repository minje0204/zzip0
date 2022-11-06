import { atom } from 'recoil';
import { v1 } from 'uuid';

export const noiseState = atom({
  key: `noiseState/${v1()}`,
  default: []
});
