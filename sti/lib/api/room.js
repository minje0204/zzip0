import axios from 'axios';
import { Cookies } from "react-cookie"

const cookies = new Cookies()
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  headers:{
    // 'Content-Type': 'application/json',
    'Authorization': `Bearer ${cookies.get('accessToken')}`
  }
});

async function roomGetAPI(data) {
  try {
    const res = await api.get(`room/list?page=${data}`);
    return res;
  } catch (err) {
    console.log(err);
    return err
  }
}

async function roomPostAPI(data) {
  try {
    const res = await api.post(`room`, data);
    return res;
  } catch (err) {
    return err
  }
}

async function roomCloseAPI(header, data) {
  try {
    const res = await api.patch(`room`, { data: data, headers: headers });
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function roomExitAPI(header, data) {
  try {
    const res = await api.patch(`room/exit`, { data: data, headers: headers });
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function roomSearchAPI(header, data) {
  try {
    const res = await api.get(`room/search?q=${data}`, { headers: headers });
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function roomGrantAPI(header, data) {
  try {
    const res = await api.get(`room/grant`, { data: data, headers: headers });
    return res;
  } catch (err) {
    console.log(err);
  }
}

export {
  roomGetAPI,
  roomPostAPI,
  roomCloseAPI,
  roomExitAPI,
  roomSearchAPI,
  roomGrantAPI
};
