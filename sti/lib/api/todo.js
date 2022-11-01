import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY
});

async function todoGetAPI(data) {
  try {
    const res = await api.get(`todo/${date}`, { headers: headers });
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function todoPostAPI(header, data) {
  try {
    const res = await api.post(`todo/${data.date}`, {
      data: data,
      headers: headers
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function todoPatchAPI(header, data) {
  try {
    const res = await api.patch(`todo/${data.id}`, {
      data: data,
      headers: headers
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function todoDeleteAPI(header, data) {
  try {
    const res = await api.delete(`todo/${data.id}`, {
      data: data,
      headers: headers
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}

export { todoGetAPI, todoPostAPI, todoPatchAPI, todoDeleteAPI };
