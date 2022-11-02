import { atom } from 'recoil'

export const backgroundState = atom({
  key: "background",
  default: 'https://www.youtube.com/embed/YDodPhpFF9A'
});

export const backgroundBEState = atom({
  key: "backgroundBE",
  default: {bg_id : 0, bg_category: 'CITY', bg_title:'background_title', thumbnail_url:'', bg_url:''}
});

export const volumeState = atom({
  key: "volume",
  default: 0
});