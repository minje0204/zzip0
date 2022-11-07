import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { v1 } from 'uuid';

const { persistAtom } = recoilPersist();

export const subjectTimes = atom({
  key: `subjectTimes/${v1()}`,
  default: {
    korean: 80,
    math: 100,
    english: 70,
    koreanhistory: 30,
    sub1: 30,
    sub2: 30,
    language: 30
  },
  effects_UNSTABLE: [persistAtom]
});

export const selectedSubject = atom({
  key: `selectedSubject/${v1()}`,
  default: 'korean'
});

export const choosedSubjects = atom({
  key: `choosedSubjects/${v1()}`,
  default: [],
  effects_UNSTABLE: [persistAtom]
});

export const savedState = atom({
  key: `savedState/${v1()}`,
  default: 0,
  effects_UNSTABLE: [persistAtom]
});
