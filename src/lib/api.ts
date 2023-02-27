import axios from 'axios';

const defaultUrl = 'http://localhost:3333';

const baseURL = process?.env?.HOST || document?.location?.origin || defaultUrl;

export const api = axios.create({
  baseURL,
});
