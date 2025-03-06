import axios from 'axios'

const API_URL = 'http://localhost:8080';

// Функция для получения данных пользователя с ролью
export const getUserData = async () => {
  try {
    // Получаем токен из localStorage
    const token = localStorage.getItem('token');

    // Проверяем, что токен существует
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const response = await axios.get(`${API_URL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

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

// Проверка, является ли пользователь администратором
export const isAdmin = async () => {
  return await checkUserRole('ADMIN');
};

// Функция для входа пользователя
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });

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

// Функция для проверки, имеет ли пользователь определенную роль (синхронная версия)
export const hasRole = (requiredRole) => {
  const userRole = localStorage.getItem('userRole');
  return userRole === requiredRole;
};

// Выход пользователя
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userRole');
  // При необходимости тут можно делать запрос на сервер для инвалидации токена
};
