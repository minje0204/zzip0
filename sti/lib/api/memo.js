import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const constantUrl = 'memo';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  headers: {
    Authorization: `Bearer ${cookies.get('accessToken')}`
  }
});

export async function getMemo() {
  try {
    const res = await api.get(`${constantUrl}`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function putMemo() {
  try {
    const res = await api.put(`${constantUrl}`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}
