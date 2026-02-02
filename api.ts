import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// @ts-ignore
export const ZENDESK_KEY: string = process.env.ZENDESK_KEY;
const api = axios.create({
  baseURL: `${BASE_URL}`,
});

export default api;
