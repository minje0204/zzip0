import { atom } from 'recoil';
import { v1 } from 'uuid';

export const backgroundState = atom({
  key: `backgroundChangeState/${v1()}`,
  default: 'https://www.youtube.com/embed/YDodPhpFF9A'
});

export const backgroundBEState = atom({
  key: `backgroundBEApi/${v1()}`,
  default: {
    bgId: 0,
    bgCategory: 'CITY',
    bgTitle: 'background_title',
    thumbnailUrl: '',
    bgUrl: ''
  }
});

export const volumeState = atom({
  key: `volume/${v1()}`,
  default: 0
});
