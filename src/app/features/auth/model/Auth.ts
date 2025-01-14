import axios from "axios";

const API_URL = "http://localhost:8080";

export const AuthService = {
  async signup(email: string, password: string, firstName: string, lastName: string): Promise<any> {
    const response = await axios.post(`${API_URL}/auth/signup`, { email, password, firstName, lastName });
    return response.data;
  },

  async verify(email: string, verificationCode: string): Promise<any> {
    const response = await axios.post(`${API_URL}/auth/verify`, { email, verificationCode });
    return response.data;
  },

  async login(email: string, password: string): Promise<any> {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  },

  async resetRequest(email: string): Promise<any> {
    const response = await axios.post(`${API_URL}/auth/request-password-reset`,
      null,
      {
        params: {
          email,
        },
      }
    );
    return response.data;
  },
  async resetPassword(token: string, newPassword: string) {
    return axios.post(`${API_URL}/auth/reset-password`, null, {
        params: {
            token,
            newPassword
        }
    });
},

  async resend(email: string): Promise<any> {
    const response = await axios.post(
      `${API_URL}/auth/resend`,
      null,
      {
        params: {
          email,
        },
      }
    );
    return response.data;
  },
};
