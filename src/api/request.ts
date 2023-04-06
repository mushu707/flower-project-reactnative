import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {store} from "../redux/store";

const instance = axios.create({
  baseURL: 'http://localhost:8888/JavaEE'
});

instance.interceptors.request.use(config => {
  const data = config.data;
  if (config.method === 'get'){
    config.params = data;
  }
  config.headers = {'Content-Type': 'application/json; charset=UTF-8'};
  const token = store.getState().User.token;
  if (token) config.headers['token'] = token;
  return config;
}, err => {
  return Promise.reject(err);
});

instance.interceptors.response.use(res => {
  return res.data;
}, err => {
  return Promise.reject(err);
});

export default instance;
