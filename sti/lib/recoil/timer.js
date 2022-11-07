import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { v1 } from 'uuid';

const { persistAtom } = recoilPersist();

export const selectedSubject = atom({
  key: `selectedSubject/${v1()}`,
  default: 'korean'
});

export const remainTimes = atom({
  //남은 초 수 저장
  key: `remainTime/${v1()}`,
  defualt: {
    KOREAN: null,
    MATH: null,
    ENGLISH: null,
    KOREANHISTORY: null,
    SUB1: null,
    SUB2: null,
    LANGUAGE: null
  },
  effects_UNSTABLE: [persistAtom]
});

export const choosedSubjects = atom({
  key: `choosedSubjects`,
  default: [],
  effects_UNSTABLE: [persistAtom]
});

// export const koreanRemainTime = atom({
//   key: 'koreanRemainTime',
//   default: [0, 0, 0],
//   effects_UNSTABLE: [persistAtom]
// });

// export const mathRemainTime = atom({
//   key: 'mathRemainTime',
//   default: [0, 0, 0],
//   effects_UNSTABLE: [persistAtom]
// });

// export const englishRemainTime = atom({
//   key: 'englishRemainTime',
//   default: [0, 0, 0],
//   effects_UNSTABLE: [persistAtom]
// });

// export const koreanhistoryRemainTime = atom({
//   key: 'historyRemainTime',
//   default: [0, 0, 0],
//   effects_UNSTABLE: [persistAtom]
// });

// export const sub1RemainTime = atom({
//   key: 'etc1RemainTime',
//   default: [0, 0, 0],
//   effects_UNSTABLE: [persistAtom]
// });

// export const sub2RemainTime = atom({
//   key: 'etc2RemainTime',
//   default: [0, 0, 0],
//   effects_UNSTABLE: [persistAtom]
// });

// export const languageRemainTime = atom({
//   key: 'foreignRemainTime',
//   default: [0, 0, 0],
//   effects_UNSTABLE: [persistAtom]
// });
