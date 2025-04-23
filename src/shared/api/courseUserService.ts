import { userApi } from '@/shared/api/api';

export const courseUserService = {
  async fetchCourseWithBlocks(courseId) {
    const response = await userApi.get(`/users/courses/${courseId}`);
    return response.data;
  },

  async fetchBlockWithLessons(blockId) {
    try {
      const response = await userApi.get(`/users/blocks/${blockId}`,);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении блока ${blockId}:`, error);
      throw error;
    }
  },

  async fetchLessonDetails(lessonId) {
    try {
      const response = await userApi.get(`/users/lessons/${lessonId}`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении урока ${lessonId}:`, error);
      throw error;
    }
  }
};