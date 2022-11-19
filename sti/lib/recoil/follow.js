import { atom } from 'recoil';
import { v1 } from 'uuid';

export const profileFollowerState = atom({
  key: `profileFollowerState/${v1()}`,
  default: []
});

export const profileFolloweeState = atom({
  key: `profileFolloweeState/${v1()}`,
  default: []
});

export const profileNameState = atom({
  key: `profileNameState/${v1()}`,
  default: ''
});
