import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const constantUrl = 'noise';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  headers: {
    Authorization: `Bearer ${cookies.get('accessToken')}`
  }
});

export async function getNoise() {
  try {
    const res = await api.get(`${constantUrl}`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}
