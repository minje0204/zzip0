import { atom } from 'recoil';
import { v1 } from 'uuid';

export const TodoModalOpen = atom({
  key: `TodoModalIsOpen/${v1()}`,
  default: false
});

export const TimerModalOpen = atom({
  key: `TimerModalIsOpen/${v1()}`,
  default: false
});

export const LoginModalOpen = atom({
  key: `LoginModalIsOpen/${v1()}`,
  default: false
});

export const DdayModalOpen = atom({
  key: `DdayModalOpen/${v1()}`,
  default: false
});
