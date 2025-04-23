import axios from 'axios';

// export const userApi = axios.create({
//   baseURL: 'http://localhost:8080',
// });

// export const adminApi = axios.create({
//   baseURL: 'http://localhost:8080/admin',
// });

export const userApi = axios.create({
  baseURL: 'https://babichschool.ru:8080',
});

export const adminApi = axios.create({
  baseURL: 'https://babichschool.ru:8080/admin',
});


function getAuthTokenDynamic() {
  try {
    return localStorage.getItem('jwt_token');
  } catch (error) {
    console.error('Ошибка при получении токена:', error);
    return null;
  }
}

userApi.interceptors.request.use(config => {
  const token = getAuthTokenDynamic();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

adminApi.interceptors.request.use(config => {
  const token = getAuthTokenDynamic();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
