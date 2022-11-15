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

export async function getFollowee(data) {
  console.log('dataaaaa', data);
  try {
    const res = await api.get(`${constantUrl}/followee?PID=${data}`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function getFollower(data) {
  try {
    const res = await api.get(`${constantUrl}/follower?PID=${data}`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function postFollow(data) {
  try {
    const res = await api.post(`${constantUrl}/following/${data}`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function deleteFollow(data) {
  try {
    const res = await api.delete(`${constantUrl}/unfollow/${data}`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}
