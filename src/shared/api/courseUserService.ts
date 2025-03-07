// src/shared/api/courseUserService.js
import axios from 'axios';
import { AuthService } from '@/app/features/auth/model/Auth';

const API_URL = 'http://localhost:8080';

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
  }
};
