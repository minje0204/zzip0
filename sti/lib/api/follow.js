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
    const res = await api.get(`${constantUrl}`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function postFollow(data) {
  try {
    const res = await api.post(`${constantUrl}/following`, data);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function deleteFollow(data) {
  try {
    const res = await api.delete(`${constantUrl}/unfollow`, {data: data});
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}