// src/shared/api/courseService.js
import axios from 'axios';
import { AuthService } from '@/app/features/auth/model/Auth';

const API_URL = 'http://localhost:8080/admin';

// Функция для получения актуального токена при каждом запросе
const getAuthToken = () => {
  return AuthService.getToken();
  ;
};

export const getUserService = {
  // Получение всех курсов
  async fetchAllUsers() {
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return response.data;
  },


  async fetchCourse(userId) {
    const response = await axios.get(`${API_URL}/users/${userId}`, {
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
