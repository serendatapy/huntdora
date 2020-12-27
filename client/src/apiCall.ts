import axios from 'axios';

const BASEURL: string | undefined = process.env.REACT_APP_BASE_URL;

export const reedAPI = axios.create({
  baseURL: BASEURL,
  responseType: "json",
})