import { atom } from 'recoil';
import { v1 } from 'uuid';

export const roomsState = atom({
  key: `roomsState/${v1()}`,
  default: []
});

export const myroomState = atom({
  key: `myroomState/${v1()}`,
  default: []
});

export const myRoomPeopleState = atom({
  key: `myRoomPeopleState/${v1()}`,
  default: []
});
