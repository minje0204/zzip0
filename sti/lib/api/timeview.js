import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const constantUrl = 'timeview';
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  headers: {
    Authorization: `Bearer ${cookies.get('accessToken')}`
  }
});

// 일별 공부량
export async function getDateTimeView(data) {
  try {
    const res = await api.get(`${constantUrl}/date/${data}`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

// 월별 공부량
export async function getMonthTimeView(data) {
  try {
    const res = await api.get(`${constantUrl}/month/${data}`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

// 연도별 공부량
export async function getMonthTimeView(data) {
  try {
    const res = await api.get(`${constantUrl}/year/${data}`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

// 특정 날짜 범위 공부량
export async function getMonthTimeView(startDate, endDate) {
  try {
    const res = await api.get(`${constantUrl}/day?${startDate}&${endDate}`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}
