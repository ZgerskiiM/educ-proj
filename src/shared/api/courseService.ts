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

  async uploadCourseImage(courseId, imageFile) {
    try {
      const formData = new FormData();

      // Именно 'imageFile', как ожидает сервер
      formData.append('imageFile', imageFile);

      console.log('Отправка файла:', imageFile.name, 'размер:', imageFile.size);

      const response = await axios.post(
        `${API_URL}/courses/${courseId}/image`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
            // Важно НЕ устанавливать Content-Type вручную для multipart/form-data
            // Браузер сам должен сгенерировать правильный boundary
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Ошибка при загрузке изображения:', error);
      throw error;
    }
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
// Обновление курса - новая реализация
async updateCourse(courseId, courseData) {
  try {
    let payload;

    if (courseData.imageFile) {
      // Если есть файл изображения, используем FormData
      const formData = new FormData();
      formData.append('id', courseData.id);
      formData.append('title', courseData.title);
      formData.append('price', courseData.price);
      formData.append('difficulty', courseData.difficulty);
      formData.append('status', courseData.status);
      formData.append('imageFile', courseData.imageFile);

      payload = formData;

      const response = await axios.put(`${API_URL}/courses/${courseId}`, payload, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } else {
      // Если нет файла, используем URLSearchParams
      const params = new URLSearchParams();
      params.append('id', courseData.id);
      params.append('title', courseData.title);
      params.append('price', courseData.price);
      params.append('difficulty', courseData.difficulty);
      params.append('status', courseData.status);

      if (courseData.imageUrl) {
        params.append('imageUrl', courseData.imageUrl);
      }

      payload = params;

      const response = await axios.put(`${API_URL}/courses/${courseId}`, payload, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      return response.data;
    }
  } catch (error) {
    console.error(`Ошибка при обновлении курса с ID ${courseId}:`, error);
    throw error;
  }
},

  // Удаление курса
  async deleteCourse(courseId) {
    console.log(`Отправка запроса на удаление курса с ID ${courseId}`);

    try {
      const response = await axios.delete(`${API_URL}/courses/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Ошибка при удалении курса с ID ${courseId}:`, error);
      throw error;
    }
  },

  // Вариант с загрузкой файла изображения
  async createCourseWithImage(courseData, imageFile) {
    const formData = new FormData();
    formData.append('title', courseData.title);
    formData.append('price', courseData.price);
    formData.append('difficulty', courseData.difficulty);
    formData.append('status', courseData.status || 'PENDING');

    if (imageFile) {
      formData.append('imageFile', imageFile); // Изменено с 'image' на 'imageFile'
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
  },
  // Добавляем в courseService.js

// Получение блоков курса
async getBlocksByCourseId(blockId) {
  const response = await axios.get(`${API_URL}/blocks/${blockId}`, {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`
    }
  });
  return response.data;
},


// Создание нового блока
async createBlock(blockData) {
  const params = new URLSearchParams();

  if (blockData.title) params.append('title', blockData.title);
  if (blockData.courseId !== undefined) params.append('courseId', blockData.courseId);
  if (blockData.imageUrl) params.append('imageUrl', blockData.imageUrl);

  const response = await axios.post(`${API_URL}/blocks`, params, {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return response.data;
},

// Создание блока с изображением
async createBlockWithImage(blockData, imageFile) {
  const formData = new FormData();
  formData.append('title', blockData.title);
  formData.append('courseId', blockData.courseId);

  if (imageFile) {
    formData.append('imageFile', imageFile);
  } else if (blockData.imageUrl) {
    formData.append('imageUrl', blockData.imageUrl);
  }

  const response = await axios.post(`${API_URL}/blocks`, formData, {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
},

// Удаление блока
async deleteBlock(blockId) {
  const response = await axios.delete(`${API_URL}/blocks/${blockId}`, {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`
    }
  });
  return response.data;
}

}
