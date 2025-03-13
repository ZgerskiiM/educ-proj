import axios from 'axios';
import { AuthService } from '@/app/features/auth/model/Auth';

const API_URL = 'https://babichschool.ru:8080';

// Функция для получения актуального токена при каждом запросе
const getAuthToken = () => {
  return AuthService.getToken();
};

export const courseUserService = {
  // Получение данных курса с блоками
  async fetchCourseWithBlocks(courseId) {
    const response = await axios.get(`${API_URL}/users/courses/${courseId}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return response.data;
  },

  // Получение блока с уроками
  async fetchBlockWithLessons(blockId) {
    try {
      const response = await axios.get(`${API_URL}/users/blocks/${blockId}`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении блока ${blockId}:`, error);
      throw error;
    }
  },

  // Получение деталей урока
  async fetchLessonDetails(lessonId) {
    try {
      const response = await axios.get(`${API_URL}/users/lessons/${lessonId}`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении урока ${lessonId}:`, error);
      throw error;
    }
  }
};
