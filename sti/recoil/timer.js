import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// const { persistAtom } = recoilPersist();

export const subjectTimes = atom({
  key: 'subjectTimes',
  default: [0, 80, 100, 70, 30, 30, 30, 30]
});
