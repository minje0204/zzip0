

import axios from 'axios';

const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const api = axios.create({
  baseURL: PUBLIC_API_KEY,
})

async function roomGetAPI(data) {
  try {
    const res = await api.get(`room/list?page=${data}`)
    return res
  } catch (err) {
    console.log(err)
  }
}


async function roomPostAPI(data) {
  try {
    const res = await api.get(`room/list?page=${data}`, { headers })
    return res
  } catch (err) {
    console.log(err)
  }
}


export { roomGetAPI }

