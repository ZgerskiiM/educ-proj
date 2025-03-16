// src/app/features/auth/model/Auth.ts
import http from "./http"; // путь к файлу http.ts

// Интерфейсы для типизации
interface LoginResponse {
  token: string;
  refreshToken?: string;
  expiresAt?: string;
}

interface UserData {
  firstName?: string;
  lastName?: string;
  email: string;
  role?: string;
  imageUrl?: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const TOKEN_KEY = "jwt_token";
const REFRESH_TOKEN_KEY = "refreshToken";
const EXPIRES_AT_KEY = "expiresAt";
const USER_ROLE_KEY = "userRole";

export const AuthService = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Сохранение токенов
  setTokens(response: any): void {
    if (response.token) {
      localStorage.setItem(TOKEN_KEY, response.token);
    }

    if (response.refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);
    }

    if (response.expiresAt) {
      localStorage.setItem(EXPIRES_AT_KEY, response.expiresAt);
    }
  },

  // Проверка авторизации
  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  },

  // В файле Auth.ts добавьте новый метод
// В файле Auth.ts добавьте/измените методы:

// Метод для запроса восстановления пароля
 async forgotPassword(email) {
  try {
    const response = await http.post('/auth/forgot-password', null, {
      params: {
        email
      }
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при запросе сброса пароля:', error);
    throw error;
  }
},

// Метод для установки нового пароля
 async resetPassword(token, newPassword) {
  try {
    const response = await http.post('/auth/reset-password', null, {
      params: {
        token,
        newPassword
      }
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при сбросе пароля:', error);
    throw error;
  }
},

  // Авторизация пользователя
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await http.post("/auth/login", { email, password });
      const authData = response.data;

      // Сохраняем токен
      localStorage.setItem(TOKEN_KEY, authData.token);

      // Извлекаем роль прямо из JWT токена
      const decodedToken = this.decodeToken(authData.token);
      if (decodedToken && decodedToken.role) {
        console.log('Setting user role from token:', decodedToken.role);
        localStorage.setItem(USER_ROLE_KEY, decodedToken.role);
      } else {
        try {
          const userData = await this.getUserData();
          if (userData && userData.role) {
            localStorage.setItem(USER_ROLE_KEY, userData.role);
          }
        } catch (error) {
          console.error('Failed to get user data:', error);
        }
      }

      return authData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Регистрация пользователя
  async signup(email: string, password: string, firstName: string, lastName: string): Promise<any> {
    try {
      const response = await http.post("/auth/signup", {firstName, email, lastName, password});
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  // Верификация email
  async verify(email: string, verificationCode: string): Promise<any> {
    const response = await http.post("/auth/verify", { email, verificationCode });
    return response.data;
  },

  // Запрос на сброс пароля
  async resetRequest(email: string): Promise<any> {
    const response = await http.post("/auth/request-password-reset", null, {
      params: { email },
    });
    return response.data;
  },

  // Сброс пароля
  async resetPassword(token: string, newPassword: string): Promise<any> {
    const response = await http.post("/auth/reset-password", null, {
      params: { token, newPassword },
    });
    return response.data;
  },

  // Повторная отправка кода верификации
  async resend(email: string): Promise<any> {
    const response = await http.post("/auth/resend", null, {
      params: { email },
    });
    return response.data;
  },

  // Получение данных пользователя
  async getUserData(): Promise<UserData> {
    try {
      const token = this.getToken();

      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const response = await http.get("/users/me", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  },

  // Проверка роли пользователя
  hasRole(requiredRole: string): boolean {
    const userRole = localStorage.getItem(USER_ROLE_KEY);
    return userRole === requiredRole;
  },

  // Проверка, является ли пользователь администратором
  isAdmin(): boolean {
    return this.hasRole("ADMIN");
  },

  // Выход из системы
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(EXPIRES_AT_KEY);
    localStorage.removeItem(USER_ROLE_KEY);
  }
};
