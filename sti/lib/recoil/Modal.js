import { atom } from 'recoil';

export const TodoModalOpen = atom({
  key: 'TodoModalOpen',
  default: false
});

export const TimerModalOpen = atom({
  key: 'TimerModalOpen',
  default: false
});

export const LoginModalOpen = atom({
  key: 'LoginModalOpen',
  default: false
});
