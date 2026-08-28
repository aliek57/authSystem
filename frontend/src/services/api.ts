import axios from 'axios';
import { firebaseAuth } from './firebase';

export const api = axios.create({
  baseURL: 'https://authsystem-6apm.onrender.com',
});

api.interceptors.request.use(async (config) => {
  const user = firebaseAuth.currentUser;
  
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});