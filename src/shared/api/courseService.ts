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
    // Проверяем, что courseId - строка или число
    const id = typeof courseId === 'object' ? courseData.id || courseData.courseId : courseId;

    // Если есть файл изображения, используем FormData
    const formData = new FormData();
    formData.append('courseId', courseData.courseId); // Убрал пробел в ключе
    formData.append('newTitle', courseData.title);
    formData.append('price', courseData.price);
    formData.append('difficulty', courseData.difficulty);
    formData.append('status', courseData.status);

    const payload = formData;

    const response = await axios.put(`${API_URL}/courses/${id}`, payload, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;

  } catch (error) {
    console.error(`Ошибка при обновлении курса с ID ${courseId}:`, error);
    throw error;
  }
},



  // Удаление курса
  async deleteCourse(courseId) {
    console.log(`Отправка запроса на удаление курса с ID ${courseId}`);

    if (!courseId) {
      throw new Error('ID курса не указан');
    }

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
async getBlocksByCourseId(courseId) {
  try {
    console.log('Запрос блоков для курса ID:', courseId);

    const response = await axios.get(`${API_URL}/courses/${courseId}/details`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });

    console.log('Ответ API курса с блоками:', response.data);

    // Проверяем наличие данных и поля blocks
    if (!response.data || !response.data.blocks) {
      console.warn('API не вернул блоки курса');
      return [];
    }

    // Возвращаем только массив блоков
    return response.data.blocks;
  } catch (error) {
    console.error(`Ошибка при получении блоков курса ${courseId}:`, error);
    console.error('Детали ошибки:', error.response?.data);
    return [];
  }
},

async updateBlock(blockId, blockData) {
  try {
    // Используем FormData вместо URLSearchParams
    const formData = new FormData();

    // Добавляем данные в formData
    if (blockData.title) formData.append('newTitle', blockData.title);
    if (blockData.courseId !== undefined) formData.append('courseId', blockData.courseId);

    const response = await axios.put(`${API_URL}/blocks/${blockId}`, formData, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        // При использовании FormData Content-Type будет установлен автоматически
        // с правильной boundary, поэтому не указываем его явно
      }
    });

    return response.data;
  } catch (error) {
    console.error(`Ошибка при обновлении блока с ID ${blockId}:`, error);
    throw error;
  }
},

// Обновление блока с изображением
async updateBlockWithImage(blockData, imageFile) {
  const formData = new FormData();
  formData.append('title', blockData.title);
  if (blockData.courseId !== undefined) formData.append('courseId', blockData.courseId);

  if (imageFile) {
    formData.append('imageFile', imageFile);
  }

  const response = await axios.put(`${API_URL}/blocks/${blockData.id}`, formData, {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
},

// Получение уроков блока
async getLessonsByBlockId(blockId) {
  try {
    const response = await axios.get(`${API_URL}/blocks/${blockId}/details`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });

    // Проверяем наличие данных и поля lessons
    if (!response.data || !response.data.lessons) {
      console.warn('API не вернул уроки блока');
      return [];
    }

    return response.data.lessons || [];
  } catch (error) {
    console.error(`Ошибка при получении уроков блока ${blockId}:`, error);
    return [];
  }
},

// Получение деталей урока
async getLessonDetails(lessonId) {
  try {
    const response = await axios.get(`${API_URL}/lessons/${lessonId}/details`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });

    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении деталей урока ${lessonId}:`, error);
    throw error;
  }
},

// Создание урока
async createLesson(lessonData) {
  try {
    // Формируем URL с query-параметрами
    let url = `${API_URL}/lessons?blockId=${lessonData.blockId}&title=${encodeURIComponent(lessonData.title)}`;

    // Добавляем описание, если оно есть
    if (lessonData.description) {
      url += `&description=${encodeURIComponent(lessonData.description)}`;
    }

    const response = await axios.post(url, null, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Ошибка при создании урока:', error);
    throw error;
  }
},

// Удаление урока
async deleteLesson(lessonId) {
  try {
    const response = await axios.delete(`${API_URL}/lessons/${lessonId}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });

    return response.data;
  } catch (error) {
    console.error(`Ошибка при удалении урока ${lessonId}:`, error);
    throw error;
  }
},

