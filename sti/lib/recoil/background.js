import { atom } from 'recoil'

export const backgroundState = atom({
  key: "background",
  default: 'https://www.youtube.com/embed/YDodPhpFF9A'
});

export const backgroundBEState = atom({
  key: "backgroundBE",
  default: {bgId : 0, bgCategory: 'CITY', bgTitle:'background_title', thumbnailUrl:'', bgUrl:''}
});

export const volumeState = atom({
  key: "volume",
  default: 0
});