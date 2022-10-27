import { atom } from 'recoil'

export const backgroundState = atom({
  key: "background",
  default: 'https://www.youtube.com/embed/YDodPhpFF9A'
});