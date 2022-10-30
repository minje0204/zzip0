import { PowerSettingsNewOutlined } from '@mui/icons-material';

const BASE_URL = 'http://localhost:8080';

const API = {
  // member
  LOGIN: `${BASE_URL}/member/signin`,
  SIGNUP: `${BASE_URL}/member/singup`,
  MYACCOUNT: `${BASE_URL}/user/me`,
  WITHDRAWAL: `${BASE_URL}/member/withdrawal`,
  UPDATEMEMBER: `${BASE_URL}/member`,

  // todo
  TODO: `${BASE_URL}/todo`,

  // background
  BACK: `${BASE_URL}/background`,
  BACKLIKE: `${BASE_URL}/background/like`,

  // room
  GETROOM: `${BASE_URL}/room/list`,
  ROOM: `${BASE_URL}/room`,
  EXITROOM: `${BASE_URL}/room/exit`,
  SEARCHROOM: `${BASE_URL}/room/search`,
  ROOMGRANT: `${BASE_URL}/room/exile`,

  // follow
  FOLLOWLIST: `${BASE_URL}/follow`,
  UNFOLLOW: `${BASE_URL}/unfollow`,
  FOLLOWING: `${BASE_URL}/following`,

  // memo
  MEMO: `${BASE_URL}/memo`,

  // timeview

  // timelog
  TIMELOG: `${BASE_URL}/timelog`
};

export default API;
