import axios from 'axios';
import { Cookies } from 'react-cookie';

const constantUrl = 'room';
const cookies = new Cookies();
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  headers: {
    // 'Content-Type': 'application/json',
    Authorization: `Bearer ${cookies.get('accessToken')}`
  }
});

// 방목록 가져오기v
export async function roomGetAPI(data) {
  try {
    const res = await api.get(`${constantUrl}/list?page=${data}`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

// 방생성
export async function roomPostAPI(data) {
  try {
    const res = await api.post(`${constantUrl}`, data);
    return res;
  } catch (err) {
    return err;
  }
}

//방장인지 확인
export async function roomKingAPI(roomId) {
  try {
    const res = await api.get(`${constantUrl}/${roomId}/king`);
    return res;
  } catch (err) {
    return err;
  }
}

// 방정보확인
export async function roomInfoAPI(data) {
  try {
    const res = await api.get(`${constantUrl}/${data}`);
    return res;
  } catch (err) {
    return err;
  }
}

// 방입장 가능 여부 확인
export async function canEnterAPI() {
  try {
    const res = await api.get(`${constantUrl}/enter`);
    return res;
  } catch (err) {
    return err;
  }
}

export async function roomCloseAPI(header, data) {
  try {
    const res = await api.patch(`${constantUrl}`, {
      data: data,
      headers: headers
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function roomExitAPI(header, data) {
  try {
    const res = await api.patch(`${constantUrl}/exit`, {
      data: data,
      headers: headers
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function roomSearchAPI(header, data) {
  try {
    const res = await api.get(`${constantUrl}/search?q=${data}`, {
      headers: headers
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function roomGrantAPI(header, data) {
  try {
    const res = await api.get(`${constantUrl}/grant`, {
      data: data,
      headers: headers
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}
