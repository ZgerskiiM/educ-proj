// src/shared/api/courseService.js
import axios from 'axios';
import { AuthService } from '@/app/features/auth/model/Auth';

const API_URL = 'http://localhost:8080/admin';

// Функция для получения актуального токена при каждом запросе
const getAuthToken = () => {
  return AuthService.getToken();
  ;
};


export const courseService = {
  // Получение всех курсов
  async fetchAllCourses() {
    const response = await axios.get(`${API_URL}/courses`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return response.data;
  },

  // Получение отдельного курса
  async fetchCourse(courseId) {
    const response = await axios.get(`${API_URL}/courses/${11}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return response.data;
  },

  // Создание нового курса
  async createCourse(courseData) {
    // Используем URLSearchParams для формата application/x-www-form-urlencoded
    const params = new URLSearchParams();
    params.append('title', courseData.title);
    params.append('price', courseData.price);
    params.append('difficulty', courseData.difficulty);
    params.append('status', courseData.status || 'PENDING');

    if (courseData.imageUrl) {
      params.append('imageUrl', courseData.imageUrl);
    }

    const response = await axios.post(`${API_URL}/courses`, params, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  },

  // Обновление курса
  async updateCourse(courseId, courseData) {
    const params = new URLSearchParams();

    if (courseData.id) params.append('id', courseData.id);
    if (courseData.blockId) params.append('blockId', courseData.blockId);
    if (courseData.title) params.append('title', courseData.title);
    if (courseData.description) params.append('description', courseData.description);
    if (courseData.videoUrl) params.append('videoUrl', courseData.videoUrl);
    if (courseData.sheetUrl) params.append('sheetUrl', courseData.sheetUrl);

    const response = await axios.put(`${API_URL}/courses/${courseId}`, params, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  },

  // Удаление курса
  async deleteCourse(courseId) {
    const response = await axios.delete(`${API_URL}/courses/${courseId}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return response.data;
  },

  // Вариант с загрузкой файла изображения
  async createCourseWithImage(courseData, imageFile) {
    const formData = new FormData();
    formData.append('title', courseData.title);
    formData.append('price', courseData.price);
    formData.append('difficulty', courseData.difficulty);
    formData.append('status', courseData.status || 'PENDING');

    if (imageFile) {
      formData.append('image', imageFile);
    } else if (courseData.imageUrl) {
      formData.append('imageUrl', courseData.imageUrl);
    }

    const response = await axios.post(`${API_URL}/courses`, formData, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  }
};
