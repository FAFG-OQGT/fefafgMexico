import axios from "axios";
import config from "../config";

const configReq = (token) => {
  return {headers: {Authorization: `Bearer ${token}`}};
};

const apiFetch = async (url, token) => {
  try {
    const res = await axios.get(`${config.urlApi}/${url}`, configReq(token));

    return res.data.data;
  } catch (error) {
    return {error: error};
  }
};

export {apiFetch};
