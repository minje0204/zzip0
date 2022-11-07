import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const constantUrl = 'follow';
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  headers: {
    Authorization: `Bearer ${cookies.get('accessToken')}`
  }
});

export async function getFollow() {
  try {
    const res = await api.get(`${constantUrl}/me`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function postFollow() {
  try {
    const res = await api.post(`${constantUrl}/following`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function deleteFollow() {
  try {
    const res = await api.delete(`${constantUrl}/unfollow`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}