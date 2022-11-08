import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
// import { v1 } from 'uuid';

const { persistAtom } = recoilPersist();

export const choosedSubjects = atom({
  key: `choosedSubjects`,
  default: [],
  effects_UNSTABLE: [persistAtom]
});

export const savedState = atom({
  key: `savedState`,
  default: [],
  effects_UNSTABLE: [persistAtom]
});