// Вариант с axios без тела и Content-Type
// В courseService.js
// Обновление урока через POST /admin/lessons с ID урока в качестве параметра
async updateLesson(lessonId, lessonData) {
  try {
    // Создаем объект FormData для multipart/form-data
    const formData = new FormData();
    if (lessonData.newTitle) {
      formData.append('newTitle', lessonData.newTitle);
    }
    if (lessonData.newDescription) {
      formData.append('newDescription', lessonData.newDescription);
    }
    if (lessonData.newSheetUrl) {
      formData.append('newSheetUrl', lessonData.newSheetUrl);
    }

    // Формируем URL без параметров, так как данные отправляются в теле запроса
    const url = `${API_URL}/lessons/${lessonId}`;

    // Отправляем PUT-запрос с FormData
    const response = await axios.put(url, formData, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        // Не нужно явно задавать Content-Type, axios сделает это автоматически
      }
    });

    return response.data;
  } catch (error) {
    console.error(`Ошибка при обновлении урока ${lessonId}:`, error);
    throw error;
  }
},

// Загрузка видео для урока


// Загрузка изображения для урока
// В courseService.js
// Загрузка изображения для урока
async uploadLessonImage(lessonId, imageFile) {
  try {
    console.log('Загрузка изображения для урока:', lessonId);
    console.log('Файл:', imageFile?.name, imageFile?.size);

    const formData = new FormData();
    formData.append('imageFile', imageFile);  // Используем 'imageFile' как имя параметра

    const response = await axios.post(`${API_URL}/lessons/${lessonId}/image`, formData, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
        // НЕ указываем Content-Type - браузер сделает это автоматически
      }
    });

    return response.data;
  } catch (error) {
    console.error(`Ошибка при загрузке изображения для урока ${lessonId}:`, error);
    throw error;
  }
},

// Загрузка видео для урока
async uploadLessonVideo(lessonId, videoFile) {
  try {
    console.log('Загрузка видео для урока:', lessonId);
    console.log('Файл:', videoFile?.name, videoFile?.size);

    const formData = new FormData();
    formData.append('videoFile', videoFile);  // Используем 'videoFile' как имя параметра

    const response = await axios.post(`${API_URL}/lessons/${lessonId}/video`, formData, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
        // НЕ указываем Content-Type - браузер сделает это автоматически
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log('Прогресс загрузки видео:', percentCompleted, '%');
      }
    });

    return response.data;
  } catch (error) {
    console.error(`Ошибка при загрузке видео для урока ${lessonId}:`, error);
    throw error;
  }
},

// Загрузка изображения для блока
async uploadBlockImage(blockId, imageFile) {
  try {
    console.log('Загрузка изображения для блока:', blockId);
    console.log('Файл:', imageFile?.name, imageFile?.size);

    const formData = new FormData();
    formData.append('imageFile', imageFile);  // Используем 'imageFile' как имя параметра

    const response = await axios.post(`${API_URL}/blocks/${blockId}/image`, formData, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
        // НЕ указываем Content-Type - браузер сделает это автоматически с правильным boundary
      }
    });

    return response.data;
  } catch (error) {
    console.error(`Ошибка при загрузке изображения для блока ${blockId}:`, error);
    throw error;
  }
},

async getBlockDetails(blockId) {
  try {
    const response = await axios.get(`${API_URL}/admin/blocks/${blockId}/details`);
    return response.data;
  } catch (error) {
    throw error;
  }
},

async getLessonDetails(lessonId) {
  try {
    const response = await axios.get(`${API_URL}/lessons/${lessonId}/details`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });

    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении деталей урока ${lessonId}:`, error);
    throw error;
  }
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

async reorderBlocks(courseId, blocksOrder) {
  try {
    // Преобразуем все данные в примитивные типы и убедимся, что order точно есть
    const payload = blocksOrder.map(block => ({
      id: parseInt(block.id, 10),      // Преобразуем в целое число
      order: parseInt(block.order, 10)  // Преобразуем в целое число
    }));

    console.log('Отправляем данные для переупорядочивания:', payload);

    // Отправляем данные как массив в теле запроса
    const response = await axios({
      method: 'post',
      url: `${API_URL}/courses/${courseId}/reorder-blocks`,
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      },
      data: payload  // Важно: отправляем именно массив, а не объект с массивом
    });

    return response.data;
  } catch (error) {
    console.error('Ошибка при изменении порядка блоков:', error);
    console.error('Детали ошибки:', error.response?.data);
    throw error;
  }
},

async reorderLessons(blockId, lessonsOrder) {
  try {
    const response = await axios.post(`${API_URL}/blocks/${blockId}/reorder-lessons`, lessonsOrder, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при изменении порядка уроков:', error);
    throw error;
  }
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
