import { AuthService } from '@/app/features/auth/model/Auth';
import { userApi } from '@/shared/api/api';


export const fetchUserData = async () => {
  try {
    const token = AuthService.getToken();
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const response = await userApi.get('/users/me');

    const userData = {
      firstName: response.data.firstName || '',
      lastName: response.data.lastName || '',
      email: response.data.email || '',
      imageUrl: response.data.imageUrl || '/EmptyAvatar.png',
      role: response.data.role || ''
    };

    return userData;
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error);
    throw error;
  }
}


export const getUserData = async () => {
  try {
    // Получаем токен из localStorage
    const token = AuthService.getToken();

    // Проверяем, что токен существует
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const response = await userApi.get(`/users/me`);
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
    const response = await userApi.get(`/users/courses`);
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

    const response = await userApi.get(`/users/courses`);

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
    const response = await userApi.get(`/users/blocks/${blockId}`);
      return response.data
  } catch (error) {
    console.error('Ошибка при получении данных блока:', error);
    throw error;
  }
};


export const isAdmin = async () => {
  return await checkUserRole('ADMIN');
};

// Функция для входа пользователя
export const loginUser = async (email, password) => {
  try {
    const response = await userApi.post(`/auth/login`, { email, password });

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

export const hasRole = (requiredRole) => {
  const userRole = localStorage.getItem('userRole');
  return userRole === requiredRole;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userRole');
};
