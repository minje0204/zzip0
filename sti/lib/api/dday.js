import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const constantUrl = 'dday';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  headers: {
    Authorization: `Bearer ${cookies.get('accessToken')}`
  }
});

export async function postDday(data) {
  try {
    const res = await api.post(`${constantUrl}`, data);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function getDday() {
  try {
    const res = await api.get(`${constantUrl}`);
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function delDday(data) {
  try {
    const res = await api.delete(`${constantUrl}`, { data: data });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function putDday() {
  try {
    const res = await api.put(`${constantUrl}`, data);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}
