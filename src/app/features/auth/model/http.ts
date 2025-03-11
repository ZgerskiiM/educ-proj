import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Вам нужно установить эту библиотеку: npm install jwt-decode

const API_URL = 'http://45.12.228.30:8080';

const http = axios.create({
  baseURL: API_URL,
});

// Функция для принудительного выхода
function forceLogout() {
  localStorage.removeItem("jwt_token");
  localStorage.removeItem("refresh_token");
  alert("Сессия истекла. Вы будете перенаправлены на страницу входа.");
  window.location.href = '/login';
}

// Функция для проверки токена перед запросом
async function getValidToken() {
  try {
    const token = localStorage.getItem("jwt_token");

    if (!token) {
      forceLogout();
      return null;
    }

    // Декодируем токен для проверки срока действия
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // Если токен истекает через менее чем 30 секунд, обновляем его
    if (decoded.exp && decoded.exp - currentTime < 30) {
      console.log("Токен скоро истечет, обновляем...");
      return await refreshToken();
    }

    return token;
  } catch (error) {
    console.error("Ошибка при проверке токена:", error);
    return await refreshToken();
  }
}

// Функция для обновления токена
async function refreshToken() {
  try {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      forceLogout();
      return null;
    }

    // Прямой запрос без использования http (чтобы избежать циклических зависимостей)
    const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });

    // Проверяем все возможные форматы ответа
    let newToken;
    if (response.data.token) newToken = response.data.token;
    else if (response.data.accessToken) newToken = response.data.accessToken;
    else if (typeof response.data === 'string') newToken = response.data;
    else throw new Error("Неверный формат ответа");

    // Сохраняем токены
    localStorage.setItem("jwt_token", newToken);

    if (response.data.refreshToken) {
      localStorage.setItem("refresh_token", response.data.refreshToken);
    }

    return newToken;
  } catch (error) {
    console.error("Ошибка при обновлении токена:", error);
    forceLogout();
    return null;
  }
}

// Интерсептор запросов с проактивной проверкой токена
http.interceptors.request.use(
  async (config) => {
    // Пропускаем запросы авторизации без проверки токена
    if (config.url?.includes('/auth/login') || config.url?.includes('/auth/refresh')
      || config.url?.includes('/auth/signup') || config.url?.includes('/auth/verify')
      || config.url?.includes('/auth/verify')  || config.url?.includes('/auth/reset-password')
      || config.url?.includes('/auth/r-password')){
      return config;
    }

    const token = await getValidToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Интерсептор ответов с обработкой ошибок
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Если ошибка связана с авторизацией
    if (error.response?.status === 401 || error.response?.status === 403) {
      try {
        // Пытаемся обновить токен и повторить запрос
        const token = await refreshToken();

        if (token) {
          error.config.headers.Authorization = `Bearer ${token}`;
          return axios(error.config);
        }
      } catch (refreshError) {
        console.error("Не удалось обновить токен:", refreshError);
        forceLogout();
      }
    }

    return Promise.reject(error);
  }
);

export default http;
