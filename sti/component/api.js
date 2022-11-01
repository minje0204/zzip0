const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const API = {
  GETROOM: `${PUBLIC_API_KEY}/room/list`,
  CREATEROOM: `${PUBLIC_API_KEY}/room`,
  EXITROOM: `${PUBLIC_API_KEY}/room/exit`
};

export default API;
