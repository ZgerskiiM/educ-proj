import axios from 'axios';

export const userApi = axios.create({
  baseURL: 'https://babichschool.ru:8081',
});

export const adminApi = axios.create({
  baseURL: 'https://babichschool.ru:8081/admin',
});

function getAuthTokenDynamic() {
  try {
    return localStorage.getItem('jwt_token');
  } catch (error) {
    console.error('Ошибка при получении токена:', error);
    return null;
  }
}

// Добавляем интерцептор для userApi
userApi.interceptors.request.use(config => {
  const token = getAuthTokenDynamic();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Добавляем интерцептор для adminApi
adminApi.interceptors.request.use(config => {
  const token = getAuthTokenDynamic();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
