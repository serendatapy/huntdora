import axios from 'axios';

const BASEURL:any = process.env.REACT_APP_BASE_URL;

export const reedAPI = axios.create({
  baseURL: BASEURL,
  responseType: "json",
})