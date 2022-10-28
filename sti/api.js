const BASE_URL = 'http://localhost:8080';

const API = {
  GETROOM: `${BASE_URL}/room/list`,
  CREATEROOM: `${BASE_URL}/room`,
  EXITROOM: `${BASE_URL}/room/exit`,
}

export default API;