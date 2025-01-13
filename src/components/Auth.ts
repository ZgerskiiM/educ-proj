import axios from "axios";

const API_URL = "http://localhost:8080"; 

export const AuthService = {
  async signup(email: string, password: string, name: string): Promise<any> {
    const response = await axios.post(`${API_URL}/signup`, { email, password, name });
    return response.data;
  },

  async verify(email: string, code: string): Promise<any> {
    const response = await axios.post(`${API_URL}/verify`, { email, code });
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
