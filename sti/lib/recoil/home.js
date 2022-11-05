import { atom } from 'recoil';
import { v1 } from 'uuid';

export const searchCateState = atom({
  key: `searchCate/${v1()}`,
  default: 'christmas'
});
