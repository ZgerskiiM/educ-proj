import { adminApi } from '@/shared/api/api';

export const getUserService = {
  async fetchAllUsers() {
    const response = await adminApi.get(`/users`,);
    return response.data;
  },

  async grantCourseAccess(email, courseId) {
    const response = await adminApi.post(`/users/${email}/courses/${courseId}`, null,);
    return response.data;
  },

  async fetchAllCourses() {
    const response = await adminApi.get(`/courses`,);
    return response.data;
  },

  async fetchCourse(userId) {
    const response = await adminApi.get(`/users/${userId}`,);
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

    const response = await adminApi.post(`/courses`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Назначение роли администратора пользователю
  async assignAdminRole(email) {
    const response = await adminApi.put(`/${email}/role`, null,);
    return response.data;
  },
};
