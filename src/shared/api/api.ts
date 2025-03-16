import axios from 'axios';

// Базовые конфигурации без токена
export const userApi = axios.create({
  baseURL: 'http://localhost:8080',
});

export const adminApi = axios.create({
  baseURL: 'http://localhost:8080/admin',
});

// Функция для получения токена, которая будет вызываться при каждом запросе
function getAuthTokenDynamic() {
  try {
    // Получаем токен напрямую из localStorage
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
