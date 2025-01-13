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
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  },

  async resend(email: string): Promise<any> {
    const response = await axios.post(`${API_URL}/resend`, { email });
    return response.data;
  },
};
