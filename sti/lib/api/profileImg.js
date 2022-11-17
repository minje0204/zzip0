import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const constantUrl = 'user';
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${cookies.get('accessToken')}`
  }
});

export async function patchProfileImg(data) {
  try {
    const res = await api.patch(`${constantUrl}/upload`, data);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}
