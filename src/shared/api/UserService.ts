import axios from 'axios'

const API_URL = 'http://localhost:8080';


// Функция для получения данных пользователя
export const getUserData = async () => {
  try {
    // Получаем токен из localStorage или другого хранилища
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8080/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const { firstName, email } = response.data;
    return { firstName, email };

  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
