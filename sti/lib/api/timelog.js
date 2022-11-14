import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const constantUrl = 'timelog';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  headers: {
    Authorization: `Bearer ${cookies.get('accessToken')}`
  }
});

export async function studyStart(data) {
  try {
    const res = await api.post(`${constantUrl}`, data);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function studyEnd(data) {
  try {
    const res = await api.put(`${constantUrl}`, data);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}
