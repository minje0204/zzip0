

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
})

async function roomGetAPI(data) {
  try {
    const res = await api.get(`room/list?page=${data}`)
    return res
  } catch (err) {
    console.log(err)
  }
}

async function roomPostAPI(header, data) {
  try {
    const res = await api.post(`room`, { data: data, headers: headers })
    return res
  } catch (err) {
    console.log(err)
  }
}

async function roomCloseAPI(header, data) {
  try {
    const res = await api.patch(`room`, { data: data, headers: headers })
    return res
  } catch (err) {
    console.log(err)
  }
}

async function roomExitAPI(header, data) {
  try {
    const res = await api.patch(`room/exit`, { data: data, headers: headers })
    return res
  } catch (err) {
    console.log(err)
  }
}

async function roomSearchAPI(header, data) {
  try {
    const res = await api.get(`room/search?q=${data}`, { headers: headers })
    return res
  } catch (err) {
    console.log(err)
  }
}

  async function roomGrantAPI(header, data) {
    try {
      const res = await api.get(`room/grant`, { data: data, headers: headers })
      return res
    } catch (err) {
      console.log(err)
    }
  }

export { roomGetAPI, roomPostAPI, roomCloseAPI, roomExitAPI, roomSearchAPI, roomGrantAPI }

