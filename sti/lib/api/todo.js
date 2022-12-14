import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  headers: {
    // 'Content-Type': 'application/json',
    Authorization: `Bearer ${cookies.get('accessToken')}`
  }
});

async function todoGetAPI(date) {
  try {
    const res = await api.get(`todo/${date}`);
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function todoPostAPI(date, data) {
  try {
    const res = await api.post(`todo/${date}`, data);
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function todoPatchAPI(itemId, data) {
  try {
    const res = await api.patch(`todo/${itemId}`, data);
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function todoDeleteAPI(id, data) {
  try {
    const res = await api.delete(`todo/${id}`, data);
    return res;
  } catch (err) {
    console.log(err);
  }
}

export { todoGetAPI, todoPostAPI, todoPatchAPI, todoDeleteAPI };
