

import axios, { type AxiosInstance } from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosClient = (): AxiosInstance => {

  const axiosClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10_000,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return axiosClient;
};

export const httpClient = axiosClient();