import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const constantUrl = 'user';
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  headers: {
    // 'Content-Type': 'application/json',
    Authorization: `Bearer ${cookies.get('accessToken')}`
  }
});

export async function getUser() {
  try {
    const res = await api.get(`${constantUrl}/me`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}
