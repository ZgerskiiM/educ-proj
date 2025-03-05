import http from "./http"; // путь к файлу http.ts

export const AuthService = {
  async signup(email: string, password: string, firstName: string, lastName: string): Promise<any> {
    const response = await http.post("/auth/signup", { email, password, firstName, lastName });
    return response.data;
  },

  async verify(email: string, verificationCode: string): Promise<any> {
    const response = await http.post("/auth/verify", { email, verificationCode });
    return response.data;
  },

  async login(email: string, password: string): Promise<any> {
    const response = await http.post("/auth/login", { email, password });
    localStorage.setItem("jwt_token", response.data.token);
    return response.data;
  },

  async resetRequest(email: string): Promise<any> {
    const response = await http.post("/auth/request-password-reset", null, {
      params: { email },
    });
    return response.data;
  },

  async resetPassword(token: string, newPassword: string) {
    return http.post("/auth/reset-password", null, {
      params: { token, newPassword },
    });
  },

  async resend(email: string): Promise<any> {
    const response = await http.post("/auth/resend", null, {
      params: { email },
    });
    return response.data;
  },
};
