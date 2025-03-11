import axios from 'axios'
import { AuthService } from '@/app/features/auth/model/Auth';

const API_URL = 'http://45.12.228.30:8080';

// Функция для получения данных пользователя с ролью
export const getUserData = async () => {
  try {
    // Получаем токен из localStorage
    const token = AuthService.getToken();

    // Проверяем, что токен существует
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const response = await axios.get(`${API_URL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Извлекаем все необходимые данные, включая роль
    const { firstName, lastName, email, role } = response.data;
    return { firstName, lastName, email, role };

  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// Проверка роли пользователя
export const checkUserRole = async (requiredRole) => {
  try {
    const userData = await getUserData();
    return userData.role === requiredRole;
  } catch (error) {
    console.error('Error checking user role:', error);
    return false;
  }
};

export const hasAccessToCourse = async (courseId) => {
  try {
    const token = AuthService.getToken();

    if (!token) return false;

    // Получаем все курсы пользователя
    const response = await axios.get(`${API_URL}/users/courses`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Проверяем, есть ли курс в списке доступных
    const userCourses = response.data;
    return userCourses.some(course => course.id === parseInt(courseId));
  } catch (error) {
    console.error('Error checking course access:', error);
    return false;
  }
};

// Функция для получения курсов пользователя
export const getUserCourses = async () => {
  try {
    const token = AuthService.getToken();

    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const response = await axios.get(`${API_URL}/users/courses`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // Исправляем дублирование протокола в URL
    const processedCourses = response.data.map(course => {
      if (course.imageUrl) {

        // Исправляем дублирование https:// в URL
        course.imageUrl = course.imageUrl.replace(/https:\/\/https:\/\//, 'https://');

        // Логирование для отладки
      }
      return course;
    });
    return processedCourses;
  } catch (error) {
    console.error('Error fetching user courses:', error);
    throw error;
  }
};



export const getBlockLessons = async (blockId) => {
  try {
    const token = AuthService.getToken();

    if (!token) return false;

    // Получаем все курсы пользователя
    const response = await axios.get(`${API_URL}/users/blocks/${blockId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
      return response.data
  } catch (error) {
    console.error('Ошибка при получении данных блока:', error);
    throw error;
  }
};

// Создаем набор для отслеживания выполняющихся запросов
const pendingLessonRequests = new Set();

import { LessonStateService } from './LessonStateService';

export const markLessonAsStarted = async (lessonId) => {
  const requestKey = `start-${lessonId}`;

  // Если урок уже отмечен как начатый или запрос выполняется, пропускаем
  if (LessonStateService.isLessonStarted(lessonId) ||
      LessonStateService.isRequestInProgress(requestKey)) {
    return Promise.resolve({});
  }

  // Отмечаем, что запрос выполняется
  LessonStateService.startRequest(requestKey);

  try {
    const token = AuthService.getToken();
    if (!token) throw new Error('Authentication token is missing');

    const response = await axios.post(`${API_URL}/users/lessons/${lessonId}/start`, {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    // Отмечаем урок как начатый
    LessonStateService.markLessonAsStarted(lessonId);

    return response.data;
  } catch (error) {
    console.error('Error marking lesson as started:', error);
    throw error;
  } finally {
    // Завершаем запрос
    LessonStateService.finishRequest(requestKey);
  }
};

export const markLessonAsComplete = async (lessonId) => {
  const requestKey = `complete-${lessonId}`;

  // Если урок уже отмечен как завершенный или запрос выполняется, пропускаем
  if (LessonStateService.isLessonCompleted(lessonId) ||
      LessonStateService.isRequestInProgress(requestKey)) {
    return Promise.resolve({});
  }

  // Отмечаем, что запрос выполняется
  LessonStateService.startRequest(requestKey);

  try {
    const token = AuthService.getToken();
    if (!token) throw new Error('Authentication token is missing');

    // Добавляем небольшую задержку для надежности
    await new Promise(resolve => setTimeout(resolve, 100));

    const response = await axios.post(`${API_URL}/users/lessons/${lessonId}/complete`, {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    // Отмечаем урок как завершенный
    LessonStateService.markLessonAsCompleted(lessonId);

    return response.data;
  } catch (error) {
    console.error('Error marking lesson as complete:', error);
    throw error;
  } finally {
    // Завершаем запрос
    LessonStateService.finishRequest(requestKey);
  }
};

// Проверка, является ли пользователь администратором
export const isAdmin = async () => {
  return await checkUserRole('ADMIN');
};

// Функция для входа пользователя
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });

    // Сохраняем токены
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem('token', accessToken);

    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }

    // После получения токена, сразу получаем данные пользователя
    const userData = await getUserData();

    // Сохраняем роль для быстрого доступа
    localStorage.setItem('userRole', userData.role);

    return {
      success: true,
      isAdmin: userData.role === 'ADMIN',
      userData
    };

  } catch (error) {
    console.error('Login failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Login failed'
    };
  }
};

// Функция для проверки, имеет ли пользователь определенную роль (синхронная версия)
export const hasRole = (requiredRole) => {
  const userRole = localStorage.getItem('userRole');
  return userRole === requiredRole;
};

// Выход пользователя
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userRole');
  // При необходимости тут можно делать запрос на сервер для инвалидации токена
};
