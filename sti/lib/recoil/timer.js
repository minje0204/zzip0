import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const subjectTimes = atom({
  key: 'subjectTimes',
  default: {
    korean: 80,
    math: 100,
    english: 70,
    koreanhistory: 30,
    sub1: 30,
    sub2: 30,
    language: 30
  }
});

export const selectedSubject = atom({
  key: 'selectedSubject',
  default: 'korean'
});

export const remainTime = atom({
  //남은 초 수 저장
  key: 'remainTime',
  defualt: {
    korean: null,
    math: null,
    english: null,
    koreanhistory: null,
    sub1: null,
    sub2: null,
    language: null
  },
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
