import axios from 'axios';

//Resolve Type problem with username and API key
const API_KEY: any = process.env.REACT_APP_API_KEY;
const BASEURL: string = 'https://cors-anywhere.herokuapp.com/https://www.reed.co.uk/api/1.0';

export const reedAPI = axios.create({
  auth: {
    username: API_KEY,
    password: ''
  },
  baseURL: BASEURL,
  responseType: "json",
})


// https://cors-anywhere.herokuapp.com/
// Temporarily disables cors policy, for better performance make own proxy
//https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9