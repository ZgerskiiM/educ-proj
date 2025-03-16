// src/shared/api/courseService.js
import { AuthService } from '@/app/features/auth/model/Auth';
import { adminApi } from '@/shared/api/api';

const getAuthToken = () => {
  return AuthService.getToken();
};

export const courseService = {
  // ======== КУРСЫ ========
  async fetchAllCourses() {
    try {
      const response = await adminApi.get(`/courses`, {
      });
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении всех курсов:', error);
      throw error;
    }
  },

  async fetchCourse(courseId) {
    try {
      const response = await adminApi.get(`/courses/${courseId}`, {
      });
      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении курса ${courseId}:`, error);
      throw error;
    }
  },

  async createCourseWithImage(courseData, imageFile) {
    try {
      const formData = new FormData();
      formData.append('title', courseData.title);
      formData.append('price', courseData.price);
      formData.append('difficulty', courseData.difficulty);
      formData.append('status', courseData.status || 'PENDING');
      formData.append('chat', courseData.chat);
      if (imageFile) {
        formData.append('imageFile', imageFile);
      } else if (courseData.imageUrl) {
        formData.append('imageUrl', courseData.imageUrl);
      }
      const response = await adminApi.post(`/courses`, formData, {
      });
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании курса с изображением:', error);
      throw error;
    }
  },

  async uploadCourseImage(courseId, imageFile) {
    try {
      const formData = new FormData();
      formData.append('imageFile', imageFile);

      const response = await adminApi.post(
        `/courses/${courseId}/image`,
        formData,
      );
      return response.data;
    } catch (error) {
      console.error(`Ошибка при загрузке изображения для курса ${courseId}:`, error);
      throw error;
    }
  },

  async updateCourse(courseId, courseData) {
    try {
      const id = typeof courseId === 'object' ? courseData.id || courseData.courseId : courseId;
      const formData = new FormData();
      formData.append('courseId', courseData.courseId || id);
      formData.append('newTitle', courseData.title);
      formData.append('price', courseData.price);
      formData.append('difficulty', courseData.difficulty);
      formData.append('status', courseData.status);
      formData.append('chat', courseData.chat);
      const response = await adminApi.put(`/courses/${id}`, formData, {
      });
      return response.data;
    } catch (error) {
      console.error(`Ошибка при обновлении курса с ID ${courseId}:`, error);
      throw error;
    }
  },

  async deleteCourse(courseId) {
    if (!courseId) {
      throw new Error('ID курса не указан');
    }
    try {
      const response = await adminApi.delete(`/courses/${courseId}`, {
      });
      return response.data;
    } catch (error) {
      console.error(`Ошибка при удалении курса с ID ${courseId}:`, error);
      throw error;
    }
  },

  // ======== БЛОКИ ========
  async getBlocksByCourseId(courseId) {
    try {
      const response = await adminApi.get(`/courses/${courseId}/details`,);
      if (!response.data || !response.data.blocks) {
        console.warn('API не вернул блоки курса');
        return [];
      }
      return response.data.blocks;
    } catch (error) {
      console.error(`Ошибка при получении блоков курса ${courseId}:`, error);
      console.error('Детали ошибки:', error.response?.data);
      return [];
    }
  },

  async getBlockDetails(blockId) {
    try {
      const response = await adminApi.get(`/blocks/${blockId}/details`,);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении деталей блока ${blockId}:`, error);
      throw error;
    }
  },

  async createBlock(blockData) {
    try {
      const formData = new FormData();
      formData.append('title', blockData.title);
      formData.append('courseId', blockData.courseId);
      if (blockData.imageUrl) formData.append('imageUrl', blockData.imageUrl);

      const response = await adminApi.post(`/blocks`, formData,);
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании блока:', error);
      throw error;
    }
  },

  async createBlockWithImage(blockData, imageFile) {
    try {
      const formData = new FormData();
      formData.append('title', blockData.title);
      formData.append('courseId', blockData.courseId);

      if (imageFile) {
        formData.append('imageFile', imageFile);
      } else if (blockData.imageUrl) {
        formData.append('imageUrl', blockData.imageUrl);
      }

      const response = await adminApi.post(`/blocks`, formData,);
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании блока с изображением:', error);
      throw error;
    }
  },

  async updateBlock(blockId, blockData) {
    try {
      const formData = new FormData();
      if (blockData.title) formData.append('newTitle', blockData.title);
      if (blockData.courseId !== undefined) formData.append('courseId', blockData.courseId);

      const response = await adminApi.put(`/blocks/${blockId}`, formData,);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при обновлении блока с ID ${blockId}:`, error);
      throw error;
    }
  },

  async updateBlockWithImage(blockData, imageFile) {
    try {
      const formData = new FormData();
      formData.append('title', blockData.title);
      if (blockData.courseId !== undefined) formData.append('courseId', blockData.courseId);

      if (imageFile) {
        formData.append('imageFile', imageFile);
      }

      const response = await adminApi.put(`/blocks/${blockData.id}`, formData,);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при обновлении блока с изображением:`, error);
      throw error;
    }
  },

  async uploadBlockImage(blockId, imageFile) {
    try {
      const formData = new FormData();
      formData.append('imageFile', imageFile);

      const response = await adminApi.post(`/blocks/${blockId}/image`, formData,);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при загрузке изображения для блока ${blockId}:`, error);
      throw error;
    }
  },

  async deleteBlock(blockId) {
    try {
      const response = await adminApi.delete(`/blocks/${blockId}`,);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при удалении блока ${blockId}:`, error);
      throw error;
    }
  },

  async reorderBlocks(courseId, blocksOrder) {
    try {
      const payload = blocksOrder.map(block => ({
        id: parseInt(block.id, 10),
        order: parseInt(block.order, 10)
      }));

      const response = await adminApi.post(
        `/courses/${courseId}/reorder-blocks`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Ошибка при изменении порядка блоков:', error);
      console.error('Детали ошибки:', error.response?.data);
      throw error;
    }
  },

  // ======== УРОКИ ========
  async getLessonsByBlockId(blockId) {
    try {
      const response = await adminApi.get(`/blocks/${blockId}/details`,);

      if (!response.data || !response.data.lessons) {
        console.warn('API не вернул уроки блока');
        return [];
      }
      return response.data.lessons;
    } catch (error) {
      console.error(`Ошибка при получении уроков блока ${blockId}:`, error);
      return [];
    }
  },

  async getLessonDetails(lessonId) {
    try {
      const response = await adminApi.get(`/lessons/${lessonId}/details`,);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении деталей урока ${lessonId}:`, error);
      throw error;
    }
  },

  async createLesson(lessonData) {
    try {
      const formData = new FormData();
      formData.append('blockId', lessonData.blockId);
      formData.append('title', lessonData.title);

      if (lessonData.description) {
        formData.append('description', lessonData.description);
      }

      const response = await adminApi.post(`/lessons`, formData,);
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании урока:', error);
      throw error;
    }
  },

  async updateLesson(lessonId, lessonData) {
    try {
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
      const response = await adminApi.put(`/lessons/${lessonId}`, formData,);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при обновлении урока ${lessonId}:`, error);
      throw error;
    }
  },

  async deleteLesson(lessonId) {
    try {
      const response = await adminApi.delete(`/lessons/${lessonId}`,);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при удалении урока ${lessonId}:`, error);
      throw error;
    }
  },

  async uploadLessonImage(lessonId, imageFile) {
    try {
      const formData = new FormData();
      formData.append('imageFile', imageFile);

      const response = await adminApi.post(`/lessons/${lessonId}/image`, formData, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Ошибка при загрузке изображения для урока ${lessonId}:`, error);
      throw error;
    }
  },

  async uploadLessonVideo(lessonId, videoFile) {
    try {
      const formData = new FormData();
      formData.append('videoFile', videoFile);
      const response = await adminApi.post(`/lessons/${lessonId}/video`, formData, {
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

  async reorderLessons(blockId, lessonsOrder) {
    try {
      const response = await adminApi.post(`/blocks/${blockId}/reorder-lessons`, lessonsOrder,);
      return response.data;
    } catch (error) {
      console.error('Ошибка при изменении порядка уроков:', error);
      throw error;
    }
  }
};
