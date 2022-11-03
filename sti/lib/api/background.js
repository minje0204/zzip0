import axios from 'axios';
import { Cookies } from "react-cookie"

const cookies = new Cookies()
const constantUrl = 'background'
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  headers:{
    // 'Content-Type': 'application/json',
    'Authorization': `Bearer ${cookies.get('accessToken')}`
  }
});

export async function getBackground(data) {
  try {
    const res = await api.get(`${constantUrl}/${data}`);
    return res;
  } catch (err) {
    console.log(err);
    return err
  }
}

export async function searchBackground(data) {
  try {
    const res = await api.get(`${constantUrl}/search?q=${data}`);
    return res;
  } catch (err) {
    console.log(err);
    return err
  }
}

export async function getLikeBackground(data) {
  console.log('bgId' , data)
  try {
    const res = await api.get(`${constantUrl}/like`, data);
    return res;
  } catch (err) {
    console.log(err);
    return err
  }
}

// background_id 
export async function likeBackground(data) {
  try {
    const res = await api.post(`${constantUrl}/like`, data);
    return res;
  } catch (err) {
    console.log(err);
    return err
  }
}

